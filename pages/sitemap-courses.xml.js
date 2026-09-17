// Sitemap branch: legacy content/*.json course pages, served via
// pages/[id].js. See pages/sitemap.xml.js for the index this hangs off of.
import {
  urlEntry,
  urlset,
  writeXml,
  iso,
  slugsFromDir,
  declaresForeignCanonical,
  SITE_URL,
} from "../lib/sitemapCore";

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

function buildSitemap() {
  const entries = slugsFromDir("content")
    .filter(({ slug }) => !CONTENT_SHADOWED_BY_REDIRECT.has(slug))
    .filter(({ slug }) => !declaresForeignCanonical("content", slug))
    .map(({ slug, mtime }) =>
      urlEntry(`${SITE_URL}/${slug}`, {
        lastmod: iso(mtime),
        priority: "0.7",
        changefreq: "monthly",
      })
    );
  return urlset(entries);
}

export default function SitemapCourses() {
  return null;
}

export async function getServerSideProps({ res }) {
  writeXml(res, buildSitemap());
  return { props: {} };
}
