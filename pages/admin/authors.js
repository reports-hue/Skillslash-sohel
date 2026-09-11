import { useEffect, useState } from "react";
import Head from "next/head";
import { LuPlus, LuPencil, LuTrash2, LuStar } from "react-icons/lu";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import styles from "../../components/Admin/admin.module.css";
import authorStyles from "../../components/Admin/authors.module.css";
import { getSessionFromRequest } from "../../lib/adminAuth";

// lib/authors.js is imported dynamically, inside this function, not as a
// top-level `import` - it pulls in `pg`, which has no browser build. See
// pages/blog/[slug].js for why a top-level import doesn't get stripped from
// the client bundle the way a dynamic import() called from inside
// getServerSideProps does.
export async function getServerSideProps({ req }) {
  const admin = await getSessionFromRequest(req);
  if (!admin) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  const { listAuthors } = await import("../../lib/authors");
  const authors = await listAuthors();
  return { props: { admin, authors } };
}

const EMPTY = {
  id: null,
  name: "",
  title: "",
  bio: "",
  avatarUrl: "",
  email: "",
  twitterUrl: "",
  linkedinUrl: "",
  websiteUrl: "",
  isDefault: false,
};

async function uploadImage(file) {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Upload failed.");
  const { url } = await res.json();
  return url;
}

export default function AuthorsPage({ admin, authors: initialAuthors }) {
  const [authors, setAuthors] = useState(initialAuthors);
  const [form, setForm] = useState(null); // null = closed, EMPTY-shaped object = open
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const setField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const openNew = () => setForm({ ...EMPTY });
  const openEdit = (author) => setForm({ ...EMPTY, ...author });
  const close = () => {
    setForm(null);
    setError("");
  };

  const save = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const isEdit = Boolean(form.id);
      const res = await fetch(isEdit ? `/api/admin/authors/${form.id}` : "/api/admin/authors", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save the author.");
      setAuthors((prev) => {
        const withoutDefaultClash = data.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev;
        const exists = withoutDefaultClash.some((a) => a.id === data.id);
        return exists
          ? withoutDefaultClash.map((a) => (a.id === data.id ? data : a))
          : [...withoutDefaultClash, data];
      });
      close();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (author) => {
    if (!window.confirm(`Delete "${author.name}"? Posts crediting them keep their byline text but lose the link.`)) return;
    const res = await fetch(`/api/admin/authors/${author.id}`, { method: "DELETE" });
    if (res.ok || res.status === 204) {
      setAuthors((prev) => prev.filter((a) => a.id !== author.id));
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setField("avatarUrl", await uploadImage(file));
    } catch (err) {
      window.alert(err.message);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <AdminLayout admin={admin}>
      <Head>
        <title>Authors - Skillslash CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Authors</h1>
          <p className={styles.pageSub}>
            Create an author profile once - name, title, bio, photo, socials - then pick it from a dropdown on every post.
          </p>
        </div>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={openNew}>
          <LuPlus /> New author
        </button>
      </div>

      <div className={authorStyles.grid}>
        {authors.map((a) => (
          <div key={a.id} className={authorStyles.card}>
            {a.isDefault && (
              <span className={authorStyles.defaultBadge}>
                <LuStar /> Default
              </span>
            )}
            <div className={authorStyles.cardTop}>
              {a.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.avatarUrl} alt="" className={authorStyles.avatar} />
              ) : (
                <div className={authorStyles.avatarPlaceholder}>{a.name.slice(0, 1).toUpperCase()}</div>
              )}
              <div>
                <div className={authorStyles.name}>{a.name}</div>
                {a.title && <div className={authorStyles.title}>{a.title}</div>}
              </div>
            </div>
            {a.bio && <p className={authorStyles.bio}>{a.bio}</p>}
            <div className={authorStyles.cardActions}>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => openEdit(a)}>
                <LuPencil /> Edit
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnDanger}`} onClick={() => handleDelete(a)}>
                <LuTrash2 />
              </button>
            </div>
          </div>
        ))}
        {authors.length === 0 && <div className={styles.emptyState}>No authors yet - create one.</div>}
      </div>

      {form && (
        <div className={authorStyles.overlay} onClick={close}>
          <div className={authorStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={authorStyles.modalTitle}>{form.id ? "Edit author" : "New author"}</h2>
            {error && <div className={styles.errorBanner}>{error}</div>}

            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input className={styles.input} value={form.name} onChange={(e) => setField("name", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Title / role</label>
              <input className={styles.input} value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="e.g. Senior Data Scientist" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Bio</label>
              <textarea className={styles.textarea} rows={3} value={form.bio} onChange={(e) => setField("bio", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Photo</label>
              <div className={authorStyles.avatarRow}>
                {form.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.avatarUrl} alt="" className={authorStyles.avatarSm} />
                ) : (
                  <div className={authorStyles.avatarPlaceholderSm}>{(form.name || "?").slice(0, 1).toUpperCase()}</div>
                )}
                <label className={`${styles.btn} ${styles.btnGhost}`} style={{ cursor: "pointer" }}>
                  Upload
                  <input type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
                </label>
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input className={styles.input} type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Twitter / X URL</label>
              <input className={styles.input} value={form.twitterUrl} onChange={(e) => setField("twitterUrl", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>LinkedIn URL</label>
              <input className={styles.input} value={form.linkedinUrl} onChange={(e) => setField("linkedinUrl", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={authorStyles.checkboxRow}>
                <input type="checkbox" checked={form.isDefault} onChange={(e) => setField("isDefault", e.target.checked)} />
                Use as the default author for new posts
              </label>
            </div>

            <div className={authorStyles.modalActions}>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={close}>
                Cancel
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving} onClick={save}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
