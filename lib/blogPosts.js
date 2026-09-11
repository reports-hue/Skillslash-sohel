// Shared row <-> API-shape mapping so the admin API, the public blog route,
// and the sitemap all agree on one representation of a post.
import { query } from "./db";
import { SITE_URL } from "./siteConstants";

// node-postgres returns TIMESTAMPTZ columns as JS Date objects, which
// getStaticProps/getServerSideProps refuse to serialize ("object cannot be
// serialized as JSON"). Every caller wants an ISO string anyway (for
// <time dateTime>, JSON-LD, sitemap <lastmod>), so normalise once here
// instead of every call site remembering to.
function iso(value) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

export function mapPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    contentHtml: row.content_html,
    coverImageUrl: row.cover_image_url,
    categoryId: row.category_id,
    categorySlug: row.category_slug || null,
    categoryName: row.category_name || null,
    categoryAccent: row.category_accent || null,
    contentType: row.content_type,
    status: row.status,
    authorId: row.author_id,
    authorName: row.author_name,
    authorSlug: row.author_slug || null,
    authorTitle: row.author_title || null,
    authorBio: row.author_bio || null,
    authorAvatarUrl: row.author_avatar_url || null,
    authorTwitterUrl: row.author_twitter_url || null,
    authorLinkedinUrl: row.author_linkedin_url || null,
    readMinutes: row.read_minutes,

    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    focusKeyword: row.focus_keyword,
    keywords: row.keywords || [],
    robotsIndex: row.robots_index,
    robotsFollow: row.robots_follow,

    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImageUrl: row.og_image_url,
    twitterCard: row.twitter_card,

    faqs: row.faqs || [],
    keyTakeaways: row.key_takeaways || [],
    courses: row.courses || [],
    schemaType: row.schema_type,
    structuredDataOverride: row.structured_data_override || null,

    publishedAt: iso(row.published_at),
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
  };
}

const SELECT = `
  SELECT p.*,
    c.slug AS category_slug, c.name AS category_name, c.accent AS category_accent,
    a.slug AS author_slug, a.title AS author_title, a.bio AS author_bio, a.avatar_url AS author_avatar_url,
    a.twitter_url AS author_twitter_url, a.linkedin_url AS author_linkedin_url
  FROM blog_posts p
  LEFT JOIN blog_categories c ON c.id = p.category_id
  LEFT JOIN authors a ON a.id = p.author_id
`;

export async function listPosts({ status } = {}) {
  const where = status ? "WHERE p.status = $1" : "";
  const params = status ? [status] : [];
  const { rows } = await query(
    `${SELECT} ${where} ORDER BY p.updated_at DESC`,
    params
  );
  return rows.map(mapPost);
}

export async function getPostById(id) {
  const { rows } = await query(`${SELECT} WHERE p.id = $1`, [id]);
  return mapPost(rows[0]);
}

export async function getPostBySlug(slug, { publishedOnly = false } = {}) {
  const clause = publishedOnly ? "WHERE p.slug = $1 AND p.status = 'published'" : "WHERE p.slug = $1";
  const { rows } = await query(`${SELECT} ${clause}`, [slug]);
  return mapPost(rows[0]);
}

export async function listPublishedByCategory(categorySlug, { excludeId, limit = 3 } = {}) {
  const { rows } = await query(
    `${SELECT}
     WHERE p.status = 'published' AND c.slug = $1 AND p.id != COALESCE($2, -1)
     ORDER BY p.published_at DESC NULLS LAST
     LIMIT $3`,
    [categorySlug, excludeId || null, limit]
  );
  return rows.map(mapPost);
}

export async function listPublishedByAuthor(authorSlug, { excludeId, limit = 50 } = {}) {
  const { rows } = await query(
    `${SELECT}
     WHERE p.status = 'published' AND a.slug = $1 AND p.id != COALESCE($2, -1)
     ORDER BY p.published_at DESC NULLS LAST
     LIMIT $3`,
    [authorSlug, excludeId || null, limit]
  );
  return rows.map(mapPost);
}

export async function listCategories() {
  const { rows } = await query(
    "SELECT id, slug, name, description, accent FROM blog_categories ORDER BY sort_order"
  );
  return rows;
}

const FIELDS = [
  "slug", "title", "excerpt", "content_html", "cover_image_url", "category_id",
  "content_type", "status", "author_id", "author_name", "read_minutes",
  "meta_title", "meta_description", "canonical_url", "focus_keyword", "keywords",
  "robots_index", "robots_follow",
  "og_title", "og_description", "og_image_url", "twitter_card",
  "faqs", "key_takeaways", "courses", "schema_type", "structured_data_override",
  "published_at",
];

// Accepts the camelCase API body, writes the snake_case columns above.
// `authorName` is denormalised onto the row (used by list views and the
// legacy JSON-LD builder without an extra join) but always resolved from
// the authors table server-side when an authorId is given, rather than
// trusted verbatim from the client - it stays correct even if the client
// sent a stale name.
async function resolveAuthorName(body) {
  if (!body.authorId) return body.authorName || "Skillslash Team";
  const { rows } = await query("SELECT name FROM authors WHERE id = $1", [body.authorId]);
  return rows[0]?.name || body.authorName || "Skillslash Team";
}

async function toRow(body) {
  const authorName = await resolveAuthorName(body);
  const map = {
    slug: body.slug, title: body.title, excerpt: body.excerpt,
    content_html: body.contentHtml, cover_image_url: body.coverImageUrl,
    category_id: body.categoryId || null,
    content_type: body.contentType || "course-comparison",
    status: body.status || "draft",
    author_id: body.authorId || null,
    author_name: authorName,
    read_minutes: body.readMinutes || null,
    meta_title: body.metaTitle || null,
    meta_description: body.metaDescription || null,
    canonical_url: body.canonicalUrl || null,
    focus_keyword: body.focusKeyword || null,
    keywords: body.keywords || [],
    robots_index: body.robotsIndex !== false,
    robots_follow: body.robotsFollow !== false,
    og_title: body.ogTitle || null,
    og_description: body.ogDescription || null,
    og_image_url: body.ogImageUrl || null,
    twitter_card: body.twitterCard || "summary_large_image",
    faqs: JSON.stringify(body.faqs || []),
    key_takeaways: JSON.stringify(body.keyTakeaways || []),
    courses: JSON.stringify(body.courses || []),
    schema_type: body.schemaType || "BlogPosting",
    structured_data_override: body.structuredDataOverride
      ? JSON.stringify(body.structuredDataOverride)
      : null,
    published_at:
      body.status === "published" ? body.publishedAt || new Date().toISOString() : body.publishedAt || null,
  };
  return FIELDS.map((f) => map[f]);
}

export async function createPost(body) {
  const values = await toRow(body);
  const placeholders = FIELDS.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await query(
    `INSERT INTO blog_posts (${FIELDS.join(", ")}) VALUES (${placeholders}) RETURNING id`,
    values
  );
  return getPostById(rows[0].id);
}

export async function updatePost(id, body) {
  const values = await toRow(body);
  const assignments = FIELDS.map((f, i) => `${f} = $${i + 1}`).join(", ");
  await query(
    `UPDATE blog_posts SET ${assignments} WHERE id = $${FIELDS.length + 1}`,
    [...values, id]
  );
  return getPostById(id);
}

export async function deletePost(id) {
  await query("DELETE FROM blog_posts WHERE id = $1", [id]);
}

export function postUrl(post) {
  return `${SITE_URL}/blog/${post.slug}`;
}

