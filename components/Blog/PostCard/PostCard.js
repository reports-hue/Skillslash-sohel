import Image from "next/image"
import Link from "next/link"
import {
  LuBrainCircuit, LuBarChart3, LuNetwork, LuCloud, LuLayers, LuTerminal,
  LuCalendar, LuClock,
} from "react-icons/lu"
import { categoryBySlug } from "../../../Data/blog/categories"
import styles from "./PostCard.module.css"

// One icon per taxonomy category (Data/blog/categories.js) - kept here
// rather than on the category objects themselves since only the card
// needs it, and categories.js is plain serializable data used in a few
// other places. Picked to actually mean something per topic rather than
// a generic file icon: a brain/circuit for ML-flavoured AI, a network
// graph for DSA (nodes and edges, not just "code"), etc.
const CATEGORY_ICONS = {
  "data-science": LuBarChart3,
  "artificial-intelligence": LuBrainCircuit,
  "dsa": LuNetwork,
  "cloud": LuCloud,
  "fde": LuLayers,
  "sde": LuTerminal,
}

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
    <span className={styles.metaItem}>
      <LuCalendar aria-hidden="true" />
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    </span>
    {post.readMinutes ? (
      <>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.metaItem}>
          <LuClock aria-hidden="true" />
          {post.readMinutes} min read
        </span>
      </>
    ) : null}
  </p>
)

// variant: "featured" (large, cover on top) | "row" (thumbnail beside copy)
// | "card" (default grid tile)
const PostCard = ({ post, variant = "card" }) => {
  const category = categoryBySlug(post.category)
  const accent = category ? category.accent : "#4f419a"
  const CategoryIcon = category ? CATEGORY_ICONS[category.slug] : null
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
            {CategoryIcon ? <CategoryIcon aria-hidden="true" /> : null}
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
