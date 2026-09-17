// Site-level FAQ for the landing page - answer-engine/AI-overview content
// (AEO/GEO): direct answers to the questions someone actually has before
// trusting a comparison site, paired with FAQPage schema so the same
// Q&A can surface as a rich result or a direct AI answer. Real, accurate
// answers only - see pages/blog/[slug].js for the identical <details>/
// <summary> + FAQPage pattern used on individual articles.
import styles from "./HomeFaq.module.css"

const FAQS = [
  {
    question: "What is Skillslash?",
    answer:
      "Skillslash is an independent content publisher covering tech education - course comparisons, certification guides and career advice for data science, AI, DSA, cloud and software development.",
  },
  {
    question: "Does Skillslash sell courses directly?",
    answer:
      "No. Skillslash publishes comparisons and guides about training providers and programmes; it is not itself the training provider being reviewed in any given article.",
  },
  {
    question: "Are Skillslash's course comparisons independent?",
    answer:
      "Articles compare multiple institutes and programmes on curriculum, fees and outcomes. Where a listing is sponsored or affiliate linked, that is disclosed on the page it appears on.",
  },
  {
    question: "How often is content updated?",
    answer:
      "Course fees, syllabi and certification requirements change often, so articles are revised as that information changes rather than left to go stale - check the \"last updated\" date on any article.",
  },
  {
    question: "How do I find articles on a specific topic?",
    answer:
      "Use the search bar in the navigation, or browse by section: Articles for everything, or Course Guides, Comparisons, Career Advice and Resources for a specific kind of content.",
  },
]

const HomeFaq = () => (
  <section className={styles.faqs} aria-label="Frequently asked questions">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      }}
    />
    {FAQS.map((f, i) => (
      <details key={i} className={styles.faqItem}>
        <summary>{f.question}</summary>
        <p>{f.answer}</p>
      </details>
    ))}
  </section>
)

export default HomeFaq
