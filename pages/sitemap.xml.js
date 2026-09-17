// Sitemap index - one <sitemapindex> pointing at section-specific child
// sitemaps, instead of one flat <urlset> with every URL on the site mixed
// together (same tree structure as libraryminds.com/sitemap.xml). Each
// child is its own page/route:
//   sitemap-pages.xml       - homepage, evergreen pages, section pages
//   sitemap-blog.xml        - every article (hand-authored + CMS)
//   sitemap-categories.xml  - /category/* pages
//   sitemap-courses.xml     - legacy content/*.json course pages
//   sitemap-selfpaced.xml   - /selfpaced/* product pages
//   sitemap-liveclass.xml   - /liveclass/* page(s)
// robots.txt only needs to reference this index; crawlers follow the
// <sitemap> entries below to the rest on their own.
import { SITE_URL, writeXml } from "../lib/sitemapCore";

const CHILD_SITEMAPS = [
  "sitemap-pages.xml",
  "sitemap-blog.xml",
  "sitemap-categories.xml",
  "sitemap-courses.xml",
  "sitemap-selfpaced.xml",
  "sitemap-liveclass.xml",
];

function buildIndex() {
  const now = new Date().toISOString();
  const entries = CHILD_SITEMAPS.map(
    (name) => `<sitemap><loc>${SITE_URL}/${name}</loc><lastmod>${now}</lastmod></sitemap>`
  );
  // Same fixed-string namespace requirement as lib/sitemapCore.js's
  // urlset() - must be "http://" (no s).
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
    "\n"
  )}\n</sitemapindex>`;
}

// Rendered as XML by getServerSideProps writing directly to the response;
// the component itself is never used.
export default function SitemapIndex() {
  return null;
}

export async function getServerSideProps({ res }) {
  writeXml(res, buildIndex());
  return { props: {} };
}
