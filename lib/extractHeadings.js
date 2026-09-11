// Walks an editor-authored HTML string, gives every <h2> a stable id (for the
// sidebar Table of Contents to link to), and returns the heading list
// alongside the rewritten HTML. Regex-based rather than a full HTML parser -
// the input is always editor-generated markup (TipTap), never arbitrary
// third-party HTML, so this stays safe and fast.
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(html) {
  if (!html) return { html: html || "", headings: [] };

  const headings = [];
  const seen = new Map();

  const rewritten = html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return match;

    let id = slugify(text) || "section";
    const count = seen.get(id) || 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    headings.push({ id, text });

    // Drop any id the editor's HTML already carried, so ours is the one
    // that's actually in the DOM (and matches what's in `headings`).
    const cleanAttrs = attrs.replace(/\s*id="[^"]*"/i, "");
    return `<h2${cleanAttrs} id="${id}">${inner}</h2>`;
  });

  return { html: rewritten, headings };
}
