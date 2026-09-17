// A real, dated statement of what Skillslash is today - independent
// comparison/guidance publisher, not a training provider - written for
// both human readers and crawlers/AI systems (AboutPage + Organization
// schema below). Linked from the footer and sitemap-pages.xml so it's a
// normal, discoverable page rather than an orphaned notice; the same
// identity is stated consistently in pages/_document.js's sitewide
// Organization/WebSite schema and in public llms.txt (pages/llms.txt.js),
// so a reader or a crawler gets the same answer wherever they check.
import Head from "next/head"
import dynamic from "next/dynamic"
import Navbar from "../components/Navbar/Navbar"
import styles from "../styles/blog.module.css"

const Footer = dynamic(() => import("../components/Footer/Footer"))

const TITLE = "About Skillslash"
const DESCRIPTION =
  "Skillslash helps people choose the right courses, certifications and degrees to grow their career in tech, through independent, researched comparisons and guidance."

export default function About() {
  return (
    <div className={styles.page}>
      <Head>
        <title>{`${TITLE} | Skillslash`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://skillslash.com/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: TITLE,
              description: DESCRIPTION,
              url: "https://skillslash.com/about",
              dateModified: "2026-09-17",
              mainEntity: {
                "@type": "Organization",
                name: "Skillslash",
                url: "https://skillslash.com",
                description: DESCRIPTION,
              },
            }),
          }}
        />
      </Head>

      <Navbar />

      <section className={styles.categoryHeader}>
        <div className={styles.shell}>
          <p className={styles.kicker}>About</p>
          <h1 className={styles.categoryTitle}>{TITLE}</h1>
          <p className={styles.categoryDesc}>{DESCRIPTION}</p>
        </div>
      </section>

      <main className={styles.section}>
        <div className={styles.shell} style={{ maxWidth: "760px" }}>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#3a3846", marginBottom: "22px" }}>
            Choosing a bootcamp, a certification or a master&rsquo;s programme is a
            real financial and career decision, and most of the information
            available about any given programme comes from the institute
            selling it. Skillslash exists to sit on the other side of that
            gap: we research and compare programmes so someone deciding
            where to study can see curriculum, cost, duration and outcomes
            side by side, in one place, before they commit.
          </p>

          <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "36px 0 14px", color: "#1d1b28" }}>
            What we publish
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#3a3846", marginBottom: "22px" }}>
            Course and bootcamp comparisons, certification guides, and career
            roadmaps for people moving into data science, artificial
            intelligence, cloud, DSA and software development. Every
            article is organized under one of five sections - <a href="/articles">Articles</a>,{" "}
            <a href="/course-guides">Course Guides</a>, <a href="/comparisons">Comparisons</a>,{" "}
            <a href="/career-advice">Career Advice</a> and <a href="/resources">Resources</a> - so
            it's clear what kind of content you're reading before you start.
          </p>

          <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "36px 0 14px", color: "#1d1b28" }}>
            How we work
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#3a3846", marginBottom: "22px" }}>
            Skillslash is a content publisher, not the training provider
            being reviewed in any given article. Articles compare multiple
            institutes and programmes on curriculum, fees and outcomes;
            where a listing is sponsored or affiliate linked, that is
            disclosed on the page it appears on. Course fees, syllabi and
            certification requirements change often, so articles are
            revised as that information changes rather than left to go
            stale - the &ldquo;last updated&rdquo; date on any article reflects that.
          </p>

          <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "36px 0 14px", color: "#1d1b28" }}>
            Get in touch
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#3a3846" }}>
            For corrections, partnership questions or anything else, reach
            us through any of the social profiles linked in the footer
            below.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
