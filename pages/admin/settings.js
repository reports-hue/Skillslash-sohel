import { useState } from "react";
import Head from "next/head";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import styles from "../../components/Admin/admin.module.css";
import { getSessionFromRequest } from "../../lib/adminAuth";

// lib/siteSettings.js and lib/authors.js are imported dynamically, inside
// this function, not as top-level `import`s - both pull in `pg`, which has
// no browser build. See pages/blog/[slug].js for why a top-level import
// doesn't get stripped from the client bundle the way a dynamic import()
// called from inside getServerSideProps does.
export async function getServerSideProps({ req }) {
  const admin = await getSessionFromRequest(req);
  if (!admin) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  const { getSiteSettings } = await import("../../lib/siteSettings");
  const { listAuthors } = await import("../../lib/authors");
  const [settings, authors] = await Promise.all([getSiteSettings(), listAuthors()]);
  return { props: { admin, settings, authors } };
}

function KeywordsField({ value, onChange }) {
  const words = value || [];
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, border: "1px solid #e1ddec", borderRadius: 7, padding: "7px 8px" }}>
        {words.map((w, i) => (
          <span key={w} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eeecf7", color: "#4f419a", fontSize: 12, fontWeight: 600, padding: "3px 4px 3px 9px", borderRadius: 999 }}>
            {w}
            <button type="button" onClick={() => onChange(words.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
              &times;
            </button>
          </span>
        ))}
        <input
          style={{ flex: "1 1 120px", border: "none", outline: "none", fontSize: 13.5, minWidth: 100 }}
          placeholder="Type a keyword and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              const w = e.currentTarget.value.trim();
              if (w && !words.includes(w)) onChange([...words, w]);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}

export default function SettingsPage({ admin, settings: initialSettings, authors }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [error, setError] = useState("");

  const setField = (field, value) => setSettings((s) => ({ ...s, [field]: value }));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save settings.");
      setSettings(data);
      setSavedAt(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout admin={admin}>
      <Head>
        <title>Settings - Skillslash CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Site-wide SEO defaults</h1>
          <p className={styles.pageSub}>
            Set these once - they pre-fill the meta title, description, keywords, OG image and author on
            every new post so you are not retyping the same boilerplate each time. Any post can still
            override a default individually.
          </p>
        </div>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.card} style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 4 }}>
        <div className={styles.field}>
          <label className={styles.label}>Site name</label>
          <input className={styles.input} value={settings.siteName} onChange={(e) => setField("siteName", e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Site description</label>
          <textarea className={styles.textarea} rows={2} value={settings.siteDescription || ""} onChange={(e) => setField("siteDescription", e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Default meta title template</label>
          <input
            className={styles.input}
            value={settings.defaultMetaTitleTemplate}
            onChange={(e) => setField("defaultMetaTitleTemplate", e.target.value)}
          />
          <p className={styles.hint}>
            <code>{"{title}"}</code> is replaced with the post title when a new post has no meta title of its own.
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Default meta description</label>
          <textarea
            className={styles.textarea}
            rows={2}
            value={settings.defaultMetaDescription || ""}
            onChange={(e) => setField("defaultMetaDescription", e.target.value)}
          />
          <p className={styles.hint}>Used only when a post's own meta description and excerpt are both empty.</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Default keywords</label>
          <KeywordsField value={settings.defaultKeywords} onChange={(v) => setField("defaultKeywords", v)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Default OG / social image URL</label>
          <input className={styles.input} value={settings.defaultOgImageUrl || ""} onChange={(e) => setField("defaultOgImageUrl", e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Twitter / X handle</label>
          <input className={styles.input} value={settings.twitterHandle || ""} onChange={(e) => setField("twitterHandle", e.target.value)} placeholder="@skillslash" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Default author</label>
          <select
            className={styles.select}
            value={settings.defaultAuthorId || ""}
            onChange={(e) => setField("defaultAuthorId", e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">None</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <p className={styles.hint}>
            Applied to every new post's byline automatically. Manage the author list itself on the Authors page.
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Organization schema URL</label>
          <input
            className={styles.input}
            value={settings.organizationSchemaUrl}
            onChange={(e) => setField("organizationSchemaUrl", e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 8 }}>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving} onClick={save}>
            {saving ? "Saving..." : "Save defaults"}
          </button>
          {savedAt && <span className={styles.hint}>Saved.</span>}
        </div>
      </div>
    </AdminLayout>
  );
}
