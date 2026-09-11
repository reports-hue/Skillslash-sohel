import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../admin.module.css";

const NAV = [
  { href: "/admin", label: "Posts" },
  { href: "/admin/authors", label: "Authors" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ admin, children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Link href="/admin" className={styles.brand}>
            <span className={styles.brandMark}>S</span>
            Skillslash CMS
          </Link>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${router.pathname === item.href ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.topbarRight}>
          {admin && <span>{admin.name}</span>}
          <button type="button" className={styles.linkBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
