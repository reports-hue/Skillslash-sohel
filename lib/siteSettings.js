import { query } from "./db";

function iso(value) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

function mapSettings(row) {
  if (!row) return null;
  return {
    siteName: row.site_name,
    siteDescription: row.site_description,
    defaultMetaTitleTemplate: row.default_meta_title_template,
    defaultMetaDescription: row.default_meta_description,
    defaultKeywords: row.default_keywords || [],
    defaultOgImageUrl: row.default_og_image_url,
    twitterHandle: row.twitter_handle,
    defaultAuthorId: row.default_author_id,
    organizationSchemaUrl: row.organization_schema_url,
    updatedAt: iso(row.updated_at),
  };
}

export async function getSiteSettings() {
  const { rows } = await query("SELECT * FROM site_settings WHERE id = 1");
  return (
    mapSettings(rows[0]) || {
      siteName: "Skillslash",
      siteDescription: "",
      defaultMetaTitleTemplate: "{title} - Skillslash Blog",
      defaultMetaDescription: "",
      defaultKeywords: [],
      defaultOgImageUrl: "",
      twitterHandle: "",
      defaultAuthorId: null,
      organizationSchemaUrl: "https://skillslash.com",
      updatedAt: null,
    }
  );
}

export async function updateSiteSettings(body) {
  await query(
    `INSERT INTO site_settings (
       id, site_name, site_description, default_meta_title_template,
       default_meta_description, default_keywords, default_og_image_url,
       twitter_handle, default_author_id, organization_schema_url
     ) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (id) DO UPDATE SET
       site_name = EXCLUDED.site_name,
       site_description = EXCLUDED.site_description,
       default_meta_title_template = EXCLUDED.default_meta_title_template,
       default_meta_description = EXCLUDED.default_meta_description,
       default_keywords = EXCLUDED.default_keywords,
       default_og_image_url = EXCLUDED.default_og_image_url,
       twitter_handle = EXCLUDED.twitter_handle,
       default_author_id = EXCLUDED.default_author_id,
       organization_schema_url = EXCLUDED.organization_schema_url`,
    [
      body.siteName || "Skillslash",
      body.siteDescription || null,
      body.defaultMetaTitleTemplate || "{title} - Skillslash Blog",
      body.defaultMetaDescription || null,
      body.defaultKeywords || [],
      body.defaultOgImageUrl || null,
      body.twitterHandle || null,
      body.defaultAuthorId || null,
      body.organizationSchemaUrl || "https://skillslash.com",
    ]
  );
  return getSiteSettings();
}

// Applies the saved defaults to a brand-new post's blank fields - the
// "set it once, it recurs on every post" behaviour. Never overwrites a
// field the editor already filled in.
export function applyDefaults(postDraft, settings, defaultAuthor) {
  const title = postDraft.title || "";
  return {
    ...postDraft,
    authorId: postDraft.authorId || settings.defaultAuthorId || null,
    authorName: postDraft.authorName || defaultAuthor?.name || "Skillslash Team",
    metaTitle:
      postDraft.metaTitle ||
      (title ? settings.defaultMetaTitleTemplate.replace("{title}", title) : ""),
    metaDescription: postDraft.metaDescription || settings.defaultMetaDescription || "",
    keywords: postDraft.keywords?.length ? postDraft.keywords : settings.defaultKeywords,
    ogImageUrl: postDraft.ogImageUrl || settings.defaultOgImageUrl || "",
  };
}
