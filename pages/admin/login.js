import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../components/Admin/admin.module.css";
import loginStyles from "../../components/Admin/login.module.css";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }
      const next = router.query.next && String(router.query.next).startsWith("/admin")
        ? router.query.next
        : "/admin";
      router.push(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.shell}>
      <Head>
        <title>Admin Login - Skillslash CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className={loginStyles.wrap}>
        <form className={loginStyles.card} onSubmit={handleSubmit}>
          <div className={loginStyles.brandMark}>S</div>
          <h1 className={loginStyles.title}>Skillslash CMS</h1>
          <p className={loginStyles.sub}>Sign in to write and publish blog posts.</p>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={busy} style={{ width: "100%", justifyContent: "center" }}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
