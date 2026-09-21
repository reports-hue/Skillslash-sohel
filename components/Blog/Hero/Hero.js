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

const floatingCards = [
  { Icon: LuTrendingUp, title: "Trending Careers", subtitle: "Explore what's next" },
  { Icon: LuGraduationCap, title: "Course Comparisons", subtitle: "Find your best fit" },
  { Icon: LuFileText, title: "Real Student Stories", subtitle: "Learn from real journeys" },
]

// Illustrated stand-in for a hero photograph, built from real page content
// (not a stock photo - see Hero.module.css for the composition notes): a
// person at a desk with a laptop, a browser-mock "article" card, a stack of
// labelled books, a plant and a mug, echoing the floating info cards beside
// it. Deliberately illustrated rather than a stock photo - no licensing to
// track, and it reads consistently at any crop/size.
const Scene = () => (
  <svg className={styles.scene} viewBox="0 0 520 520" aria-hidden="true">
    <defs>
      <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#efeafd" />
        <stop offset="1" stopColor="#f7f3ff" />
      </linearGradient>
      <linearGradient id="heroSweater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8f7ae8" />
        <stop offset="1" stopColor="#6b53d6" />
      </linearGradient>
    </defs>
    <circle cx="260" cy="250" r="230" fill="url(#heroBg)" />

    {/* handwritten annotation pointing up at the floating card stack */}
    <g transform="translate(150 46)">
      <text x="0" y="0" fontFamily="Georgia, serif" fontStyle="italic" fontSize="14" fill="#4f419a">Guides</text>
      <text x="0" y="18" fontFamily="Georgia, serif" fontStyle="italic" fontSize="14" fill="#4f419a">Comparisons</text>
      <text x="0" y="36" fontFamily="Georgia, serif" fontStyle="italic" fontSize="14" fill="#4f419a">+ Real Stories</text>
      <path d="M112 8 C 150 2, 168 14, 172 34" fill="none" stroke="#4f419a" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M162 26 L172 34 L166 20" fill="none" stroke="#4f419a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* stacked, labelled books - left of the person, clear of everything else */}
    <g transform="translate(24 300)">
      <rect x="0" y="52" width="150" height="24" rx="5" fill="#8fd6bd" />
      <text x="14" y="68" fontSize="12" fontWeight="700" fill="#134634">Better Skills</text>
      <rect x="8" y="26" width="150" height="24" rx="5" fill="#b7a6f2" />
      <text x="22" y="42" fontSize="12" fontWeight="700" fill="#2e2159">Better Opportunities</text>
      <rect x="16" y="0" width="126" height="24" rx="5" fill="#9fd1f2" />
      <text x="30" y="16" fontSize="12" fontWeight="700" fill="#173a52">A Brighter You</text>
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

    {/* person - seated, chin on hand, centered above the desk */}
    <g transform="translate(260 210)">
      <ellipse cx="0" cy="150" rx="86" ry="18" fill="#241f3d" opacity="0.06" />
      {/* shoulders / sweater */}
      <path d="M-92 150 C -92 78 -50 40 0 40 C 50 40 92 78 92 150 Z" fill="url(#heroSweater)" />
      {/* neck */}
      <rect x="-14" y="18" width="28" height="30" rx="10" fill="#e8b58c" />
      {/* head */}
      <circle cx="0" cy="-18" r="46" fill="#f0c49a" />
      {/* hair */}
      <path d="M-46 -14 C -52 -62 -18 -78 0 -78 C 20 -78 54 -64 46 -12 C 40 -30 30 -18 30 -4 C 22 -30 -22 -30 -30 -4 C -30 -18 -40 -30 -46 -14 Z" fill="#2c2140" />
      {/* smile + cheek */}
      <path d="M-14 -6 C -8 2 8 2 14 -6" fill="none" stroke="#7a4a30" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="-16" cy="-18" r="3" fill="#2c2140" />
      <circle cx="16" cy="-18" r="3" fill="#2c2140" />
      {/* raised arm, hand resting near chin (thinking pose) */}
      <path d="M56 60 C 78 36 70 4 44 -4 C 60 0 66 24 52 44" fill="none" stroke="url(#heroSweater)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="42" cy="-8" r="11" fill="#f0c49a" />
    </g>

    {/* desk + open laptop */}
    <g transform="translate(110 330)">
      <rect x="-20" y="150" width="330" height="16" rx="8" fill="#241f3d" opacity="0.08" />
      <rect x="0" y="0" width="290" height="152" rx="12" fill="#241f3d" />
      <rect x="10" y="10" width="270" height="122" rx="6" fill="#f3f0ff" />
      <rect x="-16" y="152" width="322" height="13" rx="6" fill="#312a52" />
      {/* SkillSlash wordmark on the laptop screen */}
      <rect x="26" y="30" width="14" height="14" rx="4" fill="#5b46d9" />
      <text x="46" y="42" fontSize="15" fontWeight="800" fill="#171330">SkillSlash</text>
      <text x="26" y="70" fontSize="13" fontWeight="700" fill="#4f419a">Learn</text>
      <text x="26" y="90" fontSize="13" fontWeight="700" fill="#4f419a">Compare</text>
      <text x="26" y="110" fontSize="13" fontWeight="700" fill="#241f3d">Grow</text>
    </g>

    {/* mug - bottom right, clear of the laptop */}
    <g transform="translate(422 420)">
      <rect x="0" y="0" width="58" height="52" rx="8" fill="#fff" stroke="#e4dffa" strokeWidth="2" />
      <path d="M58 10 C 76 10 76 40 58 40" fill="none" stroke="#e4dffa" strokeWidth="3" />
      <text x="8" y="20" fontSize="7.5" fontWeight="700" fill="#4f419a">Good</text>
      <text x="8" y="30" fontSize="7.5" fontWeight="700" fill="#4f419a">Learners</text>
      <text x="8" y="40" fontSize="7.5" fontWeight="700" fill="#4f419a">Build Great</text>
    </g>

    {/* plant - bottom left, clear of the laptop and books */}
    <g transform="translate(34 440)">
      <rect x="6" y="30" width="38" height="34" rx="6" fill="#e2ddf5" />
      <path d="M25 30 C 8 16 6 -4 22 -12 C 26 6 22 22 25 30 Z" fill="#5fb39e" />
      <path d="M25 30 C 42 22 46 2 34 -8 C 30 8 28 20 25 30 Z" fill="#6fc2ad" />
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
        </div>

        <div className={styles.visual}>
          {hasPhoto ? (
            // public/hero.jpg is the composed photo with its own floating
            // cards, handwritten annotations and trust badge baked in - the
            // synthetic <Scene/> fallback below is skipped for it so we
            // don't risk a duplicate, misaligned copy of content the image
            // already contains. The 1M+ learner badge isn't baked into the
            // photo, though, so it renders as a real overlay either way -
            // see below.
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/hero.jpg" alt="" className={styles.photo} />
          ) : (
            <>
              <Scene />

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
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
