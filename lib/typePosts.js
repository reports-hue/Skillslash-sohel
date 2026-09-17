// Shared data loader for the type-listing pages (pages/course-guides.js,
// pages/comparisons.js, pages/career-advice.js, pages/resources.js) - the
// same "merge hand-authored posts with published CMS posts, filter, sort"
// logic pages/category/[slug].js already has, parameterized by content
// type instead of category.
import posts from "../Data/blog/posts"

export async function loadPostsByType(typeSlug) {
  let cmsPosts = []
  try {
    // Dynamic import, not a top-level one - lib/blogPosts.js pulls in `pg`,
    // which has no browser build. See pages/category/[slug].js for the
    // same note.
    const { listPosts } = await import("./blogPosts")
    const rows = await listPosts({ status: "published" })
    cmsPosts = rows
      .filter((r) => r.contentType === typeSlug)
      .map((r) => ({
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        category: r.categorySlug,
        publishedAt: r.publishedAt,
        readMinutes: r.readMinutes,
        cover: r.coverImageUrl || "/covers/_default.svg",
        href: `/blog/${r.slug}`,
      }))
  } catch (err) {
    // A missing/unreachable DATABASE_URL should not take the page down -
    // it just means no CMS posts show up yet.
    console.error(`type page (${typeSlug}): could not load CMS posts`, err)
  }

  return [...posts.filter((post) => post.type === typeSlug), ...cmsPosts].sort(
    (a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)
  )
}

// Same merge, unfiltered - every hand-authored and CMS post regardless of
// type, for pages/articles.js (the dedicated article-listing page, split
// out from "/" so the homepage can be a landing page - see pages/index.js).
export async function loadAllPosts() {
  let cmsPosts = []
  try {
    const { listPosts } = await import("./blogPosts")
    const rows = await listPosts({ status: "published" })
    cmsPosts = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.categorySlug,
      publishedAt: r.publishedAt,
      readMinutes: r.readMinutes,
      cover: r.coverImageUrl || "/covers/_default.svg",
      href: `/blog/${r.slug}`,
    }))
  } catch (err) {
    console.error("articles page: could not load CMS posts", err)
  }

  return [...posts, ...cmsPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}
