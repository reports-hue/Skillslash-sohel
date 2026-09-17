// Shared shell for the three legal pages (Terms of Use, Privacy Policy,
// Refund Policy) - previously each rendered raw, unconstrained prose (no
// reading-width cap, browser-default heading sizes, no Footer on the
// privacy page at all) with none of the rest of the site's visual
// language. This gives all three the same Navbar + header + a proper
// reading column + Footer, matching the pattern pages/about.js and the
// category/type listing pages already use (styles/blog.module.css's
// shell/categoryHeader/kicker classes).
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import blogStyles from "../../styles/blog.module.css"
import styles from "./LegalPageLayout.module.css"

export default function LegalPageLayout({ kicker, title, description, updated, children }) {
  return (
    <div className={blogStyles.page}>
      <Navbar />

      <section className={blogStyles.categoryHeader}>
        <div className={blogStyles.shell}>
          <p className={blogStyles.kicker}>{kicker}</p>
          <h1 className={blogStyles.categoryTitle}>{title}</h1>
          {description && <p className={blogStyles.categoryDesc}>{description}</p>}
          {updated && <p className={styles.updated}>Last updated {updated}</p>}
        </div>
      </section>

      <main className={blogStyles.section}>
        <div className={blogStyles.shell}>
          <div className={styles.body}>{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
