import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaMeta, FaXTwitter } from "react-icons/fa6"
import categories from "../../Data/blog/categories"
import posts from "../../Data/blog/posts"
import styles from "./Footer.module.css"

// Same manual-rank convention pages/index.js uses for its own "Popular"
// rail: lower `popular` = higher priority, 1 is the top pick. Reusing it
// here means the footer surfaces the same cornerstone articles every page
// on the site is a click away from - dense internal linking to a small set
// of authoritative pages is one of the highest-leverage, lowest-effort SEO
// (and GEO - it's exactly the kind of well-interlinked structure a
// generative engine's crawler favors when deciding what to cite) moves a
// footer can make, which a generic "Home / Careers / Verify" column wasn't.
const popularGuides = posts
  .filter((post) => typeof post.popular === "number")
  .sort((a, b) => a.popular - b.popular)
  .slice(0, 4)

const socials = [
  {
    href: "https://www.facebook.com/SkillSlash-100623872122442",
    label: "Skillslash on Facebook",
    Icon: FaMeta,
  },
  {
    href: "https://www.instagram.com/skillslash_Academy/",
    label: "Skillslash on Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.youtube.com/c/Skillslash",
    label: "Skillslash on YouTube",
    Icon: FaYoutube,
  },
  {
    href: "https://twitter.com/skillslash",
    label: "Skillslash on X",
    Icon: FaXTwitter,
  },
  {
    href: "https://www.linkedin.com/company/skillslash",
    label: "Skillslash on LinkedIn",
    Icon: FaLinkedinIn,
  },
]

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo} aria-label="Skillslash home">
            <Image
              src="/favicon.jpg"
              alt="Skillslash"
              quality={100}
              width={44}
              height={44}
              style={{ objectFit: "contain" }}
              loading="lazy"
            />
          </Link>
          <p className={styles.desc}>
            A publication about learning in tech. We compare courses, institutes
            and degree programmes so you can choose where to study with a clear
            view of what you are getting.
          </p>
          <div className={styles.socials}>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={styles.social}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <nav className={styles.col} aria-label="Topics">
          <h2 className={styles.colTitle}>Topics</h2>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={styles.link}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <nav className={styles.col} aria-label="Popular guides">
          <h2 className={styles.colTitle}>Popular Guides</h2>
          {popularGuides.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
          ))}
        </nav>

        <nav className={styles.col} aria-label="Legal">
          <h2 className={styles.colTitle}>Legal</h2>
          <Link href="/terms-of-use" className={styles.link}>
            Terms of Use
          </Link>
          <Link href="/privacy-statement" className={styles.link}>
            Privacy Policy
          </Link>
          <Link href="/refunds-cancellation" className={styles.link}>
            Refund Policy
          </Link>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.rights}>
          © 2019–2026 Skillslash. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
