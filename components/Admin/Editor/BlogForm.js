import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "../admin.module.css";
import formStyles from "./BlogForm.module.css";
import SeoPanel from "./SeoPanel";
import { LuExternalLink, LuTrash2 } from "react-icons/lu";

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
  const wordCountRef = useRef(0);

  const setField = (field, value) => setPost((p) => ({ ...p, [field]: value }));

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

      <div className={formStyles.grid}>
        <div className={formStyles.editorCol}>
          <RichTextEditor
            value={post.contentHtml}
            onChange={(html) => setField("contentHtml", html)}
            wordCountRef={wordCountRef}
          />
        </div>
        <div className={formStyles.panelCol}>
          <SeoPanel post={post} setField={setField} categories={categories} authors={authors} siteUrl={siteUrl} />
        </div>
      </div>
    </div>
  );
}
