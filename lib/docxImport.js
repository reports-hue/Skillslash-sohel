// Parses a specially-formatted Word (.docx) file into a partial CMS post
// object. Pairs with public/templates/blog-import-template.docx (generated
// by scripts/generate-docx-template.js) - that file documents the format
// this parser expects. Author, content type, category and every image stay
// untouched: those are deliberately left out of the template and are never
// returned here, by design (set manually in the admin UI instead).
import mammoth from "mammoth";
import * as cheerio from "cheerio";
import { normalizeLabel } from "./contentSectionLabels";
import { extractSections, tableRows } from "./htmlSectionExtractor";

const FIELD_LABEL_MAP = {
  "title": "title",
  "slug": "slug",
  "excerpt": "excerpt",
  "meta title": "metaTitle",
  "meta description": "metaDescription",
  "canonical url": "canonicalUrl",
  "focus keyword": "focusKeyword",
  "keywords": "keywords",
  "og title": "ogTitle",
  "og description": "ogDescription",
};

function norm(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}
// Strips a trailing "(optional - ...)" hint - the sample template puts that
// guidance in the label itself, never in the value cell (see
// scripts/generate-docx-template.js), so it has to come off before matching
// against FIELD_LABEL_MAP or SECTION_HEADING_MAP.
const normLabel = normalizeLabel;

function slugify(cell) {
  return cell
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

// A cell left as the template's own instructional text - e.g.
// "(leave blank to self-canonicalise)" - must be treated as blank, not as
// the admin's real answer. A real value wrapped entirely in parentheses
// (with nothing outside them) is vanishingly unlikely, so this is a safe
// way to catch a template placeholder an admin forgot to delete without
// needing the parser to know the exact wording of every hint.
function isPlaceholder(value) {
  return /^\(.*\)$/.test(value.trim());
}

export async function parseDocxToPost(buffer) {
  const warnings = [];
  const { value: rawHtml } = await mammoth.convertToHtml({ buffer });
  // Images are inserted manually in the editor, never carried over from the
  // doc - mammoth would otherwise inline them as base64 data URIs.
  const strippedImages = /<img[^>]*>/gi.test(rawHtml);
  const html = rawHtml.replace(/<img[^>]*>/gi, "");
  if (strippedImages) {
    warnings.push("Inline images in the document were skipped - add them manually via the editor's image button.");
  }

  const $ = cheerio.load(html);
  const children = $("body").children().toArray();

  const post = {};

  // --- 1. The first table in the doc is the "Field | Value" table. ---
  const fieldsTableEl = children.find((el) => el.tagName === "table");
  if (fieldsTableEl) {
    for (const row of tableRows($, fieldsTableEl)) {
      if (row.length < 2) continue;
      const key = FIELD_LABEL_MAP[normLabel(row[0])];
      if (!key) continue;
      let value = norm(row[1]);
      if (isPlaceholder(value)) {
        value = "";
        warnings.push(`"${row[0].replace(/:$/, "")}" was left as the template's placeholder text - saved as blank instead.`);
      }
      if (key === "keywords") {
        post.keywords = value ? value.split(",").map((w) => w.trim()).filter(Boolean) : [];
      } else if (key === "slug") {
        post.slug = value ? slugify(value) : "";
      } else {
        post[key] = value;
      }
    }
  } else {
    warnings.push("No fields table found (Title, Meta Title, etc.) - see the sample template for the expected layout.");
  }

  // --- 2. Walk the rest of the document (everything after the fields
  //        table), grouping elements by the heading section they fall
  //        under (Key Takeaways / FAQs / Courses Compared / Body) - shared
  //        with lib/mdImport.js, which has no fields table to skip past. ---
  const afterFieldsTable = fieldsTableEl
    ? children.slice(children.indexOf(fieldsTableEl) + 1)
    : children;
  Object.assign(post, extractSections($, afterFieldsTable, warnings));

  return { post, warnings };
}
