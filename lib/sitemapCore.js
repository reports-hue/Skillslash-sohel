// Shared helpers for the sitemap tree: pages/sitemap.xml.js (the index)
// and its child sitemaps (pages/sitemap-pages.xml.js, sitemap-blog.xml.js,
// sitemap-categories.xml.js, sitemap-courses.xml.js,
// sitemap-selfpaced.xml.js, sitemap-liveclass.xml.js) - one <sitemapindex>
// pointing at section-specific <urlset> files instead of one flat file,
// same structure as libraryminds.com/sitemap.xml.
import fs from "fs";
import path from "path";

export const SITE_URL = "https://skillslash.com";

// content/*.json (via lib/page.js) and SkillsContent/*.json (via
// lib/newPages.js) drive most of the legacy course pages; Event/*.json
// drives /event/*. Reading them directly here keeps each child sitemap in
// sync with whatever pages actually exist, instead of a hand-maintained
// list.
export function slugsFromDir(dirName) {
  // dirName is a variable, not a literal, so Turbopack can't tell which
  // directory a given route needs at build time - its fallback is to trace
  // and ship the whole project into that route's serverless function. Each
  // caller's own directory is declared explicitly in next.config.js's
  // outputFileTracingIncludes instead, so it's safe to tell the tracer not
  // to try.
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), dirName);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(/*turbopackIgnore: true*/ dir).map((file) => ({
    slug: file.replace(/\.(json|md)$/i, ""),
    mtime: fs.statSync(path.join(/*turbopackIgnore: true*/ dir, file)).mtime,
  }));
}

// A page that canonicalises to a different URL is telling Google not to
// index it, so submitting it in a sitemap sends a contradictory signal.
// Read each content/*.json's own declared canonical and drop the ones
// that point away.
export function declaresForeignCanonical(dirName, slug) {
  try {
    const raw = fs.readFileSync(
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

// Slugs may contain "&" (e.g. "data-science-&-aI-bootcamp"). That character
// is legal in a path segment - percent-encoding it would produce a
// different URL string from the one the page serves and self-canonicalises
// to - so escape it for XML only.
export function xmlLoc(url) {
  return url.replace(/&/g, "&amp;");
}

export function iso(date) {
  return new Date(date).toISOString();
}

export function urlEntry(loc, { lastmod, priority, changefreq } = {}) {
  const parts = [`<loc>${xmlLoc(loc)}</loc>`];
  if (lastmod) parts.push(`<lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  return `<url>${parts.join("")}</url>`;
}

export function urlset(entries) {
  // The sitemap protocol's namespace is a fixed identifier string, not a
  // fetched URL - it must be exactly "http://" (no s) or validators
  // (Google Search Console included) flag "Incorrect namespace", even
  // though the XML itself parses fine either way.
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
    "\n"
  )}\n</urlset>`;
}

// Shared response-writing tail every sitemap page (index and children)
// uses in its getServerSideProps.
export function writeXml(res, xml) {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
}
