import Head from "next/head"
import dynamic from "next/dynamic"
import Navbar from "../../components/Navbar/Navbar"
import PostCard from "../../components/Blog/PostCard/PostCard"
import CategoryNav from "../../components/Blog/CategoryNav/CategoryNav"
import posts from "../../Data/blog/posts"
import categories from "../../Data/blog/categories"
import styles from "../../styles/blog.module.css"

const Footer = dynamic(() => import("../../components/Footer/Footer"))

export default function Category({ category, categoryPosts }) {
  return (
    <div className={styles.page}>
      <Head>
        <title>{`${category.name} Articles - Skillslash Blog`}</title>
        <meta name="description" content={category.description} />
        {/* A category with no articles yet is a thin page - keep it linked and
            crawlable (follow) but out of the index until it has content. It
            flips back to indexable automatically once a post is assigned. */}
        {categoryPosts.length === 0 && (
          <meta name="robots" content="noindex,follow" />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://skillslash.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: category.name,
                  item: `https://skillslash.com/category/${category.slug}`,
                },
              ],
            }),
          }}
        />
      </Head>

      <Navbar noHam={false} />

      <section className={styles.categoryHeader}>
        <div className={styles.shell}>
          <p className={styles.kicker}>Category</p>
          <h1 className={styles.categoryTitle}>{category.name}</h1>
          <p className={styles.categoryDesc}>{category.description}</p>
          <CategoryNav active={category.slug} />
        </div>
      </section>

      <main className={styles.section}>
        <div className={styles.shell}>
          {categoryPosts.length ? (
            <>
              <p className={styles.count}>
                {categoryPosts.length}{" "}
                {categoryPosts.length === 1 ? "article" : "articles"}
              </p>
              <div className={styles.grid} style={{ marginTop: "20px" }}>
                {categoryPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No articles here yet</p>
              <p className={styles.emptyText}>
                We are still writing for this category. Check back soon.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export function getStaticPaths() {
  return {
    paths: categories.map((category) => ({ params: { slug: category.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const category = categories.find((item) => item.slug === params.slug)

  // Merge the hand-authored articles (Data/blog/posts.js) with published
  // posts written in the admin CMS, so a new post shows up here without a
  // code change. `revalidate` keeps this page's own build mostly static
  // (fast, cacheable) while still picking up CMS edits within a minute -
  // the individual /blog/<slug> page is the one rendered per-request, for
  // readers and crawlers who land on it directly.
  let cmsPosts = []
  try {
    // Dynamic import, not a top-level one: lib/blogPosts.js pulls in `pg`,
    // which has no browser build. Next strips getStaticProps (and anything
    // only reachable from it) from the client bundle, but a top-level
    // `import` is evaluated unconditionally regardless of where it's used,
    // so the client compiler would still try to resolve `pg` and fail. A
    // dynamic `import()` called from here leaves nothing for it to find.
    const { listPublishedByCategory } = await import("../../lib/blogPosts")
    const rows = await listPublishedByCategory(params.slug, { limit: 100 })
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
    // A missing/unreachable DATABASE_URL should not take the whole
    // category page down - it just means no CMS posts show up yet.
    console.error("category page: could not load CMS posts", err)
  }

  const categoryPosts = [...posts.filter((post) => post.category === params.slug), ...cmsPosts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))

  return { props: { category, categoryPosts }, revalidate: 60 }
}
