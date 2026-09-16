// Shared heading/column-matching rules for recognizing an "FAQs" or "Courses
// Compared" section inside authored content - used by both the Word-doc
// importer (lib/docxImport.js, server-side via cheerio) and the live
// body-sync detector (lib/bodySectionSync.js, client-side via DOMParser).
// Keeping one copy of these rules means "FAQs" is recognized identically
// whether it was typed straight into the editor or came in through a
// pasted/imported Word doc.
export const SECTION_HEADING_MAP = {
  "key takeaways": "keyTakeaways",
  "faqs": "faqs",
  "faq": "faqs",
  "frequently asked questions": "faqs",
  "courses compared": "courses",
  "courses": "courses",
  "body": "body",
};

export const COURSE_COLUMN_MAP = [
  { key: "name", test: /^name$/i },
  { key: "description", test: /description/i },
  { key: "url", test: /^url$|course url/i },
  { key: "providerName", test: /provider name/i },
  { key: "providerUrl", test: /provider url/i },
  { key: "credentialAwarded", test: /credential/i },
  { key: "price", test: /^price$/i },
  { key: "priceCurrency", test: /currency/i },
  { key: "availability", test: /availability/i },
  { key: "category", test: /category/i },
  { key: "startDate", test: /start date/i },
  { key: "endDate", test: /end date/i },
  { key: "courseMode", test: /mode/i },
  { key: "courseWorkload", test: /workload/i },
];

export const EMPTY_COURSE = {
  name: "", description: "", providerName: "", providerUrl: "", credentialAwarded: "",
  url: "", price: "", priceCurrency: "INR", availability: "InStock", category: "",
  startDate: "", endDate: "", courseMode: "Online", courseWorkload: "",
};

export function normalizeLabel(s) {
  return (s || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/:$/, "");
}
