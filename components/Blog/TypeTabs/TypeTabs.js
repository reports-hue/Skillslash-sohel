import {
  LuLayoutGrid,
  LuBookOpen,
  LuGraduationCap,
  LuAward,
  LuBriefcase,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu"
import types from "../../../Data/blog/types"
import styles from "./TypeTabs.module.css"

const ICONS = {
  grid: LuLayoutGrid,
  book: LuBookOpen,
  graduation: LuGraduationCap,
  award: LuAward,
  briefcase: LuBriefcase,
  trending: LuTrendingUp,
  users: LuUsers,
}

const TypeTabs = ({ active, onChange, counts = {} }) => (
  <div className={styles.tabs} role="tablist" aria-label="Article types">
    {types.map((type) => {
      const Icon = ICONS[type.icon]
      const isActive = active === type.slug
      const count = counts[type.slug]

      return (
        <button
          key={type.slug}
          type="button"
          role="tab"
          aria-selected={isActive}
          className={isActive ? styles.tabActive : styles.tab}
          onClick={() => onChange(type.slug)}
        >
          <Icon className={styles.icon} aria-hidden="true" />
          <span className={styles.label}>{type.name}</span>
          {typeof count === "number" && count > 0 ? (
            <span className={styles.count}>{count}</span>
          ) : null}
        </button>
      )
    })}
  </div>
)

export default TypeTabs
