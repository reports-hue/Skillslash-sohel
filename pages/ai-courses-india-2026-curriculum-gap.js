import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LuGraduationCap } from "react-icons/lu";
import Navbar from "../components/Navbar/Navbar";
import { Newsletter } from "../components/Blog/Sidebar/Sidebar";
import Toc from "../components/Blog/PostView/Toc";
import { SITE_URL } from "../lib/siteConstants";
import contentHtml from "../Data/blog/ai-courses-india-curriculum-gap";
import styles from "../components/Blog/PostView/PostView.module.css";

const Footer = dynamic(() => import("../components/Footer/Footer"));

const TITLE = "AI Courses in India 2026: Why Two Programmes Cost the Same and Teach Different Decades";
const META_DESCRIPTION =
  "Nine Indian AI courses compared on published curricula, not marketing. Five are light on LLMOps, the layer that separates a demo from a production system.";
const EXCERPT =
  "A ₹1.5 lakh course and another ₹1.5 lakh course can differ by an entire technology generation. The module list is the only place that shows it.";
const SLUG = "ai-courses-india-2026-curriculum-gap";
const URL = `${SITE_URL}/${SLUG}`;
const PUBLISHED_AT = "2026-09-10";
const READ_MINUTES = 7;
const CATEGORY = { slug: "artificial-intelligence", name: "Artificial Intelligence", accent: "#b5468a" };

// Same convention as lib/extractHeadings.js (used for CMS posts): the
// sidebar Table of Contents is built from h2 sections only.
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
  {
    q: "Which AI course in India is best in 2026?",
    a: "It depends on the starting point. Working professionals who want agentic AI, production RAG and LLMOps in one live programme match best to Learnbay's GenAI and Agentic AI Master Program. Learners who want an IIT credential cheaply should look at IIT Roorkee's E&ICT certification. Anyone who needs an internationally portable degree should consider upGrad's MS with LJMU and IIIT-B. For a first look at the field, Coursera or PW Skills costs little.",
  },
  {
    q: "Which AI skills carry the highest premium?",
    a: "Agent development, retrieval systems and production operations. Those skills map to the GenAI Engineer and AI Agent Developer bands at the top of the salary chart, and they are exactly the topics most syllabi cover lightly.",
  },
  {
    q: "How much should an AI course in India cost?",
    a: "Live, mentor-led programmes with career support sit between ₹99,000 and ₹2,75,000. Below ₹60,000 buys content rather than accountability. Above ₹5,00,000 buys an accredited degree, which is a different product with a different purpose.",
  },
  {
    q: "Do AI courses in India guarantee placement?",
    a: "No. Every programme compared here uses assistance wording. Prospective learners should ask which companies hired recent graduates, into which roles, and get the refund terms in writing before paying.",
  },
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

export default function AiCoursesIndiaCurriculumGap() {
  const headings = getH2Headings(contentHtml);

  return (
    <div className={styles.page}>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={URL} />
        <meta name="keywords" content="AI courses in India" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
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
                  <time dateTime={PUBLISHED_AT}>September 10, 2026</time>
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
              9 months &middot; 300+ live hours &middot; IBM, Microsoft, IIT Patna certified &middot; INR 1,59,000 + GST
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

          <div className={styles.sidebarNewsletter}>
            <Newsletter />
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
