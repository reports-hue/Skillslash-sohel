// Shared shell for the Navbar's Course Guides/Comparisons/Career Advice/
// Resources tabs - each one used to be the same "/" URL with a ?type=
// query string (pages/index.js's own in-page filter), which meant every
// tab was really the homepage under a different query, not a distinct,
// linkable, indexable page. Now each tab is a real route (pages/course-
// guides.js etc.) that renders this component server-side, filtered to
// its own content type - the same shape of fix pages/category/[slug].js
// already applied to categories.
import Head from "next/head"
import dynamic from "next/dynamic"
import Navbar from "../../Navbar/Navbar"
import PostCard from "../PostCard/PostCard"
import styles from "../../../styles/blog.module.css"

const Footer = dynamic(() => import("../../Footer/Footer"))

export default function TypeListingPage({
  title,
  description,
  kicker,
  canonicalPath,
  typePosts,
  emptyTitle,
  emptyText,
}) {
  return (
    <div className={styles.page}>
      <Head>
        <title>{`${title} | Skillslash`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://skillslash.com${canonicalPath}`} />
        {/* A type with no articles yet is a thin page - keep it linked and
            crawlable (follow) but out of the index until it has content,
            same convention pages/category/[slug].js uses. */}
        {typePosts.length === 0 && (
          <meta name="robots" content="noindex,follow" />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://skillslash.com/" },
                { "@type": "ListItem", position: 2, name: title, item: `https://skillslash.com${canonicalPath}` },
              ],
            }),
          }}
        />
      </Head>

      <Navbar />

      <section className={styles.categoryHeader}>
        <div className={styles.shell}>
          <p className={styles.kicker}>{kicker}</p>
          <h1 className={styles.categoryTitle}>{title}</h1>
          <p className={styles.categoryDesc}>{description}</p>
        </div>
      </section>

      <main className={styles.section}>
        <div className={styles.shell}>
          {typePosts.length ? (
            <>
              <p className={styles.count}>
                {typePosts.length} {typePosts.length === 1 ? "article" : "articles"}
              </p>
              <div className={styles.grid} style={{ marginTop: "20px" }}>
                {typePosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>{emptyTitle}</p>
              <p className={styles.emptyText}>{emptyText}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
