import { useRef } from "react";
import styles from "../admin.module.css";
import panelStyles from "./SeoPanel.module.css";
import { LuPlus, LuTrash2, LuUpload } from "react-icons/lu";

function Counter({ value, min, max }) {
  const len = (value || "").length;
  const tone = len === 0 ? "" : len < min ? "warn" : len > max ? "crit" : "ok";
  return (
    <span className={`${styles.counter} ${tone ? styles[tone] : ""}`}>
      {len} / {min}–{max} chars
    </span>
  );
}

function Section({ title, hint, children }) {
  return (
    <div className={panelStyles.section}>
      <h3 className={panelStyles.sectionTitle}>{title}</h3>
      {hint && <p className={panelStyles.sectionHint}>{hint}</p>}
      {children}
    </div>
  );
}

async function uploadImage(file) {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Upload failed.");
  }
  const { url } = await res.json();
  return url;
}

function ImageField({ label, value, onChange }) {
  const inputRef = useRef(null);
  const pick = () => inputRef.current?.click();
  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      window.alert(err.message);
    } finally {
      e.target.value = "";
    }
  };
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={panelStyles.imageRow}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={panelStyles.imagePreview} />
        ) : (
          <div className={panelStyles.imagePlaceholder}>No image</div>
        )}
        <div className={panelStyles.imageActions}>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={pick}>
            <LuUpload /> Upload
          </button>
          {value && (
            <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => onChange("")}>
              Remove
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
      </div>
    </div>
  );
}

function KeywordsField({ value, onChange }) {
  const words = value || [];
  const addWord = (raw) => {
    const w = raw.trim();
    if (!w || words.includes(w)) return;
    onChange([...words, w]);
  };
  return (
    <div className={styles.field}>
      <label className={styles.label}>Keywords</label>
      <div className={panelStyles.tagRow}>
        {words.map((w, i) => (
          <span key={w} className={panelStyles.tag}>
            {w}
            <button type="button" onClick={() => onChange(words.filter((_, idx) => idx !== i))} aria-label={`Remove ${w}`}>
              &times;
            </button>
          </span>
        ))}
        <input
          className={panelStyles.tagInput}
          placeholder="Type a keyword and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addWord(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <p className={styles.hint}>Used for the meta keywords tag and the on-page keyword-density check below.</p>
    </div>
  );
}

function FaqRepeater({ value, onChange }) {
  const faqs = value || [];
  const update = (i, field, v) => {
    const next = [...faqs];
    next[i] = { ...next[i], [field]: v };
    onChange(next);
  };
  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i} className={panelStyles.repeaterRow}>
          <div className={panelStyles.repeaterFields}>
            <input
              className={styles.input}
              placeholder="Question"
              value={f.question || ""}
              onChange={(e) => update(i, "question", e.target.value)}
            />
            <textarea
              className={styles.textarea}
              placeholder="Answer"
              rows={2}
              value={f.answer || ""}
              onChange={(e) => update(i, "answer", e.target.value)}
            />
          </div>
          <button
            type="button"
            className={panelStyles.repeaterRemove}
            onClick={() => onChange(faqs.filter((_, idx) => idx !== i))}
            aria-label="Remove FAQ"
          >
            <LuTrash2 />
          </button>
        </div>
      ))}
      <button
        type="button"
        className={`${styles.btn} ${styles.btnGhost}`}
        onClick={() => onChange([...faqs, { question: "", answer: "" }])}
      >
        <LuPlus /> Add question
      </button>
    </div>
  );
}

function TakeawaysRepeater({ value, onChange }) {
  const items = value || [];
  return (
    <div>
      {items.map((t, i) => (
        <div key={i} className={panelStyles.repeaterRow}>
          <input
            className={styles.input}
            placeholder={`Key takeaway ${i + 1}`}
            value={t}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            className={panelStyles.repeaterRemove}
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label="Remove takeaway"
          >
            <LuTrash2 />
          </button>
        </div>
      ))}
      <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => onChange([...items, ""])}>
        <LuPlus /> Add takeaway
      </button>
    </div>
  );
}

const EMPTY_COURSE = {
  name: "", description: "", providerName: "", providerUrl: "", credentialAwarded: "",
  url: "", price: "", priceCurrency: "INR", availability: "InStock", category: "",
  startDate: "", endDate: "", courseMode: "Online", courseWorkload: "",
};

