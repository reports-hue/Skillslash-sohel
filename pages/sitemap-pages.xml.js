// Sitemap branch: homepage, evergreen static pages, and the Navbar's
// section pages (Articles/Course Guides/Comparisons/Career Advice/
// Resources). See pages/sitemap.xml.js for the index this hangs off of.
import { urlEntry, urlset, writeXml, SITE_URL } from "../lib/sitemapCore";

function buildSitemap() {
  const now = new Date().toISOString();
  const entries = [
    urlEntry(`${SITE_URL}/`, { lastmod: now, priority: "1.00", changefreq: "weekly" }),
    urlEntry(`${SITE_URL}/articles`, { lastmod: now, priority: "0.9", changefreq: "daily" }),
    urlEntry(`${SITE_URL}/course-guides`, { lastmod: now, priority: "0.7", changefreq: "weekly" }),
    urlEntry(`${SITE_URL}/comparisons`, { lastmod: now, priority: "0.7", changefreq: "weekly" }),
    urlEntry(`${SITE_URL}/career-advice`, { lastmod: now, priority: "0.7", changefreq: "weekly" }),
    urlEntry(`${SITE_URL}/resources`, { lastmod: now, priority: "0.7", changefreq: "weekly" }),
    urlEntry(`${SITE_URL}/selfpaced`, { lastmod: now, priority: "0.6", changefreq: "monthly" }),
    urlEntry(`${SITE_URL}/demo-videos`, { lastmod: now, priority: "0.5", changefreq: "monthly" }),
    urlEntry(`${SITE_URL}/terms-of-use`, { lastmod: now, priority: "0.3", changefreq: "yearly" }),
    urlEntry(`${SITE_URL}/privacy-statement`, { lastmod: now, priority: "0.3", changefreq: "yearly" }),
    urlEntry(`${SITE_URL}/refunds-cancellation`, { lastmod: now, priority: "0.3", changefreq: "yearly" }),
  ];
  return urlset(entries);
}

export default function SitemapPages() {
  return null;
}

export async function getServerSideProps({ res }) {
  writeXml(res, buildSitemap());
  return { props: {} };
}
