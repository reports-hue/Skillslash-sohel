-- Skillslash blog CMS schema.
-- Run with: npm run db:migrate

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Author profiles: created once, reused across posts. Removes the
-- free-text "author name" field a post used to carry on its own.
CREATE TABLE IF NOT EXISTS authors (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT,                 -- e.g. "Senior Data Scientist"
  bio           TEXT,
  avatar_url    TEXT,
  email         TEXT,
  twitter_url   TEXT,
  linkedin_url  TEXT,
  website_url   TEXT,
  is_default    BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site-wide SEO/AEO/GEO/AIO defaults, set once from /admin/settings and
-- applied as a fallback on every new post (title template, OG image,
-- default keywords, default author) instead of retyping them each time.
CREATE TABLE IF NOT EXISTS site_settings (
  id                      INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name               TEXT NOT NULL DEFAULT 'Skillslash',
  site_description        TEXT,
  default_meta_title_template TEXT NOT NULL DEFAULT '{title} - Skillslash Blog',
  default_meta_description    TEXT,
  default_keywords        TEXT[] NOT NULL DEFAULT '{}',
  default_og_image_url    TEXT,
  twitter_handle          TEXT,
  default_author_id       INTEGER REFERENCES authors(id) ON DELETE SET NULL,
  organization_schema_url TEXT NOT NULL DEFAULT 'https://skillslash.com',
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  accent      TEXT NOT NULL DEFAULT '#4f419a',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id                 SERIAL PRIMARY KEY,
  slug               TEXT UNIQUE NOT NULL,
  title              TEXT NOT NULL,
  excerpt            TEXT,
  content_html       TEXT NOT NULL DEFAULT '',
  cover_image_url    TEXT,
  category_id        INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
  content_type       TEXT NOT NULL DEFAULT 'course-comparison',
  status             TEXT NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft', 'published')),
  author_id          INTEGER REFERENCES authors(id) ON DELETE SET NULL,
  author_name        TEXT NOT NULL DEFAULT 'Skillslash Team', -- denormalised fallback, kept in sync on save
  read_minutes       INTEGER,

  -- SEO
  meta_title         TEXT,
  meta_description   TEXT,
  canonical_url       TEXT,
  focus_keyword      TEXT,
  keywords           TEXT[] NOT NULL DEFAULT '{}',
  robots_index       BOOLEAN NOT NULL DEFAULT true,
  robots_follow      BOOLEAN NOT NULL DEFAULT true,

  -- Social / Open Graph
  og_title           TEXT,
  og_description     TEXT,
  og_image_url       TEXT,
  twitter_card       TEXT NOT NULL DEFAULT 'summary_large_image',

  -- AEO (answer engines) / GEO & AIO (generative + AI-overview engines)
  faqs               JSONB NOT NULL DEFAULT '[]',
  key_takeaways      JSONB NOT NULL DEFAULT '[]',
  schema_type        TEXT NOT NULL DEFAULT 'BlogPosting',
  structured_data_override JSONB,

  published_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- `CREATE TABLE IF NOT EXISTS` above is a no-op once blog_posts already
-- exists, so a column added to that definition after the table was first
-- created (author_id) never actually lands without an explicit ALTER TABLE.
-- Every column blog_posts might already have gets the same treatment here
-- going forward, so this file stays safe to run against a fresh database or
-- one that already has the table.
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL;
-- Structured, admin-editable ItemList-of-Course entries, same shape as the
-- Course/Offer/CourseInstance JSON-LD blocks this pattern already produces
-- on other sites in this account. See lib/cmsPostSchema.js for the
-- generated graph.
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS courses JSONB NOT NULL DEFAULT '[]';

CREATE INDEX IF NOT EXISTS idx_blog_posts_status    ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category  ON blog_posts (category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published_at DESC);

-- keep updated_at current on every edit
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_authors_updated_at ON authors;
CREATE TRIGGER trg_authors_updated_at
  BEFORE UPDATE ON authors
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_site_settings_updated_at ON site_settings;
CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
