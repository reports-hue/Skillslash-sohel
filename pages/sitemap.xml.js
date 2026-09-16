import fs from "fs";
import path from "path";
import categories from "../Data/blog/categories";
import posts from "../Data/blog/posts";

const SITE_URL = "https://skillslash.com";

// content/*.json (via lib/page.js) and SkillsContent/*.json (via
// lib/newPages.js) drive most of the legacy course pages; Event/*.json
// drives /event/*. Reading them directly here keeps the sitemap in sync
// with whatever pages actually exist, instead of a hand-maintained list.
function slugsFromDir(dirName) {
  // dirName is a variable, not a literal, so Turbopack can't tell which
  // directory this needs at build time - its fallback is to trace and ship
  // the whole project into this route's serverless function. The three
  // directories this is ever actually called with are declared explicitly
  // in next.config.js's outputFileTracingIncludes for "/sitemap.xml"
  // instead, so it's safe to tell the tracer not to try.
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), dirName);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(/*turbopackIgnore: true*/ dir).map((file) => ({
    slug: file.replace(/\.(json|md)$/i, ""),
    mtime: fs.statSync(path.join(/*turbopackIgnore: true*/ dir, file)).mtime,
  }));
}

// Utility/private/thank-you/redirected pages are deliberately left out: they
// carry `noindex`, redirect elsewhere, or (like /search) have no fixed
// canonical content to rank.
const SELFPACED_EXCLUDE = new Set([
  "Project-session",
  "Project-session-dsa",
  "one-one-doubt-session",
  "one-one-doubt-session-dsa",
  "demo-ds",
]);

// "-ac1"/"-ps1" self-paced slugs are ad-campaign copies of an existing
// landing page with identical copy and title. They stay live for paid
// traffic and canonicalise to the clean slug, so only the clean slug is
// submitted here.
const CAMPAIGN_VARIANT = /-(ac1|ps1)$/;

// Ad-campaign tracking variants of the same landing page; only the clean
// slug goes in the sitemap so Google isn't asked to index near-duplicates.
const LIVECLASS_INCLUDE = new Set(["digital-marketing-master-course"]);

// These content/*.json slugs are also `source` values in next.config.js's
// redirects() - the redirect always wins, so the page is permanently
// unreachable and must not be submitted in the sitemap as if it were live.
// If a redirect is added for another content/ slug, add it here too.
const CONTENT_SHADOWED_BY_REDIRECT = new Set([
  "advanced-data-science-and-ai-course-with-real-work-experience",
  "best-data-structures-algorithms-course",
  "data-analytics-course",
  "data-science-course",
  "data-science-course-in-kolkata",
  "data-structures-algorithm-&-system-design",
  "data-structures-algorithms",
  "data-structures-and-algorithms-course",
  "data-structures-course",
  "full-stack-developer-course",
]);

// A page that canonicalises to a different URL is telling Google not to index
// it, so submitting it in the sitemap sends a contradictory signal. Read each
// content/*.json's own declared canonical and drop the ones that point away.
function declaresForeignCanonical(dirName, slug) {
  try {
    const raw = fs.readFileSync(
      // Same reasoning as slugsFromDir above - only ever called with
      // "content", which next.config.js's outputFileTracingIncludes for
      // "/sitemap.xml" already covers.
      path.join(/*turbopackIgnore: true*/ process.cwd(), dirName, `${slug}.json`),
      "utf8"
    );
    const canonical = JSON.parse(raw)?.metaInfo?.canonical;
    if (!canonical) return false;
    return canonical.replace(/\/$/, "") !== `${SITE_URL}/${slug}`;
  } catch (err) {
    return false;
  }
}

// Slugs may contain "&" (e.g. "data-science-&-aI-bootcamp"). That character is
// legal in a path segment - percent-encoding it would produce a different URL
// string from the one the page serves and self-canonicalises to - so escape it
// for XML only.
function xmlLoc(url) {
  return url.replace(/&/g, "&amp;");
}

function iso(date) {
  return new Date(date).toISOString();
}

