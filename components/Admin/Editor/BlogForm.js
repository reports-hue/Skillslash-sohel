import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "../admin.module.css";
import formStyles from "./BlogForm.module.css";
import SeoPanel from "./SeoPanel";
import { detectSectionsFromBody } from "../../../lib/bodySectionSync";
import { LuExternalLink, LuTrash2, LuFileUp, LuDownload, LuChevronsRight, LuChevronsLeft } from "react-icons/lu";

// Fields the Word import is allowed to touch. Author, category, content
// type and every image stay whatever they already were - imported on
// purpose, not an oversight (see lib/docxImport.js).
const IMPORTABLE_FIELDS = [
  "title", "slug", "excerpt", "metaTitle", "metaDescription", "canonicalUrl",
  "focusKeyword", "keywords", "ogTitle", "ogDescription", "keyTakeaways",
  "faqs", "courses", "contentHtml",
];

// TipTap touches document/window at import time - keep it client-only.
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => <div className={formStyles.editorLoading}>Loading editor...</div>,
});

const EMPTY_POST = {
  title: "",
  slug: "",
  excerpt: "",
  contentHtml: "",
  coverImageUrl: "",
  categoryId: null,
  contentType: "course-comparison",
  status: "draft",
  authorId: null,
  authorName: "Skillslash Team",
  readMinutes: null,
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  focusKeyword: "",
  keywords: [],
  robotsIndex: true,
  robotsFollow: true,
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
  twitterCard: "summary_large_image",
  faqs: [],
  keyTakeaways: [],
  courses: [],
  schemaType: "BlogPosting",
};

