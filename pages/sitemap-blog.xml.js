// Sitemap branch: every article - hand-authored (Data/blog/posts.js, at
// /<slug>) and CMS-written (Postgres via /admin, at /blog/<slug>). See
// pages/sitemap.xml.js for the index this hangs off of.
import posts from "../Data/blog/posts";
import { urlEntry, urlset, writeXml, iso, SITE_URL } from "../lib/sitemapCore";

// Hand-authored articles that live under /blogs/<slug> (a separate prefix
// from the root-level `posts` registry below and from the CMS's /blog/
// <slug>) - long-form comparison pieces built as their own standalone page
// rather than through Data/blog/posts.js or the admin CMS. Add an entry
// here whenever a new one of these ships.
const blogsPrefixedPosts = [
  { slug: "best-ai-courses-in-bangalore-with-placement-assistance", updatedAt: "2026-09-09" },
];

async function buildSitemap() {
  const now = iso(Date.now());
  const entries = [];

  posts.forEach((post) => {
    entries.push(
      urlEntry(`${SITE_URL}/${post.slug}`, {
        lastmod: iso(post.updatedAt || post.publishedAt || now),
        priority: "0.8",
        changefreq: "monthly",
      })
    );
  });

  blogsPrefixedPosts.forEach((post) => {
    entries.push(
      urlEntry(`${SITE_URL}/blogs/${post.slug}`, {
        lastmod: iso(post.updatedAt || now),
        priority: "0.8",
        changefreq: "monthly",
      })
    );
  });

  try {
    // Dynamic import, not a top-level one - see pages/category/[slug].js
    // for why (lib/blogPosts.js pulls in `pg`, which has no browser build).
    const { listPosts } = await import("../lib/blogPosts");
    const cmsPosts = await listPosts({ status: "published" });
    cmsPosts
      .filter((p) => p.robotsIndex)
      .forEach((p) => {
        entries.push(
          urlEntry(`${SITE_URL}/blog/${p.slug}`, {
            lastmod: iso(p.updatedAt || p.publishedAt || now),
            priority: "0.8",
            changefreq: "monthly",
          })
        );
      });
  } catch (err) {
    // A missing/unreachable DATABASE_URL should not break this sitemap
    // branch - it just means CMS posts are temporarily left out of it.
    console.error("sitemap-blog: could not load CMS posts", err);
  }

  return urlset(entries);
}

export default function SitemapBlog() {
  return null;
}

export async function getServerSideProps({ res }) {
  writeXml(res, await buildSitemap());
  return { props: {} };
}
