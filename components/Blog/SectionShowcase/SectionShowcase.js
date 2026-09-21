// Landing-page entry points into the site's real content sections
// (pages/articles.js, pages/course-guides.js, pages/comparisons.js,
// pages/career-advice.js, pages/resources.js) - the homepage's job is to
// route a visitor to the right one of these, not to be the article feed
// itself (see pages/index.js).
import Link from "next/link"
import { LuNewspaper, LuGraduationCap, LuScale, LuCompass, LuAward, LuArrowRight } from "react-icons/lu"
import styles from "./SectionShowcase.module.css"

const SECTIONS = [
  { href: "/articles", Icon: LuNewspaper, title: "Articles", desc: "Every guide and story we've published, newest first." },
  { href: "/course-guides", Icon: LuGraduationCap, title: "Course Guides", desc: "What a bootcamp or master's programme actually covers." },
  { href: "/comparisons", Icon: LuScale, title: "Comparisons", desc: "Course vs. course, side by side on cost and outcomes." },
  { href: "/career-advice", Icon: LuCompass, title: "Career Advice", desc: "Roadmaps and hiring realities for breaking into tech." },
  { href: "/resources", Icon: LuAward, title: "Resources", desc: "Certification guides - what each one tests and costs." },
]

const SectionShowcase = () => (
  <div className={styles.grid}>
    {SECTIONS.map(({ href, Icon, title, desc }) => (
      <Link key={href} href={href} className={styles.card}>
        <span className={styles.icon}>
          <Icon aria-hidden="true" />
        </span>
        <span className={styles.cardTitle}>{title}</span>
        <span className={styles.cardDesc}>{desc}</span>
        <span className={styles.cardLink}>
          Browse <LuArrowRight aria-hidden="true" />
        </span>
      </Link>
    ))}
  </div>
)

export default SectionShowcase
