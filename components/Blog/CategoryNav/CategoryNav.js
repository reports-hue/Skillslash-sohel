import Link from "next/link"
import categories from "../../../Data/blog/categories"
import styles from "./CategoryNav.module.css"

// `only` limits the rail to the given slugs (used on the homepage, which hides
// categories that have no posts yet). Omit it to render the full taxonomy.
const CategoryNav = ({ active, only }) => {
  const shown = only
    ? categories.filter((category) => only.includes(category.slug))
    : categories

  if (!shown.length) return null

  return (
    <nav className={styles.rail} aria-label="Article categories">
      {shown.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className={active === category.slug ? styles.active : styles.link}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}

export default CategoryNav
