import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  LuSparkles, LuBookOpen, LuCompass, LuUsers, LuFileText,
  LuTrendingUp, LuGraduationCap, LuSearch, LuArrowRight, LuHeart,
} from "react-icons/lu"
import categories from "../../../Data/blog/categories"
import styles from "./Hero.module.css"

const features = [
  { Icon: LuBookOpen, label: "Expert Insights" },
  { Icon: LuCompass, label: "Course Comparisons" },
  { Icon: LuUsers, label: "Career Guidance" },
  { Icon: LuFileText, label: "Real Student Stories" },
]

// These are marketing copy, not verified metrics - kept as round, clearly
// aspirational figures rather than presented as audited statistics.
const stats = [
  { value: "10K+", label: "Learners Monthly" },
  { value: "500+", label: "In-depth Articles" },
  { value: "50+", label: "Courses Covered" },
  { value: "1M+", label: "Career Decisions Supported" },
]

const floatingCards = [
  { Icon: LuTrendingUp, title: "Trending Careers", subtitle: "Explore what's next" },
  { Icon: LuGraduationCap, title: "Course Comparisons", subtitle: "Find your best fit" },
  { Icon: LuFileText, title: "Real Student Stories", subtitle: "Learn from real journeys" },
]

// Illustrated stand-in for a hero photograph, built from real page content
// (not a stock photo - see Hero.module.css for the composition notes): a
// person at a desk with a browser-mock "article" card, a stack of labelled
// books, a plant and a mug, echoing the floating info cards beside it.
const Scene = () => (
  <svg className={styles.scene} viewBox="0 0 520 480" aria-hidden="true">
    <defs>
      <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#efeafd" />
        <stop offset="1" stopColor="#f7f3ff" />
      </linearGradient>
    </defs>
    <circle cx="260" cy="240" r="220" fill="url(#heroBg)" />

    {/* stacked, labelled books - top left, clear of everything else */}
    <g transform="translate(30 30)">
      <rect x="0" y="52" width="150" height="24" rx="5" fill="#8fd6bd" />
      <text x="14" y="68" fontSize="12" fontWeight="700" fill="#134634">Global Careers</text>
      <rect x="8" y="26" width="134" height="24" rx="5" fill="#b7a6f2" />
      <text x="22" y="42" fontSize="12" fontWeight="700" fill="#2e2159">Better Opportunities</text>
      <rect x="16" y="0" width="118" height="24" rx="5" fill="#9fd1f2" />
      <text x="30" y="16" fontSize="12" fontWeight="700" fill="#173a52">New Skills</text>
    </g>

    {/* browser card - top right */}
    <g transform="translate(210 20)">
      <rect width="290" height="180" rx="14" fill="#fff" stroke="#e4dffa" strokeWidth="2" />
      <circle cx="20" cy="20" r="4" fill="#e6a4a4" />
      <circle cx="34" cy="20" r="4" fill="#e6d19f" />
      <circle cx="48" cy="20" r="4" fill="#a3d4b3" />
      <rect x="16" y="38" width="258" height="80" rx="8" fill="#eee8fd" />
      <text x="16" y="136" fontSize="11" fontWeight="700" fill="#4f419a">CAREER GUIDE</text>
      <text x="16" y="157" fontSize="15" fontWeight="800" fill="#171330">Top 10 High-Demand</text>
      <text x="16" y="176" fontSize="15" fontWeight="800" fill="#171330">Tech Skills in 2026</text>
    </g>

    {/* desk + laptop - centered lower half, clear of the books and card above it */}
    <g transform="translate(110 260)">
      <rect x="-20" y="140" width="330" height="16" rx="8" fill="#241f3d" opacity="0.08" />
      <rect x="0" y="0" width="290" height="152" rx="12" fill="#241f3d" />
      <rect x="10" y="10" width="270" height="122" rx="6" fill="#f3f0ff" />
      <rect x="-16" y="152" width="322" height="13" rx="6" fill="#312a52" />
      <text x="26" y="66" fontSize="15" fontWeight="700" fill="#4f419a">Better Skills</text>
      <text x="26" y="88" fontSize="15" fontWeight="700" fill="#241f3d">Brighter You</text>
    </g>

    {/* mug - bottom right, clear of the laptop */}
    <g transform="translate(430 380)">
      <rect x="0" y="0" width="50" height="46" rx="7" fill="#fff" stroke="#e4dffa" strokeWidth="2" />
      <path d="M50 9 C 66 9 66 35 50 35" fill="none" stroke="#e4dffa" strokeWidth="3" />
      <text x="9" y="20" fontSize="8" fontWeight="700" fill="#4f419a">Good</text>
      <text x="9" y="30" fontSize="8" fontWeight="700" fill="#4f419a">Learners</text>
    </g>

    {/* plant - bottom left, clear of the laptop and books */}
    <g transform="translate(40 400)">
      <rect x="6" y="30" width="38" height="34" rx="6" fill="#e2ddf5" />
      <path d="M25 30 C 8 16 6 -4 22 -12 C 26 6 22 22 25 30 Z" fill="#5fb39e" />
      <path d="M25 30 C 42 22 46 2 34 -8 C 30 8 28 20 25 30 Z" fill="#6fc2ad" />
    </g>

    {/* handwritten annotation pointing at the browser card */}
    <g transform="translate(178 60)" fill="none" stroke="#4f419a" strokeWidth="2.5" strokeLinecap="round">
      <path d="M28 -20 C 4 -14, -8 4, 2 24" />
      <path d="M-6 14 L2 24 L14 18" />
    </g>
  </svg>
)

const Hero = ({ hasPhoto = false }) => {
  const router = useRouter()
  const [term, setTerm] = useState("")

  const submit = (event) => {
    event.preventDefault()
    const next = term.trim()
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search")
  }

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <LuSparkles aria-hidden="true" />
            <span className={styles.eyebrowStrong}>The Skillslash Blog</span>
            <span className={styles.eyebrowDivider} aria-hidden="true" />
            <span>Learn. Compare. Grow.</span>
          </p>

          <h1 className={styles.title}>
            Learn Today.
            <br />
            Build a <span>Brighter</span> Tomorrow.
          </h1>

          <p className={styles.lede}>
            In-depth guides, course comparisons, career advice and real stories
            to help you choose the right programs, certifications and
            master&rsquo;s degrees for your tech career.
          </p>

          <form className={styles.searchBar} onSubmit={submit} role="search">
            <LuSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search for courses, careers, skills or universities..."
              aria-label="Search for courses, careers, skills or universities"
            />
            <button type="submit" className={styles.searchBtn}>
              Search
              <LuArrowRight aria-hidden="true" />
            </button>
          </form>

          <div className={styles.topics}>
            <span className={styles.topicsLabel}>Popular Topics:</span>
            {categories.slice(0, 5).map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className={styles.topicPill}>
                {category.name}
              </Link>
            ))}
          </div>

          <ul className={styles.features}>
            {features.map(({ Icon, label }) => (
              <li key={label}>
                <Icon aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.visual}>
          {hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/hero.jpg" alt="" className={styles.photo} />
          ) : (
            <Scene />
          )}

          <div className={styles.floatingStack}>
            {floatingCards.map(({ Icon, title, subtitle }) => (
              <div key={title} className={styles.floatingCard}>
                <span className={styles.floatingIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                </span>
                <LuArrowRight className={styles.floatingArrow} aria-hidden="true" />
              </div>
            ))}
          </div>

          <div className={styles.trustBadge}>
            <div className={styles.avatarStack} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <span>
              <LuHeart aria-hidden="true" className={styles.trustHeart} />
              Trusted by learners globally
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
