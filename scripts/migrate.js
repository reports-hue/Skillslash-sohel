// One-shot schema + category seed. Safe to re-run - every statement is
// idempotent (CREATE ... IF NOT EXISTS / ON CONFLICT DO NOTHING).
require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local and retry.");
  process.exit(1);
}

// Same rule as lib/db.js: no TLS for a database with no TLS listener -
// localhost, or the docker-compose `db` service - real TLS for anything else.
let dbHost = "";
try {
  dbHost = new URL(process.env.DATABASE_URL).hostname;
} catch {}
const isLocal = ["localhost", "127.0.0.1", "db"].includes(dbHost);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

// Same 6 categories the static site already uses (Data/blog/categories.js),
// so CMS posts slot into the existing /category/<slug> pages and nav.
const CATEGORIES = [
  { slug: "data-science", name: "Data Science", accent: "#4f419a", sort_order: 1,
    description: "Course comparisons, institute round-ups and career guidance for people moving into data science." },
  { slug: "artificial-intelligence", name: "Artificial Intelligence", accent: "#b5468a", sort_order: 2,
    description: "Programmes, tooling and career paths across machine learning, deep learning and generative AI." },
  { slug: "dsa", name: "DSA", accent: "#2f7d6b", sort_order: 3,
    description: "Data structures, algorithms and system design - what the best courses cover and how they compare." },
  { slug: "cloud", name: "Cloud", accent: "#2b6cb0", sort_order: 4,
    description: "Cloud platforms, certifications and the training that actually maps to the job market." },
  { slug: "fde", name: "FDE", accent: "#c2681a", sort_order: 5,
    description: "Full-stack development engineering - bootcamps and degree routes compared on stack coverage, projects and hiring outcomes." },
  { slug: "sde", name: "SDE", accent: "#b3452f", sort_order: 6,
    description: "Software development engineering programmes, interview preparation and the courses that actually land offers." },
];

async function main() {
  const schema = fs.readFileSync(path.join(__dirname, "..", "db", "schema.sql"), "utf8");
  console.log("Applying schema...");
  await pool.query(schema);

  console.log("Seeding categories...");
  for (const c of CATEGORIES) {
    await pool.query(
      `INSERT INTO blog_categories (slug, name, description, accent, sort_order)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (slug) DO UPDATE
         SET name = EXCLUDED.name,
             description = EXCLUDED.description,
             accent = EXCLUDED.accent,
             sort_order = EXCLUDED.sort_order`,
      [c.slug, c.name, c.description, c.accent, c.sort_order]
    );
  }

  console.log("Seeding default author...");
  const { rows: existingDefault } = await pool.query(
    "SELECT id FROM authors WHERE is_default = true LIMIT 1"
  );
  let defaultAuthorId = existingDefault[0]?.id;
  if (!defaultAuthorId) {
    const { rows } = await pool.query(
      `INSERT INTO authors (name, slug, title, bio, is_default)
       VALUES ($1, $2, $3, $4, true)
       ON CONFLICT (slug) DO UPDATE SET is_default = true
       RETURNING id`,
      [
        "Skillslash Team",
        "skillslash-team",
        "Editorial Team",
        "The Skillslash editorial team researches and writes course comparisons, career guides and industry analysis for people building a career in tech.",
      ]
    );
    defaultAuthorId = rows[0].id;
  }

  console.log("Seeding default site settings...");
  await pool.query(
    `INSERT INTO site_settings (id, site_name, site_description, default_meta_title_template, default_author_id)
     VALUES (1, 'Skillslash', 'Course comparisons, certifications and career guidance for tech careers.', '{title} - Skillslash Blog', $1)
     ON CONFLICT (id) DO UPDATE
       SET default_author_id = COALESCE(site_settings.default_author_id, EXCLUDED.default_author_id)`,
    [defaultAuthorId]
  );

  console.log("Done. Tables ready: admin_users, blog_categories, blog_posts, authors, site_settings.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
