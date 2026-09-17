// Sitemap branch: /category/* pages (only ones that actually have a
// post). See pages/sitemap.xml.js for the index this hangs off of.
import categories from "../Data/blog/categories";
import posts from "../Data/blog/posts";
import { urlEntry, urlset, writeXml, SITE_URL } from "../lib/sitemapCore";

function buildSitemap() {
  const now = new Date().toISOString();
  const entries = categories
    .filter((category) => posts.some((p) => p.category === category.slug))
    .map((category) =>
      urlEntry(`${SITE_URL}/category/${category.slug}`, {
        lastmod: now,
        priority: "0.7",
        changefreq: "weekly",
      })
    );
  return urlset(entries);
}

export default function SitemapCategories() {
  return null;
}

export async function getServerSideProps({ res }) {
  writeXml(res, buildSitemap());
  return { props: {} };
}
