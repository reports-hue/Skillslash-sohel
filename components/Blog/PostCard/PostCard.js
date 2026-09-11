import Image from "next/image"
import Link from "next/link"
import { categoryBySlug } from "../../../Data/blog/categories"
import styles from "./PostCard.module.css"

export const formatDate = (value) => {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const Meta = ({ post }) => (
  <p className={styles.meta}>
    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    {post.readMinutes ? (
      <>
        <span className={styles.dot} aria-hidden="true" />
        <span>{post.readMinutes} min read</span>
      </>
    ) : null}
  </p>
)

// variant: "featured" (large, cover on top) | "row" (thumbnail beside copy)
// | "card" (default grid tile)
const PostCard = ({ post, variant = "card" }) => {
  const category = categoryBySlug(post.category)
  const accent = category ? category.accent : "#4f419a"
  // CMS-authored posts (Data/blog/posts.js is hand-authored file-based
  // articles) live at /blog/<slug> instead of the root; they set `href`
  // explicitly rather than this component guessing from `source`.
  const href = post.href || `/${post.slug}`
  const cover = post.cover || post.image

  if (variant === "row") {
    return (
      <article className={styles.row} style={{ "--accent": accent }}>
        <Link href={href} className={styles.rowMedia} tabIndex={-1} aria-hidden="true">
          <Image
            src={cover}
            alt=""
            width={220}
            height={124}
            className={styles.rowImage}
          />
        </Link>
        <div className={styles.rowBody}>
          <h3 className={styles.rowTitle}>
            <Link href={href}>{post.title}</Link>
          </h3>
          <p className={styles.rowExcerpt}>{post.excerpt}</p>
          <Meta post={post} />
        </div>
      </article>
    )
  }

  const isFeatured = variant === "featured"

  return (
    <article
      className={isFeatured ? styles.featured : styles.card}
      style={{ "--accent": accent }}
    >
      <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <Image
          src={cover}
          alt=""
          width={isFeatured ? 820 : 560}
          height={isFeatured ? 461 : 315}
          className={styles.image}
          priority={isFeatured}
        />
        {isFeatured ? <span className={styles.badge}>Featured</span> : null}
      </Link>

      <div className={styles.body}>
        {category ? (
          <Link href={`/category/${category.slug}`} className={styles.pill}>
            {category.name}
          </Link>
        ) : null}
        <h3 className={isFeatured ? styles.featuredTitle : styles.title}>
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Meta post={post} />
      </div>
    </article>
  )
}

export default PostCard
