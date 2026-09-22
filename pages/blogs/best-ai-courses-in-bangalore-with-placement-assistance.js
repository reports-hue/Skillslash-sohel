import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LuGraduationCap, LuList } from "react-icons/lu";
import Navbar from "../../components/Navbar/Navbar";
import { Newsletter } from "../../components/Blog/Sidebar/Sidebar";
import Toc from "../../components/Blog/PostView/Toc";
import { SITE_URL } from "../../lib/siteConstants";
import contentHtml from "../../Data/blog/best-ai-courses-in-bangalore";
import styles from "../../components/Blog/PostView/PostView.module.css";

const Footer = dynamic(() => import("../../components/Footer/Footer"));

const TITLE = "Best AI Courses in Bangalore (2026): A Side-by-Side Comparison";
const META_TITLE = "Best AI Courses in Bangalore (2026): Compared Side by Side";
const META_DESCRIPTION =
  "We compared the syllabus, fees and reviews of 10 AI courses in Bangalore for 2026. See which teach RAG, agents, MCP, LLMOps and system design before you pay.";
const EXCERPT =
  "We read the published syllabus of 10 AI courses in Bangalore, module by module, and checked what learners actually said on Trustpilot, Shiksha and Course Report - so you don't have to take the brochure's word for it.";
const SLUG = "best-ai-courses-in-bangalore-with-placement-assistance";
const URL = `${SITE_URL}/blogs/${SLUG}`;
const PUBLISHED_AT = "2026-09-09";
const READ_MINUTES = 20;
const CATEGORY = { slug: "artificial-intelligence", name: "Artificial Intelligence", accent: "#b5468a" };

