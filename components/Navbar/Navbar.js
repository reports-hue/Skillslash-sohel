import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { LuSearch, LuMailPlus, LuMenu, LuX } from "react-icons/lu"
import styles from "./Navbar.module.css"

// Each tab is a content-type filter on the homepage (pages/index.js reads
// ?type=<slug> from the URL and pre-selects that TypeTabs tab), matched to
// the closest existing type in Data/blog/types.js - not a made-up route, so
// none of these are dead links.
const TABS = [
  { label: "Blog", type: "all" },
  { label: "Course Guides", type: "programs" },
  { label: "Comparisons", type: "course-comparison" },
  { label: "Career Advice", type: "career" },
  { label: "Student Stories", type: "stories" },
  { label: "Resources", type: "certifications" },
]

// Legacy course-page props (redirectDs, ads, event, ...) are still passed by a
// number of pages. They are accepted and ignored so those pages keep rendering.
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [term, setTerm] = useState("")
  const router = useRouter()
  const { asPath, pathname, query } = router

  useEffect(() => {
    setMenuOpen(false)
  }, [asPath])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Only the homepage's own tabs can ever be "active" - every other page
  // (course pages, category pages, the blog post page itself) correctly
  // shows no active tab rather than a misleading one.
  const activeType = pathname === "/" ? (typeof query.type === "string" ? query.type : "all") : null

  const submit = (event) => {
    event.preventDefault()
    const next = term.trim()
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search")
  }

  const tabHref = (type) => (type === "all" ? "/" : `/?type=${type}`)

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
              href={tabHref(tab.type)}
              className={activeType === tab.type ? styles.tabActive : styles.tab}
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
          {menuOpen ? <LuX size={18} /> : <LuMenu size={18} />}
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
            href={tabHref(tab.type)}
            className={activeType === tab.type ? styles.drawerLinkActive : styles.drawerLink}
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