// One row per course, generating the Course/Offer/CourseInstance ItemList
// block in lib/cmsPostSchema.js - the same JSON-LD shape used elsewhere in
// this account, but built from plain fields instead of hand-written JSON.
function CourseRepeater({ value, onChange }) {
  const courses = value || [];
  const update = (i, field, v) => {
    const next = [...courses];
    next[i] = { ...next[i], [field]: v };
    onChange(next);
  };
  return (
    <div>
      {courses.map((c, i) => (
        <div key={i} className={panelStyles.courseCard}>
          <div className={panelStyles.courseCardHead}>
            <span>Course {i + 1}</span>
            <button
              type="button"
              className={panelStyles.repeaterRemove}
              onClick={() => onChange(courses.filter((_, idx) => idx !== i))}
              aria-label={`Remove course ${i + 1}`}
            >
              <LuTrash2 />
            </button>
          </div>

          <input className={styles.input} placeholder="Course name" value={c.name} onChange={(e) => update(i, "name", e.target.value)} />
          <textarea className={styles.textarea} rows={2} placeholder="Description" value={c.description} onChange={(e) => update(i, "description", e.target.value)} />
          <input className={styles.input} placeholder="Course URL" value={c.url} onChange={(e) => update(i, "url", e.target.value)} />

          <div className={panelStyles.courseGrid}>
            <input className={styles.input} placeholder="Provider name" value={c.providerName} onChange={(e) => update(i, "providerName", e.target.value)} />
            <input className={styles.input} placeholder="Provider URL" value={c.providerUrl} onChange={(e) => update(i, "providerUrl", e.target.value)} />
          </div>
          <input className={styles.input} placeholder="Credential awarded" value={c.credentialAwarded} onChange={(e) => update(i, "credentialAwarded", e.target.value)} />

          <div className={panelStyles.courseGrid3}>
            <input className={styles.input} placeholder="Price" value={c.price} onChange={(e) => update(i, "price", e.target.value)} />
            <input className={styles.input} placeholder="Currency" value={c.priceCurrency} onChange={(e) => update(i, "priceCurrency", e.target.value)} />
            <select className={styles.select} value={c.availability} onChange={(e) => update(i, "availability", e.target.value)}>
              <option value="InStock">In stock</option>
              <option value="PreOrder">Pre-order</option>
              <option value="SoldOut">Sold out</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>
          <input className={styles.input} placeholder="Category (e.g. Data Science & GenAI)" value={c.category} onChange={(e) => update(i, "category", e.target.value)} />

          <div className={panelStyles.courseGrid}>
            <input className={styles.input} type="date" placeholder="Start date" value={c.startDate} onChange={(e) => update(i, "startDate", e.target.value)} />
            <input className={styles.input} type="date" placeholder="End date" value={c.endDate} onChange={(e) => update(i, "endDate", e.target.value)} />
          </div>
          <div className={panelStyles.courseGrid}>
            <select className={styles.select} value={c.courseMode} onChange={(e) => update(i, "courseMode", e.target.value)}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Blended">Blended</option>
            </select>
            <input
              className={styles.input}
              placeholder="Workload, ISO 8601 (e.g. P43W = 43 weeks)"
              value={c.courseWorkload}
              onChange={(e) => update(i, "courseWorkload", e.target.value)}
            />
          </div>
        </div>
      ))}
      <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => onChange([...courses, { ...EMPTY_COURSE }])}>
        <LuPlus /> Add course
      </button>
    </div>
  );
}

