// Regenerates public/templates/blog-import-template.docx - the sample file
// admins download from the "Import from Word" button and fill in. Its
// layout must stay in sync with the parser in lib/docxImport.js:
//   - a 2-column table for the scalar fields
//   - "Key Takeaways" heading + bullet list
//   - "FAQs" heading + Question/Answer table
//   - "Courses Compared" heading + table (columns matched by name, any order)
//   - "Body" heading - everything after it becomes the article content
// Run with: node scripts/generate-docx-template.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, HeadingLevel, Table, TableRow, TableCell,
  TextRun, WidthType, ExternalHyperlink, BorderStyle,
} = require("docx");

const cellBorder = { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" };
const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function fieldRow(label, example) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 30, type: WidthType.PERCENTAGE },
        borders,
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true })] })],
      }),
      new TableCell({
        width: { size: 70, type: WidthType.PERCENTAGE },
        borders,
        children: [new Paragraph(example)],
      }),
    ],
  });
}

function headerCell(text) {
  return new TableCell({
    borders,
    shading: { fill: "F0EEF7" },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true })] })],
  });
}
function dataCell(text) {
  return new TableCell({ borders, children: [new Paragraph(text)] });
}

const fieldsTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    fieldRow("Title", "Data Science vs Data Analytics: Which Career Path Fits You in 2026?"),
    // Slug, Canonical URL, OG Title and OG Description are genuinely left
    // empty here on purpose - not filled with instructional text like
    // "(leave blank to ...)". The parser (lib/docxImport.js) saves a cell's
    // text exactly as typed, so an instruction placed IN the value cell
    // would get imported as if it were the real answer - broken canonical
    // links and OG tags is exactly what that caused once already. The
    // "optional" guidance lives in the label instead, where it can never be
    // mistaken for a value.
    fieldRow("Slug (optional - auto-generates from the title if left blank)", ""),
    fieldRow("Excerpt", "A side-by-side comparison of data science and data analytics careers - skills, salaries, and how to choose."),
    fieldRow("Meta Title", "Data Science vs Data Analytics: Career Guide 2026 | Skillslash"),
    fieldRow("Meta Description", "Compare data science and data analytics careers - required skills, average salaries, and a decision framework - so you can pick the right path in 2026."),
    fieldRow("Canonical URL (optional - self-canonicalises if left blank)", ""),
    fieldRow("Focus Keyword", "data science vs data analytics"),
    fieldRow("Keywords", "data science career, data analytics career, data science vs analytics"),
    fieldRow("OG Title (optional - reuses Meta Title if left blank)", ""),
    fieldRow("OG Description (optional - reuses Meta Description if left blank)", ""),
  ],
});

const faqTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({ children: [headerCell("Question"), headerCell("Answer")] }),
    new TableRow({
      children: [
        dataCell("Is data science harder to learn than data analytics?"),
        dataCell("Data science generally has a steeper learning curve, since it adds machine learning and programming depth on top of the statistics and SQL that data analytics already covers."),
      ],
    }),
    new TableRow({ children: [dataCell("Add another question here"), dataCell("Add its answer here")] }),
  ],
});

const courseHeaders = [
  "Name", "Description", "URL", "Provider Name", "Provider URL", "Credential Awarded",
  "Price", "Currency", "Availability", "Category", "Start Date", "End Date", "Mode", "Workload",
];
const courseExample = [
  "Data Science Course", "A 6-month, mentor-led data science program with placement support.",
  "https://skillslash.com/data-science-course-in-pune", "Skillslash", "https://skillslash.com",
  "Certificate of Completion", "45000", "INR", "InStock", "Data Science & GenAI",
  "2026-01-15", "2026-07-15", "Online", "P26W",
];

const coursesTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({ children: courseHeaders.map(headerCell) }),
    new TableRow({ children: courseExample.map(dataCell) }),
  ],
});

const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({ children: [new TextRun({ text: "Skillslash Blog Import Template", bold: true, size: 32 })] }),
        new Paragraph({
          children: [new TextRun({
            text: "Fill in the table below, keep every heading exactly as written, then upload this file from “Import from Word” in the post editor. Author, content type, category, and all images are set manually and are never read from this file - remove this paragraph before uploading.",
            italics: true,
          })],
        }),
        new Paragraph({ text: "" }),
        fieldsTable,
        new Paragraph({ text: "" }),

        new Paragraph({ text: "Key Takeaways", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: "Data analytics focuses on interpreting existing data; data science builds the models that generate new predictions.", bullet: { level: 0 } }),
        new Paragraph({ text: "Data science roles typically pay 20-35% more but expect Python, ML, and a stronger math foundation.", bullet: { level: 0 } }),
        new Paragraph({ text: "Add as many bullet points as you want here.", bullet: { level: 0 } }),
        new Paragraph({ text: "" }),

        new Paragraph({ text: "FAQs", heading: HeadingLevel.HEADING_2 }),
        faqTable,
        new Paragraph({ text: "" }),

        new Paragraph({ text: "Courses Compared", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: "Column order doesn't matter - the header row's names are matched, not their position. Add one row per course." }),
        coursesTable,
        new Paragraph({ text: "" }),

        new Paragraph({ text: "Body", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          text: "Everything from here to the end of the document becomes the article body - headings, paragraphs, bullet/numbered lists, and links all carry over.",
        }),
        new Paragraph({ text: "Why This Comparison Matters", heading: HeadingLevel.HEADING_3 }),
        new Paragraph({
          children: [
            new TextRun("Both fields are growing fast - see the "),
            new ExternalHyperlink({
              link: "https://www.bls.gov/ooh/math/data-scientists.htm",
              children: [new TextRun({ text: "U.S. Bureau of Labor Statistics outlook", style: "Hyperlink" })],
            }),
            new TextRun(
              " [nofollow, sametab] for the source data. Compare that with our own "
            ),
            new ExternalHyperlink({
              link: "https://skillslash.com/data-science-course-in-pune",
              children: [new TextRun({ text: "Data Science course", style: "Hyperlink" })],
            }),
            new TextRun(" page for a closer look at the curriculum."),
          ],
        }),
        new Paragraph({
          text: "The bracketed tag right after a link is optional and controls that one link only: [nofollow] marks it nofollow, [sametab] opens it in the same tab instead of a new one, and [nofollow, sametab] does both. No tag at all means dofollow, opens in a new tab - the editor's own defaults.",
          italics: true,
        }),
        new Paragraph({ text: "Key Skills Compared", heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: "SQL and spreadsheet tools for data analytics.", bullet: { level: 0 } }),
        new Paragraph({ text: "Python, machine learning, and statistics for data science.", bullet: { level: 0 } }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const outDir = path.join(process.cwd(), "public", "templates");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "blog-import-template.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Wrote", outPath);
});
