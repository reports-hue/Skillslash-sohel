import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuList, LuGraduationCap } from "react-icons/lu";
import styles from "./blogContent.module.css";
import ShareButtons from "../ShareButton";
import { Newsletter } from "../../Blog/Sidebar/Sidebar";

// The skillslash-cdn bucket is gone, so related-blog thumbnails resolve to
// the locally generated cover for that post instead.
const coverForLink = (link) => {
  if (!link) return null;
  const slug = String(link).split("?")[0].replace(/\/+$/, "").split("/").pop();
  return slug ? `/covers/${slug}.svg` : null;
};

const formatArticleDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogContent = ({
  contentHtml,
  shareLink,
  MumbaiData,
  publishDate,
  lastUpdated,
}) => {
  const [headings, setHeadings] = useState([]);

  // Gives every <h2> in the article body a stable id and reads its text, so
  // the sidebar Table of Contents can link straight to each section. The
  // markup itself (contentHtml) is untouched - only ids are added to what's
  // already rendered.
  useEffect(() => {
    const article = document.getElementById("city-blog-article");
    if (!article) return;
    const found = Array.from(article.querySelectorAll("h2")).map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute("id", id);
      return { id, text: heading.textContent };
    });
    setHeadings(found);
  }, [contentHtml]);

  const related = (MumbaiData?.Blogs || []).slice(0, 4);

  return (
    <div className={styles.page}>
      <div className={styles.metaRow}>
        <div className={styles.metaText}>
          <time dateTime={publishDate}>{formatArticleDate(publishDate)}</time>
          {lastUpdated ? (
            <>
              <span className={styles.dot}>·</span>
              <span>Updated {formatArticleDate(lastUpdated)}</span>
            </>
          ) : null}
        </div>
        <ShareButtons url={shareLink} />
      </div>

      <div className={styles.layout}>
        <article
          id="city-blog-article"
          className={`${styles.markdown} markdown`}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <aside className={styles.sidebar}>
          {headings.length ? (
            <nav className={styles.tocCard} aria-label="Table of contents">
              <p className={styles.sidebarCardTitle}>
                <LuList aria-hidden="true" /> Table of Contents
              </p>
              <ol className={styles.tocList}>
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className={styles.tocLink}>
                      <span className={styles.tocNum}>{i + 1}</span>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon} aria-hidden="true">
              <LuGraduationCap size={18} />
            </div>
            <p className={styles.ctaTitle}>Find the Right Course for Your Future</p>
            <p className={styles.ctaText}>
              Explore top-rated courses, compare programs and get expert guidance — all in one place.
            </p>
            <Link href="/" className={styles.ctaBtn}>
              Explore Courses →
            </Link>
          </div>

          {related.length ? (
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarCardTitle}>Related blogs</p>
              <div className={styles.relatedList}>
                {related.map((blog, index) => (
                  <Link key={index} href={blog.link} className={styles.relatedItem}>
                    {coverForLink(blog.link) ? (
                      <Image
                        src={coverForLink(blog.link)}
                        alt=""
                        width={56}
                        height={42}
                        loading="lazy"
                        className={styles.relatedThumb}
                      />
                    ) : null}
                    <p className={styles.relatedItemTitle}>{blog.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.sidebarNewsletter}>
            <Newsletter />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogContent;