export default function BlogForm({ initialPost, categories, authors = [], siteUrl }) {
  const router = useRouter();
  const isEdit = Boolean(initialPost?.id);
  const [post, setPost] = useState(() => ({ ...EMPTY_POST, ...(initialPost || {}) }));
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [importing, setImporting] = useState(false);
  const [importWarnings, setImportWarnings] = useState([]);
  const [bodySyncNotice, setBodySyncNotice] = useState("");
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const wordCountRef = useRef(0);
  const importInputRef = useRef(null);
  const bodySyncTimerRef = useRef(null);

  const setField = (field, value) => setPost((p) => ({ ...p, [field]: value }));

  // Typing (or pasting) an "FAQs" or "Courses Compared" heading followed by a
  // table directly into the body - the same convention the Word importer
  // teaches - keeps the SEO panel's FAQ/Courses fields in sync automatically,
  // so that content is only ever authored once. One-directional (body ->
  // sidebar) and only overwrites a field when the body actually contains a
  // matching, non-empty section: removing the section from the body later
  // does not clear what was already synced, and a field the admin filled in
  // by hand is left alone until a body section actually appears to sync from.
  useEffect(() => {
    const { faqs, courses } = detectSectionsFromBody(post.contentHtml);
    const synced = [];
    if (faqs && JSON.stringify(faqs) !== JSON.stringify(post.faqs)) {
      setField("faqs", faqs);
      synced.push(`${faqs.length} FAQ${faqs.length === 1 ? "" : "s"}`);
    }
    if (courses && JSON.stringify(courses) !== JSON.stringify(post.courses)) {
      setField("courses", courses);
      synced.push(`${courses.length} course${courses.length === 1 ? "" : "s"}`);
    }
    if (synced.length) {
      setBodySyncNotice(`Synced ${synced.join(" and ")} from the body content into the sidebar.`);
      clearTimeout(bodySyncTimerRef.current);
      bodySyncTimerRef.current = setTimeout(() => setBodySyncNotice(""), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.contentHtml]);

  useEffect(() => () => clearTimeout(bodySyncTimerRef.current), []);

  const handleTitleChange = (title) => {
    setField("title", title);
    if (!slugTouched) {
      setField(
        "slug",
        title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180)
      );
    }
  };

  const focusKeywordCheck = useMemo(() => {
    const kw = (post.focusKeyword || "").trim().toLowerCase();
    if (!kw) return null;
    const inTitle = (post.title || "").toLowerCase().includes(kw);
    const inMeta = (post.metaDescription || "").toLowerCase().includes(kw);
    const text = (post.contentHtml || "").replace(/<[^>]+>/g, " ").toLowerCase();
    const inBody = text.includes(kw);
    return { inTitle, inMeta, inBody };
  }, [post.focusKeyword, post.title, post.metaDescription, post.contentHtml]);

  const save = async (status) => {
    setError("");
    if (!post.title.trim()) {
      setError("Give the post a title before saving.");
      return;
    }
    setSaving(true);
    const payload = {
      ...post,
      status: status || post.status,
      readMinutes: post.readMinutes || Math.max(1, Math.round((wordCountRef.current || 0) / 200)) || null,
    };
    try {
      const url = isEdit ? `/api/admin/blogs/${initialPost.id}` : "/api/admin/blogs";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save the post.");
      if (!isEdit) {
        router.push(`/admin/blogs/${data.id}/edit`);
      } else {
        setPost((p) => ({ ...p, ...data }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImportClick = () => importInputRef.current?.click();

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError("");
    setImportWarnings([]);
    setImporting(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/blogs/import-docx", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not import that file.");

      const incoming = data.post || {};
      setPost((p) => {
        const next = { ...p };
        for (const field of IMPORTABLE_FIELDS) {
          if (incoming[field] !== undefined) next[field] = incoming[field];
        }
        return next;
      });
      if (incoming.slug) setSlugTouched(true);
      setImportWarnings(data.warnings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/blogs/${initialPost.id}`, { method: "DELETE" });
    if (res.ok || res.status === 204) {
      router.push("/admin");
    } else {
      setError("Could not delete the post.");
    }
  };

  return (
    <div>
      {error && <div className={styles.errorBanner}>{error}</div>}
      {bodySyncNotice && <div className={formStyles.bodySyncNotice}>{bodySyncNotice}</div>}
      {importWarnings.length > 0 && (
        <div className={formStyles.importWarnings}>
          <strong>Imported, with a few things to check:</strong>
          <ul>
            {importWarnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={formStyles.importRow}>
        <input
          ref={importInputRef}
          type="file"
          accept=".docx"
          hidden
          onChange={handleImportFile}
        />
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={handleImportClick}
          disabled={importing}
        >
          <LuFileUp /> {importing ? "Importing..." : "Import from Word"}
        </button>
        <a href="/templates/blog-import-template.docx" download className={formStyles.templateLink}>
          <LuDownload /> Download sample template
        </a>
      </div>

      <div className={formStyles.topRow}>
        <div className={formStyles.titleBlock}>
          <input
            className={formStyles.titleInput}
            placeholder="Post title"
            value={post.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <div className={formStyles.slugRow}>
            <span>{siteUrl}/blog/</span>
            <input
              className={formStyles.slugInput}
              value={post.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setField("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"));
              }}
            />
          </div>
        </div>

        <div className={formStyles.actions}>
          {/*
            Works for a draft too, not just a published post - the public
            route renders a draft at its real URL for a logged-in admin
            (see pages/blog/[slug].js), tagged noindex/no-sitemap/no-cache,
            so this is a real preview without publishing first.
          */}
          {isEdit && post.slug && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              {post.status === "published" ? "View" : "Preview"} <LuExternalLink />
            </a>
          )}
          {isEdit && (
            <button type="button" className={`${styles.btn} ${styles.btnDanger}`} onClick={handleDelete}>
              <LuTrash2 /> Delete
            </button>
          )}
          {isEdit && post.status === "published" && (
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              disabled={saving}
              onClick={() => save("draft")}
              title="Take this post out of the sitemap and off /blog - it stays saved as a draft"
            >
              Unpublish
            </button>
          )}
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} disabled={saving} onClick={() => save("draft")}>
            Save draft
          </button>
          {/*
            When the post is already published, this submits whatever status
            is currently selected in the SEO panel's Status dropdown
            (post.status) rather than a value hardcoded here - switching
            that dropdown to Draft and clicking this button is one way an
            already-published post gets unpublished (the dedicated
            "Unpublish" button above is the more direct one). A version of
            this button that always forced "published" is exactly what made
            unpublishing silently not work: changing the dropdown to Draft
            and clicking here republished the post instead of saving the
            draft status.
          */}
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            disabled={saving}
            onClick={() => save(post.status === "published" ? post.status : "published")}
          >
            {saving ? "Saving..." : post.status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {focusKeywordCheck && (
        <div className={formStyles.seoChecklist}>
          <span className={focusKeywordCheck.inTitle ? formStyles.checkOk : formStyles.checkWarn}>
            {focusKeywordCheck.inTitle ? "✓" : "○"} Focus keyword in title
          </span>
          <span className={focusKeywordCheck.inMeta ? formStyles.checkOk : formStyles.checkWarn}>
            {focusKeywordCheck.inMeta ? "✓" : "○"} Focus keyword in meta description
          </span>
          <span className={focusKeywordCheck.inBody ? formStyles.checkOk : formStyles.checkWarn}>
            {focusKeywordCheck.inBody ? "✓" : "○"} Focus keyword in body
          </span>
        </div>
      )}

      <button
        type="button"
        className={formStyles.panelToggle}
        onClick={() => setPanelCollapsed((c) => !c)}
        aria-label={panelCollapsed ? "Show SEO panel" : "Hide SEO panel"}
      >
        {panelCollapsed ? <LuChevronsLeft /> : <LuChevronsRight />}
        {panelCollapsed ? "Show SEO panel" : "Hide SEO panel"}
      </button>

      <div className={`${formStyles.grid} ${panelCollapsed ? formStyles.gridPanelCollapsed : ""}`}>
        <div className={formStyles.editorCol}>
          <RichTextEditor
            value={post.contentHtml}
            onChange={(html) => setField("contentHtml", html)}
            wordCountRef={wordCountRef}
          />
        </div>
        {!panelCollapsed && (
          <div className={formStyles.panelCol}>
            <SeoPanel post={post} setField={setField} categories={categories} authors={authors} siteUrl={siteUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
