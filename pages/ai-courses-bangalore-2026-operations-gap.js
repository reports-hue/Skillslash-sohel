import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LuGraduationCap } from "react-icons/lu";
import Navbar from "../components/Navbar/Navbar";
import { Newsletter } from "../components/Blog/Sidebar/Sidebar";
import Toc from "../components/Blog/PostView/Toc";
import { SITE_URL } from "../lib/siteConstants";
import contentHtml from "../Data/blog/ai-courses-bangalore-operations-gap";
import styles from "../components/Blog/PostView/PostView.module.css";

const Footer = dynamic(() => import("../components/Footer/Footer"));

const TITLE = "AI Courses in Bangalore 2026: The Operations Gap That Decides Who Gets Hired";
const META_DESCRIPTION =
  "Bengaluru holds 25.4% of India's AI jobs, yet six of nine AI courses sold there teach no MLOps or LLMOps. A syllabus-level comparison of the 2026 market.";
const EXCERPT =
  "Bengaluru holds a quarter of India's AI jobs. Most courses sold into that market still stop where the hiring actually starts.";
const SLUG = "ai-courses-bangalore-2026-operations-gap";
const URL = `${SITE_URL}/${SLUG}`;
const PUBLISHED_AT = "2026-09-08";
const READ_MINUTES = 8;
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
    q: "Which AI course in Bangalore is best in 2026?",
    a: "It depends on the profile. Working professionals who want Generative AI, Agentic AI and production operations in one track with classroom access are best served by Learnbay's GenAI and Agentic AI Master Program. Engineers who already know machine learning and want research-grade depth on agents should look at IISc Bangalore. Those on a budget under INR 1 lakh get the most agent tooling from AnalytixLabs.",
  },
  {
    q: "Do AI courses in Bangalore teach MLOps and LLMOps?",
    a: "Most do not. Six of the nine programs compared teach no production operations at all, and only three run a named LLMOps module like Learnbay and upGrad. Given that MLOps engineer demand grew 82.2% between 2024 and 2026, this is the most expensive gap a syllabus can carry.",
  },
  {
    q: "What salary follows an AI course in Bangalore?",
    a: "Entry-level AI roles in India pay INR 8.87 to 15.41 LPA, and senior roles in Bengaluru reach INR 61.70 to 91.25 LPA, per foundit data from September 2026. 1 Finance Research puts the AI premium over traditional IT at 33% at 3 to 5 years of experience and 38% beyond 10 years.",
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

export default function AiCoursesBangaloreOperationsGap() {
  const headings = getH2Headings(contentHtml);

  return (
    <div className={styles.page}>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={URL} />
        <meta name="keywords" content="AI courses in Bangalore" />

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
                  <time dateTime={PUBLISHED_AT}>September 8, 2026</time>
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
              9 months &middot; 300+ live hours &middot; Learnbay + IBM certified &middot; INR 1,59,000 + GST
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
