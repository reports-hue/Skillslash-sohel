import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { LuPlus, LuSearch, LuPencil, LuExternalLink, LuTrash2 } from "react-icons/lu";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import styles from "../../components/Admin/admin.module.css";
import dashStyles from "../../components/Admin/dashboard.module.css";
import { getSessionFromRequest } from "../../lib/adminAuth";

export async function getServerSideProps({ req }) {
  // Middleware already redirects unauthenticated requests to /admin/login
  // before this ever runs; this check is the same one done again in case
  // middleware is ever bypassed, and gives the page its `admin` prop.
  const admin = await getSessionFromRequest(req);
  if (!admin) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  return { props: { admin } };
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboard({ admin }) {
  const [posts, setPosts] = useState(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setError("Could not load posts."));
  }, []);

  const filtered = useMemo(() => {
    if (!posts) return [];
    return posts.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (q && !`${p.title} ${p.slug}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [posts, q, statusFilter]);

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/blogs/${post.id}`, { method: "DELETE" });
    if (res.ok || res.status === 204) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } else {
      setError("Could not delete the post.");
    }
  };

  const counts = useMemo(() => {
    if (!posts) return { all: 0, published: 0, draft: 0 };
    return {
      all: posts.length,
      published: posts.filter((p) => p.status === "published").length,
      draft: posts.filter((p) => p.status === "draft").length,
    };
  }, [posts]);

  return (
    <AdminLayout admin={admin}>
      <Head>
        <title>Posts - Skillslash CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Blog posts</h1>
          <p className={styles.pageSub}>Write, publish and manage articles that live at /blog/&lt;slug&gt;.</p>
        </div>
        <Link href="/admin/blogs/new" className={`${styles.btn} ${styles.btnPrimary}`}>
          <LuPlus /> New post
        </Link>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={dashStyles.toolbar}>
        <div className={dashStyles.searchBox}>
          <LuSearch />
          <input placeholder="Search title or slug..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className={dashStyles.filters}>
          {["all", "published", "draft"].map((s) => (
            <button
              key={s}
              type="button"
              className={`${dashStyles.filterBtn} ${statusFilter === s ? dashStyles.filterBtnActive : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === "all" ? "All" : s === "published" ? "Published" : "Drafts"} ({counts[s]})
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card} style={{ padding: 0 }}>
        {posts === null ? (
          <div className={styles.emptyState}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            {posts.length === 0 ? "No posts yet - write your first one." : "Nothing matches that search."}
          </div>
        ) : (
          <table className={dashStyles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Updated</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={dashStyles.titleCell}>{p.title}</div>
                    <div className={dashStyles.slugCell}>/blog/{p.slug}</div>
                  </td>
                  <td>{p.categoryName || "—"}</td>
                  <td>
                    <span className={`${styles.pill} ${p.status === "published" ? styles.pillOk : styles.pillWarn}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{formatDate(p.updatedAt)}</td>
                  <td>
                    <div className={dashStyles.rowActions}>
                      {p.status === "published" && (
                        <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" aria-label="View live" className={dashStyles.iconBtn}>
                          <LuExternalLink />
                        </a>
                      )}
                      <Link href={`/admin/blogs/${p.id}/edit`} aria-label="Edit" className={dashStyles.iconBtn}>
                        <LuPencil />
                      </Link>
                      <button type="button" aria-label="Delete" className={dashStyles.iconBtn} onClick={() => handleDelete(p)}>
                        <LuTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