function urlEntry(loc, lastmod, priority) {
  const parts = [`<loc>${xmlLoc(loc)}</loc>`];
  if (lastmod) parts.push(`<lastmod>${lastmod}</lastmod>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  return `<url>${parts.join("")}</url>`;
}

async function buildSitemap() {
  const now = iso(Date.now());
  const entries = [];

  // --- Homepage & evergreen static pages ---
  entries.push(urlEntry(`${SITE_URL}/`, now, "1.00"));
  entries.push(urlEntry(`${SITE_URL}/demo-videos`, now, "0.5"));
  entries.push(urlEntry(`${SITE_URL}/terms-of-use`, now, "0.3"));
  entries.push(urlEntry(`${SITE_URL}/privacy-statement`, now, "0.3"));
  entries.push(urlEntry(`${SITE_URL}/refunds-cancellation`, now, "0.3"));

  // --- Blog: category pages (only ones that actually have a post) ---
  categories.forEach((category) => {
    const count = posts.filter((p) => p.category === category.slug).length;
    if (count > 0) {
      entries.push(urlEntry(`${SITE_URL}/category/${category.slug}`, now, "0.7"));
    }
  });

  // --- Blog: articles ---
  posts.forEach((post) => {
    entries.push(
      urlEntry(
        `${SITE_URL}/${post.slug}`,
        iso(post.updatedAt || post.publishedAt || now),
        "0.8"
      )
    );
  });

  // --- Legacy course pages: content/*.json via pages/[id].js ---
  slugsFromDir("content")
    .filter(({ slug }) => !CONTENT_SHADOWED_BY_REDIRECT.has(slug))
    .filter(({ slug }) => !declaresForeignCanonical("content", slug))
    .forEach(({ slug, mtime }) => {
      entries.push(
        urlEntry(`${SITE_URL}/${slug}`, iso(mtime), "0.7")
      );
    });

  // --- Self-paced product pages, excluding the noindexed booking utilities ---
  entries.push(urlEntry(`${SITE_URL}/selfpaced`, now, "0.6"));
  slugsFromDir("SkillsContent")
    .filter(({ slug }) => !SELFPACED_EXCLUDE.has(slug))
    .filter(({ slug }) => !CAMPAIGN_VARIANT.test(slug))
    .forEach(({ slug, mtime }) => {
      entries.push(
        urlEntry(`${SITE_URL}/selfpaced/${slug}`, iso(mtime), "0.5")
      );
    });

  // Event pages are intentionally absent: they are registration pages for
  // events that ran in 2022 and now carry noindex. /event itself is noindexed
  // too - it is a hub over expired sessions - so it is not listed either.

  // --- CMS blog posts (written from /admin, stored in Postgres) ---
  try {
    // Dynamic import, not a top-level one - see pages/category/[slug].js
    // for why (lib/blogPosts.js pulls in `pg`, which has no browser build).
    const { listPosts } = await import("../lib/blogPosts");
    const cmsPosts = await listPosts({ status: "published" });
    cmsPosts
      .filter((p) => p.robotsIndex)
      .forEach((p) => {
        entries.push(
          urlEntry(
            `${SITE_URL}/blog/${p.slug}`,
            iso(p.updatedAt || p.publishedAt || now),
            "0.8"
          )
        );
      });
  } catch (err) {
    // A missing/unreachable DATABASE_URL should not break the whole
    // sitemap - it just means CMS posts are temporarily left out of it.
    console.error("sitemap: could not load CMS posts", err);
  }

  // --- Live-class page: only the canonical (non ad-tracking-variant) slug ---
  slugsFromDir("DigitalMarketingContent")
    .filter(({ slug }) => LIVECLASS_INCLUDE.has(slug))
    .forEach(({ slug, mtime }) => {
      entries.push(
        urlEntry(`${SITE_URL}/liveclass/${slug}`, iso(mtime), "0.5")
      );
    });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
    "\n"
  )}\n</urlset>`;
}

// Rendered as XML by getServerSideProps writing directly to the response;
// the component itself is never used.
export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const xml = await buildSitemap();
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
  return { props: {} };
}
