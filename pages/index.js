// The homepage is a landing page, not the article feed - it introduces
// the site and routes a visitor into the right section (SectionShowcase),
// rather than being an infinite list of posts itself. The full article
// list lives at pages/articles.js; this page links to it like any other
// section. Split out this way so "/" can be optimized as a landing page
// (a clear value proposition, a real FAQ for AEO/GEO, fast to scan) while
// pages/articles.js is optimized as a content hub (paginatable, crawlable
// post listing) - the two had been the same page and same URL before,
// which served neither job well.
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"
import { LuArrowRight } from "react-icons/lu"
import Navbar from "../components/Navbar/Navbar"
import Hero from "../components/Blog/Hero/Hero"
import SectionShowcase from "../components/Blog/SectionShowcase/SectionShowcase"
import HomeFaq from "../components/Blog/HomeFaq/HomeFaq"
import PostCard from "../components/Blog/PostCard/PostCard"
import { Newsletter, PopularArticles, TakeNextStep } from "../components/Blog/Sidebar/Sidebar"
import posts from "../Data/blog/posts"
import categories from "../Data/blog/categories"
import styles from "../styles/blog.module.css"

const Footer = dynamic(() => import("../components/Footer/Footer"))

export default function Home({
  latestPosts,
  popularCategories,
  popularPosts,
  hasHeroPhoto,
}) {
  return (
    <div className={styles.page}>
      <Head>
        <title>Skillslash | Learn, Compare & Choose the Right Career Path</title>
        <meta
          name="description"
          content="In-depth guides, course comparisons, career advice and real stories to help you choose the right programs, certifications and master's degrees for your tech career."
        />
      </Head>

      <Navbar />
      <Hero hasPhoto={hasHeroPhoto} />

      <div className={styles.shell}>
        <section className={styles.section} style={{ paddingBottom: 0 }}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>Explore Skillslash</h2>
              <p className={styles.sectionDesc}>
                Five ways into the same research: pick the one that matches what you're deciding right now.
              </p>
            </div>
          </div>
          <SectionShowcase />
        </section>

        <div className={styles.layout}>
          <main className={styles.main}>
            {latestPosts.length ? (
              <section className={styles.section} style={{ paddingTop: 0 }}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>Latest Articles</h2>
                  <Link href="/articles" className={styles.sectionLink}>
                    View all articles <LuArrowRight aria-hidden="true" />
                  </Link>
                </div>
                <div className={styles.grid}>
                  {latestPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            ) : null}

            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              </div>
              <HomeFaq />
            </section>
          </main>

          <aside className={styles.sidebar}>
            <Newsletter />
            <PopularArticles posts={popularPosts} />
            <TakeNextStep />
          </aside>
        </div>

        {popularCategories.map((category) => (
          <section key={category.slug} className={styles.section} style={{ paddingTop: 0 }}>
            <div className={styles.sectionHead}>
              <div>
                <h2 className={styles.sectionTitle}>{category.name}</h2>
                <p className={styles.sectionDesc}>{category.description}</p>
              </div>
              <Link
                href={`/category/${category.slug}`}
                className={styles.sectionLink}
              >
                View all {category.total} articles{" "}
                <LuArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.grid}>
              {category.posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const fs = require("fs")
  const path = require("path")

  // Merge in published CMS posts (written from /admin) alongside the
  // hand-authored articles, same as pages/articles.js, so the "Latest
  // Articles" teaser below reflects everything actually published.
  let cmsPosts = []
  try {
    // Dynamic import, not a top-level one - see pages/category/[slug].js
    // for why (lib/blogPosts.js pulls in `pg`, which has no browser build).
    const { listPosts } = await import("../lib/blogPosts")
    const rows = await listPosts({ status: "published" })
    cmsPosts = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.categorySlug,
      publishedAt: r.publishedAt,
      updatedAt: r.updatedAt,
      readMinutes: r.readMinutes,
      type: r.contentType,
      cover: r.coverImageUrl || "/covers/_default.svg",
      href: `/blog/${r.slug}`,
    }))
  } catch (err) {
    console.error("homepage: could not load CMS posts", err)
  }

  const sorted = [...posts, ...cmsPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  )

  const latestPosts = sorted.slice(0, 6)

  const popularCategories = categories
    .filter((category) => sorted.some((post) => post.category === category.slug))
    .map((category) => {
      const inCategory = sorted.filter(
        (post) => post.category === category.slug
      )
      return { ...category, total: inCategory.length, posts: inCategory.slice(0, 3) }
    })

  const popularPosts = sorted
    .filter((post) => typeof post.popular === "number")
    .sort((a, b) => a.popular - b.popular)

  // The hero photo is optional: drop public/hero.jpg in and it is used.
  const hasHeroPhoto = fs.existsSync(
    path.join(process.cwd(), "public", "hero.jpg")
  )

  return {
    props: { latestPosts, popularCategories, popularPosts, hasHeroPhoto },
    revalidate: 60,
  }
}
