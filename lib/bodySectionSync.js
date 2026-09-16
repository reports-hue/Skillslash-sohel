// Detects an "FAQs" or "Courses Compared" section written directly into the
// rich-text editor's body (a heading followed by a table, same convention
// lib/docxImport.js teaches for Word docs) and returns structured data to
// sync into the SEO panel's FAQ/Courses fields - so an admin never has to
// enter that content twice. Client-side only (uses the browser's native
// DOMParser, not cheerio - this runs on every keystroke, so it stays
// dependency-free and cheap). See components/Admin/Editor/BlogForm.js for
// how this is wired up: body -> sidebar is one-directional and only ever
// overwrites a field when a matching section is actually found in the body,
// never clears one just because the body section was removed.
import { SECTION_HEADING_MAP, COURSE_COLUMN_MAP, EMPTY_COURSE, normalizeLabel } from "./contentSectionLabels";

function norm(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function tableRows(table) {
  return Array.from(table.querySelectorAll(":scope > tbody > tr, :scope > tr")).map((tr) =>
    Array.from(tr.querySelectorAll(":scope > td, :scope > th")).map((cell) => norm(cell.textContent))
  );
}

// A quick, cheap substring check run before the real (DOMParser) parse, so
// typing an ordinary paragraph doesn't pay for a full parse on every
// keystroke - only bodies that could plausibly contain one of these
// headings get the full walk below.
function mightContainSection(html) {
  return /\b(faqs?|frequently asked questions|courses?)\b/i.test(html || "");
}

export function detectSectionsFromBody(html) {
  const result = { faqs: null, courses: null };
  if (typeof window === "undefined" || !html || !mightContainSection(html)) return result;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const children = Array.from(doc.body.children);

  const sections = { faqs: [], courses: [] };
  let current = null;
  for (const el of children) {
    if (/^H[1-6]$/.test(el.tagName)) {
      const target = SECTION_HEADING_MAP[normalizeLabel(el.textContent)];
      if (target === "faqs" || target === "courses") {
        current = target;
        continue;
      }
      // Any other recognized or unrecognized heading closes whichever
      // section was open, so content after an unrelated H2 doesn't get
      // swept into the last FAQ/Courses section by mistake.
      current = null;
      continue;
    }
    if (current) sections[current].push(el);
  }

  // --- FAQs: a Question | Answer table. ---
  const faqTable = sections.faqs.find((el) => el.tagName === "TABLE");
  if (faqTable) {
    const rows = tableRows(faqTable);
    const isHeader = rows[0] && /question/i.test(rows[0][0] || "") && /answer/i.test(rows[0][1] || "");
    const faqs = rows
      .slice(isHeader ? 1 : 0)
      .filter((r) => r[0] || r[1])
      .map((r) => ({ question: r[0] || "", answer: r[1] || "" }));
    if (faqs.length) result.faqs = faqs;
  }

  // --- Courses compared: a table whose header row names the columns. ---
  const courseTable = sections.courses.find((el) => el.tagName === "TABLE");
  if (courseTable) {
    const rows = tableRows(courseTable);
    const [header, ...dataRows] = rows;
    if (header) {
      const columns = header.map((h) => COURSE_COLUMN_MAP.find((c) => c.test.test(h))?.key || null);
      const courses = dataRows
        .filter((r) => r.some(Boolean))
        .map((r) => {
          const course = { ...EMPTY_COURSE };
          columns.forEach((key, i) => {
            if (key && r[i]) course[key] = r[i];
          });
          return course;
        });
      if (courses.length) result.courses = courses;
    }
  }

  return result;
}
