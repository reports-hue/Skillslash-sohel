// llms.txt - the emerging convention AI/answer-engine crawlers (and humans)
// check for a concise, structured summary of what a site is and where its
// content lives, since crawling full HTML for this is wasteful for them.
// This used to be a hand-maintained static file (public/llms.txt) that only
// listed categories - it never grew to include actual CMS posts, so it went
// stale the moment the CMS had more than a handful of articles. Generated
// here the same way pages/sitemap.xml.js generates the XML sitemap: read
// live from Postgres on every request, cached at the edge/CDN.
import categories from "../Data/blog/categories";

const SITE_URL = "https://skillslash.com";
const SITE_NAME = "Skillslash";
const DESCRIPTION =
  "Skillslash publishes independent comparisons of tech education programmes " +
  "- course reviews, institute round-ups, certification guides and career " +
  "advice - covering data science, artificial intelligence, DSA, cloud, " +
  "full-stack/software development engineering, and master's degrees.";
const DISCLOSURE =
  "Skillslash is a content publisher, not the training provider being " +
  "reviewed in any given article. Articles compare multiple institutes and " +
  "programmes on curriculum, fees and outcomes; where a listing is " +
  "sponsored or affiliate linked, that is disclosed on the page.";

function mdLink(title, url) {
  // llms.txt entries are single-line "- [Title](url): note" list items -
  // a title containing "]" or a newline would break that, so flatten it.
  const safeTitle = (title || "").replace(/\]/g, ")").replace(/\s+/g, " ").trim();
  return `- [${safeTitle}](${url})`;
}

async function buildLlmsTxt() {
  const lines = [];
  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(`> ${DESCRIPTION}`);
  lines.push("");
  lines.push(DISCLOSURE);
  lines.push("");

  // --- Categories, each followed by its live published posts ---
  let cmsPosts = [];
  try {
    // Dynamic import, not top-level - lib/blogPosts.js pulls in `pg`, which
    // has no browser build (see pages/category/[slug].js for the same note).
    const { listPosts } = await import("../lib/blogPosts");
    cmsPosts = (await listPosts({ status: "published" })).filter((p) => p.robotsIndex);
  } catch (err) {
    // A missing/unreachable DATABASE_URL should not break the whole file -
    // it just means posts are temporarily left out, same fallback the
    // sitemap uses.
    console.error("llms.txt: could not load CMS posts", err);
  }

  categories.forEach((category) => {
    const categoryPosts = cmsPosts.filter((p) => p.categorySlug === category.slug);
    lines.push(`## ${category.name}`);
    lines.push("");
    lines.push(category.description || "");
    lines.push("");
    lines.push(mdLink("Category overview", `${SITE_URL}/category/${category.slug}`));
    categoryPosts.forEach((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const note = (post.excerpt || "").replace(/\s+/g, " ").trim();
      lines.push(note ? `${mdLink(post.title, url)}: ${note}` : mdLink(post.title, url));
    });
    lines.push("");
  });

  // Posts whose category no longer matches any known category slug (e.g.
  // stale data) still belong in the file somewhere rather than vanishing.
  const categorizedSlugs = new Set(categories.map((c) => c.slug));
  const uncategorized = cmsPosts.filter((p) => !categorizedSlugs.has(p.categorySlug));
  if (uncategorized.length) {
    lines.push("## More Articles");
    lines.push("");
    uncategorized.forEach((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const note = (post.excerpt || "").replace(/\s+/g, " ").trim();
      lines.push(note ? `${mdLink(post.title, url)}: ${note}` : mdLink(post.title, url));
    });
    lines.push("");
  }

  lines.push("## Site");
  lines.push("");
  lines.push(mdLink("Homepage", `${SITE_URL}/`));
  lines.push(mdLink("All Articles", `${SITE_URL}/articles`));
  lines.push(mdLink("Course Guides", `${SITE_URL}/course-guides`));
  lines.push(mdLink("Comparisons", `${SITE_URL}/comparisons`));
  lines.push(mdLink("Career Advice", `${SITE_URL}/career-advice`));
  lines.push(mdLink("Resources", `${SITE_URL}/resources`));
  lines.push(mdLink("Search", `${SITE_URL}/search`));
  lines.push(mdLink("Sitemap", `${SITE_URL}/sitemap.xml`));

  return lines.join("\n") + "\n";
}

// Rendered as plain text by getServerSideProps writing directly to the
// response; the component itself is never used - same pattern as
// pages/sitemap.xml.js.
export default function LlmsTxt() {
  return null;
}

export async function getServerSideProps({ res }) {
  const text = await buildLlmsTxt();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(text);
  res.end();
  return { props: {} };
}
