import { LuBookOpen, LuGraduationCap, LuTrendingUp, LuStar } from "react-icons/lu"
import styles from "./Hero.module.css"

const features = [
  { Icon: LuBookOpen, label: "Expert Insights" },
  { Icon: LuGraduationCap, label: "Career Guidance" },
  { Icon: LuTrendingUp, label: "Real Stories" },
  { Icon: LuStar, label: "Tools & Resources" },
]

// Illustrated stand-in for the hero photograph: a desk scene with three
// sticky-note callouts, echoing the "New Skills / New Opportunities /
// A Brighter You" treatment. Drop a photo at public/hero.jpg and it
// replaces this scene automatically.
const Scene = () => (
  <svg className={styles.scene} viewBox="0 0 600 460" aria-hidden="true">
    <defs>
      <linearGradient id="heroDesk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#efeafd" />
        <stop offset="1" stopColor="#f7f3ff" />
      </linearGradient>
    </defs>
    <circle cx="330" cy="220" r="210" fill="url(#heroDesk)" />

    {/* laptop */}
    <g transform="translate(150 250)">
      <rect x="0" y="0" width="270" height="168" rx="12" fill="#241f3d" />
      <rect x="10" y="10" width="250" height="140" rx="6" fill="#f3f0ff" />
      <rect x="-14" y="168" width="298" height="14" rx="7" fill="#312a52" />
      <text x="24" y="70" fontSize="15" fontWeight="700" fill="#4f419a">Better Skills</text>
      <text x="24" y="92" fontSize="15" fontWeight="700" fill="#241f3d">Brighter You</text>
    </g>

    {/* plant */}
    <g transform="translate(96 320)">
      <rect x="10" y="46" width="40" height="40" rx="6" fill="#e2ddf5" />
      <path d="M30 46 C 10 30 8 6 26 -4 C 30 16 26 34 30 46 Z" fill="#5fb39e" />
      <path d="M30 46 C 50 34 56 10 42 -2 C 36 18 34 34 30 46 Z" fill="#6fc2ad" />
    </g>

    {/* sticky notes */}
    <g transform="translate(60 60) rotate(-8)">
      <rect width="118" height="94" rx="6" fill="#f6b8c4" />
      <text x="16" y="38" fontSize="17" fontWeight="700" fill="#5a2033">New</text>
      <text x="16" y="60" fontSize="17" fontWeight="700" fill="#5a2033">Skills</text>
    </g>
    <g transform="translate(380 30) rotate(6)">
      <rect width="150" height="94" rx="6" fill="#9fd1f2" />
      <text x="16" y="34" fontSize="16" fontWeight="700" fill="#173a52">New</text>
      <text x="16" y="56" fontSize="16" fontWeight="700" fill="#173a52">Opportunities</text>
    </g>
    <g transform="translate(430 140) rotate(-4)">
      <rect width="126" height="94" rx="6" fill="#f8d98a" />
      <text x="16" y="34" fontSize="16" fontWeight="700" fill="#5a4413">A Brighter</text>
      <text x="16" y="56" fontSize="16" fontWeight="700" fill="#5a4413">You</text>
    </g>

    {/* handwritten annotation */}
    <g transform="translate(440 250)" fill="none" stroke="#4f419a" strokeWidth="2.5" strokeLinecap="round">
      <path d="M0 0 C 20 20, -4 34, 14 48" />
      <path d="M6 40 L14 48 L22 38" />
    </g>
  </svg>
)

const Hero = ({ hasPhoto = false }) => (
  <section className={styles.hero}>
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.kicker}>The Skillslash Blog</p>
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
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/hero.jpg" alt="" className={styles.photo} />
        ) : (
          <Scene />
        )}
      </div>
    </div>
  </section>
)

export default Hero
