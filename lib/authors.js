import { query } from "./db";

function iso(value) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

export function mapAuthor(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    title: row.title,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    email: row.email,
    twitterUrl: row.twitter_url,
    linkedinUrl: row.linkedin_url,
    websiteUrl: row.website_url,
    isDefault: row.is_default,
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
  };
}

export async function listAuthors() {
  const { rows } = await query("SELECT * FROM authors ORDER BY is_default DESC, name ASC");
  return rows.map(mapAuthor);
}

export async function getAuthorById(id) {
  const { rows } = await query("SELECT * FROM authors WHERE id = $1", [id]);
  return mapAuthor(rows[0]);
}

export async function getDefaultAuthor() {
  const { rows } = await query("SELECT * FROM authors WHERE is_default = true LIMIT 1");
  return mapAuthor(rows[0]);
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

async function uniqueAuthorSlug(base, ignoreId) {
  let slug = slugify(base) || "author";
  let n = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { rows } = await query(
      "SELECT id FROM authors WHERE slug = $1 AND id != COALESCE($2, -1)",
      [slug, ignoreId || null]
    );
    if (!rows.length) return slug;
    slug = `${slugify(base)}-${n++}`;
  }
}

export async function createAuthor(body) {
  const slug = await uniqueAuthorSlug(body.slug || body.name);
  const { rows } = await query(
    `INSERT INTO authors (name, slug, title, bio, avatar_url, email, twitter_url, linkedin_url, website_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id`,
    [
      body.name,
      slug,
      body.title || null,
      body.bio || null,
      body.avatarUrl || null,
      body.email || null,
      body.twitterUrl || null,
      body.linkedinUrl || null,
      body.websiteUrl || null,
    ]
  );
  const author = await getAuthorById(rows[0].id);
  if (body.isDefault) await setDefaultAuthor(author.id);
  return getAuthorById(author.id);
}

export async function updateAuthor(id, body) {
  const slug = await uniqueAuthorSlug(body.slug || body.name, id);
  await query(
    `UPDATE authors SET
       name = $1, slug = $2, title = $3, bio = $4, avatar_url = $5,
       email = $6, twitter_url = $7, linkedin_url = $8, website_url = $9
     WHERE id = $10`,
    [
      body.name,
      slug,
      body.title || null,
      body.bio || null,
      body.avatarUrl || null,
      body.email || null,
      body.twitterUrl || null,
      body.linkedinUrl || null,
      body.websiteUrl || null,
      id,
    ]
  );
  if (body.isDefault) await setDefaultAuthor(id);
  return getAuthorById(id);
}

// Exactly one author can be `is_default` at a time - it's what pre-fills a
// brand-new post's byline and what site_settings.default_author_id falls
// back to when unset.
export async function setDefaultAuthor(id) {
  await query("UPDATE authors SET is_default = false WHERE is_default = true");
  await query("UPDATE authors SET is_default = true WHERE id = $1", [id]);
}

export async function deleteAuthor(id) {
  // Posts crediting this author keep their (denormalised) author_name text
  // and just lose the link - never silently reassign a byline.
  await query("UPDATE blog_posts SET author_id = NULL WHERE author_id = $1", [id]);
  await query("DELETE FROM authors WHERE id = $1", [id]);
}
