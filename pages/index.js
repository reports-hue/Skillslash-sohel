import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import dynamic from "next/dynamic"
import { LuArrowRight } from "react-icons/lu"
import Navbar from "../components/Navbar/Navbar"
import Hero from "../components/Blog/Hero/Hero"
import TypeTabs from "../components/Blog/TypeTabs/TypeTabs"
import PostCard from "../components/Blog/PostCard/PostCard"
import { Newsletter, PopularArticles, TakeNextStep } from "../components/Blog/Sidebar/Sidebar"
import posts from "../Data/blog/posts"
import categories from "../Data/blog/categories"
import styles from "../styles/blog.module.css"

const Footer = dynamic(() => import("../components/Footer/Footer"))

export default function Home({
  sorted,
  popularCategories,
  popularPosts,
  typeCounts,
  hasHeroPhoto,
}) {
  const router = useRouter()
  const [activeType, setActiveType] = useState("all")

  // The navbar's Course Guides/Comparisons/Career Advice/Student Stories/
  // Resources links point at /?type=<slug> - keeping this in sync with the
  // URL (instead of local-only state) is what makes those links actually
  // land on the right tab instead of just dropping the visitor on "All
  // Articles" and silently ignoring the query string.
  useEffect(() => {
    if (!router.isReady) return;
    const fromUrl = typeof router.query.type === "string" ? router.query.type : "all";
    setActiveType(fromUrl);
  }, [router.isReady, router.query.type]);

  const handleTypeChange = (type) => {
    setActiveType(type);
    router.push(
      { pathname: "/", query: type === "all" ? {} : { type } },
      undefined,
      { shallow: true }
    );
  };

  const visible = useMemo(
    () =>
      activeType === "all"
        ? sorted
        : sorted.filter((post) => post.type === activeType),
    [activeType, sorted]
  )

  const [featured, ...rest] = visible
  const grid = rest.slice(0, 6)

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
        <div className={styles.layout}>
          <main className={styles.main}>
            <TypeTabs
              active={activeType}
              onChange={handleTypeChange}
              counts={typeCounts}
            />

            {featured ? (
              <>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>Featured Article</h2>
                </div>
                <PostCard post={featured} variant="featured" />
              </>
            ) : (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>Nothing here yet</p>
                <p className={styles.emptyText}>
                  We have not published in this format yet. Try another tab.
                </p>
              </div>
            )}

            {grid.length ? (
              <>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>Latest Articles</h2>
                </div>
                <div className={styles.grid}>
                  {grid.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            ) : null}
          </main>

          <aside className={styles.sidebar}>
            <Newsletter />
            <PopularArticles posts={popularPosts} />
            <TakeNextStep />
          </aside>
        </div>

        {popularCategories.map((category) => (
          <section key={category.slug} className={styles.section}>
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
  // hand-authored articles. `revalidate` below keeps this page mostly
  // static while still picking up new/edited CMS posts within a minute.
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

  const typeCounts = { all: sorted.length }
  sorted.forEach((post) => {
    typeCounts[post.type] = (typeCounts[post.type] || 0) + 1
  })

  // The hero photo is optional: drop public/hero.jpg in and it is used.
  const hasHeroPhoto = fs.existsSync(
    path.join(process.cwd(), "public", "hero.jpg")
  )

  return {
    props: { sorted, popularCategories, popularPosts, typeCounts, hasHeroPhoto },
    revalidate: 60,
  }
}
