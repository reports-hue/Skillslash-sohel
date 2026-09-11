import { useEffect, useRef, useState } from "react";
import { LuList } from "react-icons/lu";
import styles from "./PostView.module.css";

// Highlights whichever section heading is currently nearest the top of the
// viewport as the reader scrolls, the way the sticky sidebar in the target
// design does.
export default function Toc({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id);
  const observer = useRef(null);

  useEffect(() => {
    if (!headings.length) return undefined;

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-8% 0px -80% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className={styles.tocCard} aria-label="Table of contents">
      <p className={styles.sidebarCardTitle}>
        <LuList aria-hidden="true" /> Table of Contents
      </p>
      <ol className={styles.tocList}>
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={h.id === activeId ? styles.tocLinkActive : styles.tocLink}
            >
              <span className={styles.tocNum}>{i + 1}</span>{h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
