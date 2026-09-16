// Parses a specially-formatted Word (.docx) file into a partial CMS post
// object. Pairs with public/templates/blog-import-template.docx (generated
// by scripts/generate-docx-template.js) - that file documents the format
// this parser expects. Author, content type, category and every image stay
// untouched: those are deliberately left out of the template and are never
// returned here, by design (set manually in the admin UI instead).
import mammoth from "mammoth";
import * as cheerio from "cheerio";
import { SECTION_HEADING_MAP, COURSE_COLUMN_MAP, EMPTY_COURSE, normalizeLabel } from "./contentSectionLabels";

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

// Right after a link in the Body, "[nofollow]" / "[sametab]" (comma or space
// separated, case-insensitive) sets that one link's rel/target - the same
// per-link control the rich-text editor's own Link popover exposes. No tag
// means the editor's own default: dofollow, opens in a new tab.
function applyLinkTags(html) {
  return html.replace(
    /(<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>)(\s*\[([^\]]+)\])?/gi,
    (whole, _anchor, href, inner, _bracket, tagText) => {
      const tags = (tagText || "").toLowerCase();
      const nofollow = /nofollow/.test(tags);
      const sameTab = /sametab|same tab/.test(tags);
      const rel = nofollow ? "noopener noreferrer nofollow" : "noopener noreferrer";
      const target = sameTab ? "_self" : "_blank";
      return `<a href="${href}" target="${target}" rel="${rel}">${inner}</a>`;
    }
  );
}

// Word's "Heading 1"/"Heading 5"/"Heading 6" styles map to <h1>/<h5>/<h6>,
// but the rich-text editor's toolbar only offers H2-H4 - collapse to that
// range so imported headings render with a style the editor actually has.
function normalizeHeadingLevel(tag) {
  const n = Number(tag.slice(1));
  if (n <= 2) return "h2";
  if (n >= 4) return "h4";
  return "h3";
}

function tableRows($, table) {
  return $(table)
    .find("tr")
    .toArray()
    .map((tr) =>
      $(tr)
        .find("td,th")
        .toArray()
        .map((cell) => norm($(cell).text()))
    );
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

  // --- 2. Walk the rest of the document, grouping elements by the heading
  //        section they fall under (Key Takeaways / FAQs / Courses Compared
  //        / Body). ---
  const sections = { keyTakeaways: [], faqs: [], courses: [], body: [] };
  let current = null;
  let pastFieldsTable = false;
  for (const el of children) {
    if (!pastFieldsTable) {
      if (el === fieldsTableEl) pastFieldsTable = true;
      continue;
    }
    if (/^h[1-6]$/.test(el.tagName)) {
      const target = SECTION_HEADING_MAP[normLabel($(el).text())];
      if (target) {
        current = target;
        continue;
      }
    }
    if (current) sections[current].push(el);
  }

  // --- 3. Key takeaways: bullet/numbered list items. ---
  const takeawayList = sections.keyTakeaways.find((el) => el.tagName === "ul" || el.tagName === "ol");
  if (takeawayList) {
    post.keyTakeaways = $(takeawayList)
      .find("> li")
      .toArray()
      .map((li) => norm($(li).text()))
      .filter(Boolean);
  } else if (sections.keyTakeaways.length) {
    warnings.push('"Key Takeaways" section found but no bullet list under it - it was left unchanged.');
  }

  // --- 4. FAQs: a Question | Answer table. ---
  const faqTable = sections.faqs.find((el) => el.tagName === "table");
  if (faqTable) {
    const rows = tableRows($, faqTable);
    const isHeader = rows[0] && /question/i.test(rows[0][0] || "") && /answer/i.test(rows[0][1] || "");
    post.faqs = rows
      .slice(isHeader ? 1 : 0)
      .filter((r) => r[0] || r[1])
      .map((r) => ({ question: r[0] || "", answer: r[1] || "" }));
  } else if (sections.faqs.length) {
    warnings.push('"FAQs" section found but no table under it - it was left unchanged.');
  }

  // --- 5. Courses compared: a table whose header row names the columns. ---
  const courseTable = sections.courses.find((el) => el.tagName === "table");
  if (courseTable) {
    const rows = tableRows($, courseTable);
    const [header, ...dataRows] = rows;
    if (header) {
      const columns = header.map((h) => COURSE_COLUMN_MAP.find((c) => c.test.test(h))?.key || null);
      post.courses = dataRows
        .filter((r) => r.some(Boolean))
        .map((r) => {
          const course = { ...EMPTY_COURSE };
          columns.forEach((key, i) => {
            if (key && r[i]) course[key] = r[i];
          });
          return course;
        });
    }
  } else if (sections.courses.length) {
    warnings.push('"Courses Compared" section found but no table under it - it was left unchanged.');
  }

  // --- 6. Body: everything else, turned into the editor's HTML. ---
  if (sections.body.length) {
    let bodyHtml = sections.body
      .map((el) => {
        if (/^h[1-6]$/.test(el.tagName)) {
          $(el).get(0).tagName = normalizeHeadingLevel(el.tagName);
        }
        return $.html(el);
      })
      .join("\n");
    bodyHtml = applyLinkTags(bodyHtml);
    post.contentHtml = bodyHtml;
  }

  return { post, warnings };
}
