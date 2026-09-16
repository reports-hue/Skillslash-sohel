import { useMemo, useState } from "react";
import { LuChevronDown, LuCheckCircle, LuCircle, LuXCircle } from "react-icons/lu";
import { analyzePost } from "../../../lib/seoAnalyzer";
import styles from "./SeoScorePanel.module.css";

const CATEGORY_META = {
  seo: { label: "SEO", full: "Search Engine Optimization" },
  aeo: { label: "AEO", full: "Answer Engine Optimization" },
  geo: { label: "GEO", full: "Generative Engine Optimization" },
  deo: { label: "DEO", full: "Discovery Engine Optimization" },
  aio: { label: "AIO", full: "AI Overviews" },
};

function scoreTone(score) {
  if (score >= 80) return "good";
  if (score >= 50) return "warn";
  return "bad";
}

function StatusIcon({ status }) {
  if (status === "good") return <LuCheckCircle className={styles.iconGood} />;
  if (status === "warn") return <LuCircle className={styles.iconWarn} />;
  return <LuXCircle className={styles.iconBad} />;
}

function CategoryRow({ category, meta, open, onToggle }) {
  const tone = scoreTone(category.score);
  return (
    <div className={styles.category}>
      <button type="button" className={styles.categoryHead} onClick={onToggle}>
        <span className={styles.categoryLabel}>
          <strong>{meta.label}</strong>
          <span className={styles.categoryFull}>{meta.full}</span>
        </span>
        <span className={`${styles.scorePill} ${styles[tone]}`}>{category.score}</span>
        <LuChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} />
      </button>
      {open && (
        <ul className={styles.checkList}>
          {category.checks.map((c) => (
            <li key={c.id} className={styles.checkItem}>
              <StatusIcon status={c.status} />
              <div>
                <div className={styles.checkLabel}>{c.label}</div>
                <div className={styles.checkHint}>{c.hint}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SeoScorePanel({ post }) {
  const [openCategory, setOpenCategory] = useState("seo");
  const analysis = useMemo(() => analyzePost(post), [post]);
  const tone = scoreTone(analysis.overall);
  const toneLabel = tone === "good" ? "Strong" : tone === "warn" ? "Needs work" : "Weak";

  return (
    <div className={styles.panel}>
      <div className={styles.overallRow}>
        <div className={`${styles.overallScore} ${styles[tone]}`}>{analysis.overall}</div>
        <div>
          <div className={styles.overallLabel}>{toneLabel} across SEO, AEO, GEO, DEO &amp; AIO</div>
          <div className={styles.overallHint}>
            Updates live as you write - expand a category below for exactly what to fix.
          </div>
        </div>
      </div>
      <div className={styles.categories}>
        {analysis.categories.map((c) => (
          <CategoryRow
            key={c.id}
            category={c}
            meta={CATEGORY_META[c.id]}
            open={openCategory === c.id}
            onToggle={() => setOpenCategory(openCategory === c.id ? null : c.id)}
          />
        ))}
      </div>
    </div>
  );
}
