import { useMemo, useState, useEffect } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { LuSearch } from "react-icons/lu"
import Navbar from "../components/Navbar/Navbar"
import PostCard from "../components/Blog/PostCard/PostCard"
import CategoryNav from "../components/Blog/CategoryNav/CategoryNav"
import posts from "../Data/blog/posts"
import { categoryBySlug } from "../Data/blog/categories"
import styles from "../styles/blog.module.css"

const Footer = dynamic(() => import("../components/Footer/Footer"))

const matches = (post, term) => {
  if (!term) return true
  const category = categoryBySlug(post.category)
  const haystack = [post.title, post.excerpt, category ? category.name : ""]
    .join(" ")
    .toLowerCase()
  return term
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

export default function Search({ all }) {
  const router = useRouter()
  const [term, setTerm] = useState("")

  // Seed from ?q= once the router has parsed the query string.
  useEffect(() => {
    if (!router.isReady) return
    setTerm(typeof router.query.q === "string" ? router.query.q : "")
  }, [router.isReady, router.query.q])

  const results = useMemo(
    () => all.filter((post) => matches(post, term)),
    [all, term]
  )

  const submit = (event) => {
    event.preventDefault()
    const next = term.trim()
    router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search", undefined, {
      shallow: true,
    })
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Search Articles - Skillslash Blog</title>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="Search course comparisons, certification guides and career articles on the Skillslash blog."
        />
      </Head>

      <Navbar />

      <section className={styles.categoryHeader}>
        <div className={styles.shell}>
          <p className={styles.kicker}>Search</p>
          <h1 className={styles.categoryTitle}>All articles</h1>

          <form className={styles.searchBar} onSubmit={submit} role="search">
            <LuSearch className={styles.searchBarIcon} aria-hidden="true" />
            <input
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search blog articles, programs, topics..."
              aria-label="Search articles"
            />
            <button type="submit">Search</button>
          </form>

          <CategoryNav />
        </div>
      </section>

      <main className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.count}>
            {results.length} {results.length === 1 ? "article" : "articles"}
            {term ? ` matching “${term}”` : ""}
          </p>

          {results.length ? (
            <div className={styles.grid} style={{ marginTop: "20px" }}>
              {results.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No matches</p>
              <p className={styles.emptyText}>
                Try a broader term, or browse a category above.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export function getStaticProps() {
  const all = [...posts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  )
  return { props: { all } }
}
