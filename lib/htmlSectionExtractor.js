// Shared "walk the document, group by heading section" logic used by every
// content importer (Word via lib/docxImport.js, Markdown via
// lib/mdImport.js, and the live body-sync detector at
// lib/bodySectionSync.js has its own DOMParser-based twin of this for the
// same reason it can't share code with the cheerio-based importers - see
// that file). Recognizes "Key Takeaways" / "FAQs" / "Courses Compared" /
// "Body" headings (lib/contentSectionLabels.js) and returns the parsed
// post fields for whichever of those sections were actually present.
import { SECTION_HEADING_MAP, COURSE_COLUMN_MAP, EMPTY_COURSE, normalizeLabel } from "./contentSectionLabels";

export function norm(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

// Right after a link in the Body, "[nofollow]" / "[sametab]" (comma or space
// separated, case-insensitive) sets that one link's rel/target - the same
// per-link control the rich-text editor's own Link popover exposes. No tag
// means the editor's own default: dofollow, opens in a new tab.
export function applyLinkTags(html) {
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

// Word's "Heading 1"/"Heading 5"/"Heading 6" styles (and Markdown's # / #####)
// map to <h1>/<h5>/<h6>, but the rich-text editor's toolbar only offers
// H2-H4 - collapse to that range so imported headings render with a style
// the editor actually has.
function normalizeHeadingLevel(tag) {
  const n = Number(tag.slice(1));
  if (n <= 2) return "h2";
  if (n >= 4) return "h4";
  return "h3";
}

export function tableRows($, table) {
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

// `children` is every top-level element of the already-loaded document
// (import.meta docs, not just the ones after any front-matter/fields
// table the caller stripped first - pass only the relevant slice).
// `warnings` is mutated in place (pushed to), matching the calling
// convention both importers already use.
export function extractSections($, children, warnings) {
  const post = {};
  const sections = { keyTakeaways: [], faqs: [], courses: [], body: [] };
  let current = null;
  for (const el of children) {
    if (/^h[1-6]$/.test(el.tagName)) {
      const target = SECTION_HEADING_MAP[normalizeLabel($(el).text())];
      if (target) {
        current = target;
        continue;
      }
    }
    if (current) sections[current].push(el);
  }

  // --- Key takeaways: bullet/numbered list items. ---
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

  // --- FAQs: a Question | Answer table. ---
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

  // --- Courses compared: a table whose header row names the columns. ---
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

  // --- Body: everything else, turned into the editor's HTML. ---
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

  return post;
}