export default function SeoPanel({ post, setField, categories, authors, siteUrl }) {
  const slugPreview = post.slug ? `${siteUrl}/blog/${post.slug}` : `${siteUrl}/blog/your-post-slug`;

  return (
    <div className={panelStyles.panel}>
      <Section title="Publish">
        <div className={styles.field}>
          <label className={styles.label} htmlFor="status">Status</label>
          <select id="status" className={styles.select} value={post.status} onChange={(e) => setField("status", e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="category">Category</label>
          <select
            id="category"
            className={styles.select}
            value={post.categoryId || ""}
            onChange={(e) => setField("categoryId", e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contentType">Content type</label>
          <select id="contentType" className={styles.select} value={post.contentType} onChange={(e) => setField("contentType", e.target.value)}>
            {/* Values match Data/blog/types.js so a CMS post sorts under the
                right homepage tab alongside the hand-authored articles. */}
            <option value="course-comparison">Course Comparison</option>
            <option value="programs">Programs &amp; Master's Degrees</option>
            <option value="certifications">Certifications</option>
            <option value="career">Career Guidance</option>
            <option value="trends">Industry Trends</option>
            <option value="stories">Student Stories</option>
          </select>
        </div>
        <div className={styles.field}>
          <div className={panelStyles.labelRow}>
            <label className={styles.label} htmlFor="author">Author</label>
            <a href="/admin/authors" target="_blank" rel="noreferrer" className={panelStyles.manageLink}>
              Manage authors
            </a>
          </div>
          <select
            id="author"
            className={styles.select}
            value={post.authorId || ""}
            onChange={(e) => {
              const id = e.target.value ? Number(e.target.value) : null;
              const author = authors.find((a) => a.id === id);
              setField("authorId", id);
              setField("authorName", author ? author.name : post.authorName);
            }}
          >
            <option value="">{post.authorName || "No author"}</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
                {a.isDefault ? " (default)" : ""}
              </option>
            ))}
          </select>
          <p className={styles.hint}>
            Author profiles (bio, avatar, title) are created once in Manage authors and reused across posts.
          </p>
        </div>
      </Section>

      <Section title="Cover image">
        <ImageField label="" value={post.coverImageUrl} onChange={(url) => setField("coverImageUrl", url)} />
      </Section>

      <Section title="Excerpt" hint="Shown on post cards and used as a fallback meta description.">
        <textarea
          className={styles.textarea}
          rows={3}
          value={post.excerpt || ""}
          onChange={(e) => setField("excerpt", e.target.value)}
        />
      </Section>

      <Section title="Search (SEO)" hint="How this post appears in a Google result.">
        <div className={panelStyles.serpPreview}>
          <div className={panelStyles.serpUrl}>{slugPreview}</div>
          <div className={panelStyles.serpTitle}>{post.metaTitle || post.title || "Untitled post"}</div>
          <div className={panelStyles.serpDesc}>{post.metaDescription || post.excerpt || "Add a meta description to control this snippet."}</div>
        </div>

        <div className={styles.field}>
          <div className={panelStyles.labelRow}>
            <label className={styles.label} htmlFor="metaTitle">Meta title</label>
            <Counter value={post.metaTitle} min={40} max={60} />
          </div>
          <input id="metaTitle" className={styles.input} value={post.metaTitle || ""} onChange={(e) => setField("metaTitle", e.target.value)} placeholder={post.title} />
        </div>

        <div className={styles.field}>
          <div className={panelStyles.labelRow}>
            <label className={styles.label} htmlFor="metaDescription">Meta description</label>
            <Counter value={post.metaDescription} min={120} max={160} />
          </div>
          <textarea id="metaDescription" className={styles.textarea} rows={3} value={post.metaDescription || ""} onChange={(e) => setField("metaDescription", e.target.value)} placeholder={post.excerpt} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="canonical">Canonical URL</label>
          <input id="canonical" className={styles.input} value={post.canonicalUrl || ""} onChange={(e) => setField("canonicalUrl", e.target.value)} placeholder={slugPreview} />
          <p className={styles.hint}>Leave blank to self-canonicalise to the URL above.</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="focusKeyword">Focus keyword</label>
          <input id="focusKeyword" className={styles.input} value={post.focusKeyword || ""} onChange={(e) => setField("focusKeyword", e.target.value)} placeholder="e.g. data science course in pune" />
        </div>

        <KeywordsField value={post.keywords} onChange={(v) => setField("keywords", v)} />

        <div className={panelStyles.toggleRow}>
          <label className={panelStyles.toggle}>
            <input type="checkbox" checked={post.robotsIndex} onChange={(e) => setField("robotsIndex", e.target.checked)} />
            Allow indexing
          </label>
          <label className={panelStyles.toggle}>
            <input type="checkbox" checked={post.robotsFollow} onChange={(e) => setField("robotsFollow", e.target.checked)} />
            Follow links (whole page)
          </label>
        </div>
        <p className={styles.hint}>
          That&rsquo;s the page-wide signal, not per-link. To set dofollow/nofollow on
          one specific link: select the text in the editor, click the 🔗 <strong>Link</strong> button
          in its toolbar, and use the <strong>nofollow</strong> checkbox there.
        </p>
      </Section>

      <Section
        title="Answers &amp; AI overviews (AEO / GEO / AIO)"
        hint="Feeds a FAQPage schema block and an on-page 'Key takeaways' summary that answer engines and AI overviews quote directly."
      >
        <div className={styles.field}>
          <label className={styles.label}>Key takeaways</label>
          <TakeawaysRepeater value={post.keyTakeaways} onChange={(v) => setField("keyTakeaways", v)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>FAQs</label>
          <FaqRepeater value={post.faqs} onChange={(v) => setField("faqs", v)} />
        </div>
      </Section>

      <Section
        title="Courses compared"
        hint="Generates an ItemList of Course / Offer / CourseInstance JSON-LD for every course this article compares - the same structured-data pattern used elsewhere in the account, built from fields instead of hand-written JSON."
      >
        <CourseRepeater value={post.courses} onChange={(v) => setField("courses", v)} />
      </Section>

      <Section title="Social sharing">
        <div className={styles.field}>
          <label className={styles.label} htmlFor="ogTitle">OG title</label>
          <input id="ogTitle" className={styles.input} value={post.ogTitle || ""} onChange={(e) => setField("ogTitle", e.target.value)} placeholder={post.metaTitle || post.title} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="ogDescription">OG description</label>
          <textarea id="ogDescription" className={styles.textarea} rows={2} value={post.ogDescription || ""} onChange={(e) => setField("ogDescription", e.target.value)} placeholder={post.metaDescription || post.excerpt} />
        </div>
        <ImageField label="OG image (falls back to cover image)" value={post.ogImageUrl} onChange={(url) => setField("ogImageUrl", url)} />
      </Section>

      <Section title="Structured data" hint="Advanced - leave on BlogPosting unless you know what you need.">
        <div className={styles.field}>
          <label className={styles.label} htmlFor="schemaType">Schema @type</label>
          <select id="schemaType" className={styles.select} value={post.schemaType} onChange={(e) => setField("schemaType", e.target.value)}>
            <option value="BlogPosting">BlogPosting</option>
            <option value="Article">Article</option>
            <option value="NewsArticle">NewsArticle</option>
            <option value="HowTo">HowTo</option>
          </select>
        </div>
      </Section>
    </div>
  );
}
