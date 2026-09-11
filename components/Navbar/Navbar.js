import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  LuGraduationCap,
  LuMailPlus,
  LuSearch,
  LuArrowRight,
} from "react-icons/lu"
import { FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6"
import { FaBars, FaTimes } from "react-icons/fa"
import categories from "../../Data/blog/categories"
import styles from "./Navbar.module.css"

const promises = ["In-depth reviews", "Honest comparisons", "Career guidance"]

const socials = [
  {
    href: "https://www.linkedin.com/company/skillslash",
    label: "Skillslash on LinkedIn",
    Icon: FaLinkedinIn,
  },
  {
    href: "https://twitter.com/skillslash",
    label: "Skillslash on X",
    Icon: FaXTwitter,
  },
  {
    href: "https://www.youtube.com/c/Skillslash",
    label: "Skillslash on YouTube",
    Icon: FaYoutube,
  },
]

// Legacy course-page props (redirectDs, ads, event, ...) are still passed by a
// number of pages. They are accepted and ignored so those pages keep rendering.
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [term, setTerm] = useState("")
  const router = useRouter()
  const { asPath } = router

  useEffect(() => {
    setMenuOpen(false)
  }, [asPath])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const activeCategory = asPath.startsWith("/category/")
    ? asPath.replace("/category/", "").split("?")[0]
    : null

  const submit = (event) => {
    event.preventDefault()
    const next = term.trim()
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search")
  }

  return (
    <header className={styles.header}>
      <div className={styles.utility}>
        <div className={styles.utilityInner}>
          <p className={styles.tagline}>
            <LuGraduationCap className={styles.capIcon} aria-hidden="true" />
            <span className={styles.taglineLead}>
              Guiding your next step in tech education
            </span>
            <span className={styles.promises}>
              {promises.map((promise) => (
                <React.Fragment key={promise}>
                  <span className={styles.divider} aria-hidden="true" />
                  <span className={styles.promise}>{promise}</span>
                </React.Fragment>
              ))}
            </span>
          </p>

          <div className={styles.utilityRight}>
            <Link href="/#newsletter" className={styles.subscribe}>
              <LuMailPlus aria-hidden="true" />
              Subscribe to Newsletter
            </Link>
            <span className={styles.divider} aria-hidden="true" />
            <Link
              href="/search"
              className={styles.utilityIcon}
              aria-label="Search articles"
            >
              <LuSearch />
            </Link>
            <span className={styles.divider} aria-hidden="true" />
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={styles.utilityIcon}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mainBar}>
        <div className={styles.mainInner}>
          <Link href="/" className={styles.brand} aria-label="Skillslash home">
            <Image
              src="/favicon.jpg"
              alt=""
              width={44}
              height={44}
              quality={100}
              priority
              className={styles.mark}
            />
            <span className={styles.wordmark}>Skillslash</span>
          </Link>

          <nav className={styles.nav} aria-label="Categories">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={
                  activeCategory === category.slug
                    ? styles.navLinkActive
                    : styles.navLink
                }
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <form className={styles.search} onSubmit={submit} role="search">
            <LuSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search articles, programs, colleges..."
              aria-label="Search articles"
            />
          </form>

          <Link href="/search" className={styles.cta}>
            Explore Programs
            <LuArrowRight aria-hidden="true" />
          </Link>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={menuOpen ? styles.drawer : styles.drawerHidden}>
        <form className={styles.drawerSearch} onSubmit={submit} role="search">
          <LuSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search articles, programs, colleges..."
            aria-label="Search articles"
          />
        </form>

        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={styles.drawerLink}
          >
            {category.name}
          </Link>
        ))}

        <Link href="/#newsletter" className={styles.drawerLink}>
          Subscribe to Newsletter
        </Link>

        <Link href="/search" className={styles.drawerCta}>
          Explore Programs
          <LuArrowRight aria-hidden="true" />
        </Link>

        <div className={styles.drawerSocials}>
          {socials.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={styles.utilityIcon}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
