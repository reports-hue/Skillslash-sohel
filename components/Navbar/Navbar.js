import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { LuSearch, LuMailPlus } from "react-icons/lu"
import styles from "./Navbar.module.css"

// Plain inline SVG, not a react-icons component: the mobile menu toggle was
// reported (and independently reproduced) rendering at 0x0 regardless of
// explicit width/height via CSS, `!important`, or the icon library's own
// `size` prop - all of which should have worked. Writing the two paths out
// by hand removes every layer (icon library sizing logic, its default
// width="1em"/height="1em" attributes, any interaction between those and
// this button's display:none-by-default/media-query-flex toggle) that
// could have been the actual cause, rather than guessing at which one it
// was.
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
)
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

// Each tab is its own real, server-rendered, indexable page (not a "/"
// URL under a ?type= query string, which read to crawlers as the same
// homepage repeated with a query param rather than distinct content) -
// see pages/articles.js, pages/course-guides.js, pages/comparisons.js,
// pages/career-advice.js and pages/resources.js, all built on the same
// pattern pages/category/[slug].js already uses for categories. "/" is
// the landing page (pages/index.js), not the article list, so Articles
// points at its own /articles page rather than "/".
const TABS = [
  { label: "Articles", href: "/articles" },
  { label: "Course Guides", href: "/course-guides" },
  { label: "Comparisons", href: "/comparisons" },
  { label: "Career Advice", href: "/career-advice" },
  { label: "Resources", href: "/resources" },
]

// Legacy course-page props (redirectDs, ads, event, ...) are still passed by a
// number of pages. They are accepted and ignored so those pages keep rendering.
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [term, setTerm] = useState("")
  const router = useRouter()
  const { asPath, pathname } = router

  useEffect(() => {
    setMenuOpen(false)
  }, [asPath])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const submit = (event) => {
    event.preventDefault()
    const next = term.trim()
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search")
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Skillslash home">
          <Image
            src="/favicon.jpg"
            alt=""
            width={40}
            height={40}
            quality={100}
            priority
            className={styles.mark}
          />
          <span className={styles.wordmark}>
            Skill<span className={styles.wordmarkAccent}>Slash</span>
          </span>
        </Link>

        <nav className={styles.tabs} aria-label="Content types">
          {TABS.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={pathname === tab.href ? styles.tabActive : styles.tab}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <form className={styles.search} onSubmit={submit} role="search">
          <LuSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
          />
        </form>

        <Link href="/#newsletter" className={styles.subscribe}>
          Subscribe
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={menuOpen ? styles.drawer : styles.drawerHidden}>
        <form className={styles.drawerSearch} onSubmit={submit} role="search">
          <LuSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
          />
        </form>

        {TABS.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={pathname === tab.href ? styles.drawerLinkActive : styles.drawerLink}
          >
            {tab.label}
          </Link>
        ))}

        <Link href="/#newsletter" className={styles.drawerCta}>
          <LuMailPlus aria-hidden="true" />
          Subscribe
        </Link>
      </div>
    </header>
  )
}

export default Navbar