// Same convention as lib/extractHeadings.js (used for CMS posts): only h2
// sections go into the sidebar Table of Contents, not every h3 subsection -
// with 9 course reviews and 12 FAQs each as an h3, a full-depth TOC would be
// unusably long. The ids read off the content are the same ones already
// baked into the HTML string (Data/blog/best-ai-courses-in-bangalore.js),
// so no separate id-generation logic needs to stay in sync with it.
function getH2Headings(html) {
  const headings = [];
  const re = /<h2 id="([^"]+)">(.*?)<\/h2>/g;
  let m;
  while ((m = re.exec(html))) {
    headings.push({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") });
  }
  return headings;
}

const faqs = [
  { q: "Which is the best AI course in Bangalore in 2026?", a: "There is no single best course for everyone. For a working professional who wants Generative AI, Agentic AI and production operations in one track with classroom access, the Learnbay GenAI and Agentic AI Master Program fits best. For research-grade depth on agents, IISc Bangalore leads. For agent tooling at a lower fee, AnalytixLabs goes deepest per rupee. Match the syllabus to your target role rather than to the brand name." },
  { q: "Which AI course in Bangalore is best for software engineers and SDEs?", a: "Most AI courses are built for analysts and assume you want to become a data scientist. Software engineers need agent engineering plus backend and system design. The Learnbay SDE Master Program in GenAI and Agentic AI is the only program in this comparison that combines Generative AI, Agentic AI, LLMOps, Data Structures and Algorithms and System Design in one 7 to 8 month track, with electives in backend engineering for RAG microservices, distributed systems, and cloud and LLM infrastructure. It asks for 1+ years of industry experience." },
  { q: "What is the fee for an AI course in Bangalore?", a: "Fees in 2026 range from about INR 20,000 for a short offline deep learning course to INR 3,99,000 for a 12 to 15 month program. Learnbay's Master Programs are INR 1,59,000 plus 18% GST, with a 5-month software developer track at INR 1,20,000 plus GST. IIIT Bangalore with upGrad is INR 1,40,000 inclusive of taxes. Two providers, Simplilearn and Great Learning, publish only USD prices, and Intellipaat does not publish its technical program fee at all." },
  { q: "Do AI courses in Bangalore teach MLOps and LLMOps?", a: "Most do not. Six of the ten programs compared here teach no production operations at all, and only four run a named LLMOps module. Learnbay runs LLMOps and Production Deployment as a graded month-long module across every track, and its AI Engineering Master Program adds AI System Architecture and Platform Engineering as a separate 1.5-month module covering vector databases, MLOps and CI/CD for AI. Hence, ask which module teaches you to monitor a deployed LLM application and control its cost." },
  { q: "Do AI courses in Bangalore guarantee placement?", a: "No. Every program compared here uses the words placement assistance, career support, or career accelerator. None guarantees a job. Reviewers on Shiksha and Trustpilot report gaps between what was promised at enrolment and what was delivered across nine of the eleven providers checked. Ask for the refund and placement terms in writing before paying." },
  { q: "Which AI skills should a 2026 syllabus cover?", a: "Look for RAG, fine-tuning with LoRA or PEFT, agent frameworks and multi-agent orchestration, vector databases, Model Context Protocol, evaluation and guardrails, and LLMOps or MLOps for deployment and monitoring. CIEL HR recorded 260% demand growth for agentic AI engineers and 82.2% for MLOps engineers between March 2024 and May 2026. A syllabus that stops at CNN and LSTM is teaching a 2021 stack." },
  { q: "Can I learn AI in Bangalore without a coding background?", a: "It depends on the program. Great Learning, DataMites and AnalytixLabs state that no prior programming is required. Learnbay's Master Programs ask for 1+ years of experience, and the program covers beginner-friendly foundation modules for those coming from non-IT domains, including Python, machine learning and deep learning. IISc with TalentSprint and Scaler's advanced track both require existing programming knowledge." },
  { q: "Is an offline AI course in Bangalore better than online?", a: "It depends on your history. If you have started self-paced courses before and not finished them, a classroom adds accountability that recorded video does not. Only four options in this comparison have real Bangalore presence: Learnbay with hybrid classroom project sessions at HSR Layout, DataMites at BTM Layout, Marathahalli and Kudlu Gate, IISc for four campus days, and 360DigiTMG at Yelahanka. Great Learning has discontinued its Bangalore classroom." },
  { q: "How long does it take to become job ready in AI?", a: "Programs in this list run from 3.5 months to 15 months. Most working professionals need 6 to 12 months to cover Python, GenAI, agents and production deployment while holding a full-time job. Anyone eager to switch roles should budget an extra 2 months after the course to ship and deploy three portfolio projects, because 40% of Indian employers now prioritise demonstrable skills over degrees, per Indeed's 2026 tracker." },
  { q: "Are AI certifications worth it in Bangalore in 2026?", a: "A certificate alone does not get interviews. What gets interviews is a deployed system you can walk a panel through. Certifications from Microsoft, IBM, IISc or a university help at the resume screening stage, especially for career switchers with no AI on their CV. Hence, treat certification as a filter you pass, not a result you buy." },
  { q: "Which AI roles are hiring most in Bangalore right now?", a: "Agentic AI engineer demand grew 260% between March 2024 and May 2026, followed by GenAI solutions architects and AI product owners at 120% each, LLM engineers at 86.5% and MLOps engineers at 82.2%, per CIEL HR. Within Bengaluru, GCCs are the largest employer group, with 64% of new GCC roles requiring AI, data or automation skills." },
  { q: "What salary can I expect after an AI course in Bangalore?", a: "Entry-level AI roles in India pay INR 8.87 to 15.41 LPA and senior roles in Bengaluru reach INR 61.70 to 91.25 LPA, per foundit data from September 2026. At 3 to 5 years of experience, AI roles pay around INR 12 LPA against INR 9 LPA in traditional IT. Your actual offer depends on your existing experience, your domain, and what you can demonstrate in the interview." },
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": `${URL}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": URL },
      headline: TITLE,
      description: META_DESCRIPTION,
      url: URL,
      datePublished: PUBLISHED_AT,
      dateModified: PUBLISHED_AT,
      inLanguage: "en",
      isAccessibleForFree: true,
      timeRequired: `PT${READ_MINUTES}M`,
      articleSection: CATEGORY.name,
      author: { "@type": "Organization", name: "Skillslash", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Skillslash",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: CATEGORY.name, item: `${SITE_URL}/category/${CATEGORY.slug}` },
        { "@type": "ListItem", position: 3, name: TITLE, item: URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function BestAiCoursesInBangalore() {
  const headings = getH2Headings(contentHtml);

  return (
    <div className={styles.page}>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={URL} />
        <meta name="keywords" content="best AI courses in Bangalore" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={`${SITE_URL}/covers/_default.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="article:published_time" content={PUBLISHED_AT} />
        <meta property="article:modified_time" content={PUBLISHED_AT} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </Head>

      <Navbar />

      <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/">Blog</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href={`/category/${CATEGORY.slug}`}>{CATEGORY.name}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{TITLE}</span>
        </div>
      </nav>

      <header className={styles.header}>
        <div>
          <Link
            href={`/category/${CATEGORY.slug}`}
            className={styles.categoryPill}
            style={{ "--accent": CATEGORY.accent }}
          >
            {CATEGORY.name}
          </Link>
          <h1 className={styles.title}>{TITLE}</h1>
          <p className={styles.excerpt}>{EXCERPT}</p>

          <div className={styles.byline}>
            <div className={styles.bylineLeft}>
              <div className={styles.bylineAvatarFallback}>S</div>
              <div className={styles.bylineText}>
                <div className={styles.bylineName}>By Skillslash</div>
                <div className={styles.bylineMeta}>
                  <time dateTime={PUBLISHED_AT}>September 9, 2026</time>
                  <span className={styles.dot}>&middot;</span>
                  <span>{READ_MINUTES} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/covers/_default.svg"
            alt={TITLE}
            width={1200}
            height={675}
            loading="eager"
            className={styles.heroImage}
          />
        </div>
      </header>

      <div className={styles.layout}>
        <main className={styles.main}>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </main>

        <aside className={styles.sidebar}>
          <Toc headings={headings} />

          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon} aria-hidden="true">
              <LuGraduationCap size={18} />
            </div>
            <p className={styles.ctaTitle}>GenAI &amp; Agentic AI Master Program</p>
            <p className={styles.ctaText}>
              9 months &middot; 300+ live hours &middot; Microsoft, IBM and IIT Patna certified &middot; INR 1,59,000 + GST
            </p>
            <a
              href="https://www.learnbay.co/genai-and-agentic-ai-master-program"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Explore the program &rarr;
            </a>
          </div>

          <div className={styles.sidebarCard}>
            <p className={styles.sidebarCardTitle}>
              <LuList aria-hidden="true" /> Editor&rsquo;s Picks
            </p>
            <div className={styles.relatedList}>
              <div>
                <p className={styles.relatedItemTitle}>Courses &middot; Best AI courses in India, compared</p>
              </div>
              <div>
                <p className={styles.relatedItemTitle}>GenAI &middot; Agentic AI: frameworks, use cases and ethics</p>
              </div>
              <div>
                <p className={styles.relatedItemTitle}>Careers &middot; Big tech skills to survive layoffs in 2026</p>
              </div>
            </div>
          </div>

          <div className={styles.sidebarNewsletter}>
            <Newsletter />
          </div>
        </aside>
      </div>

      <Footer />

      {/* M8: mobile-only sticky CTA bar */}
      <div className={styles.mobileStickyBar}>
        <a href="https://www.learnbay.co/contact" target="_blank" rel="noopener noreferrer">
          Talk to an expert
        </a>
        <a
          href="https://www.learnbay.co/genai-and-agentic-ai-master-program"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileStickyPrimary}
        >
          Apply now
        </a>
      </div>
    </div>
  );
}
