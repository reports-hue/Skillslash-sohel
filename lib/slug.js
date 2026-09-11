import { query } from "./db";

export function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

export async function uniqueSlug(base, ignoreId) {
  let slug = slugify(base) || "post";
  let n = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { rows } = await query(
      "SELECT id FROM blog_posts WHERE slug = $1 AND id != COALESCE($2, -1)",
      [slug, ignoreId || null]
    );
    if (!rows.length) return slug;
    slug = `${slugify(base)}-${n++}`;
  }
}
