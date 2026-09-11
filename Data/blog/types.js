// Content types shown as the tab row on the homepage. `slug` matches the
// `type` field on a post. Tabs with no posts render an empty state.
const types = [
  { slug: "all", name: "All Articles", icon: "grid" },
  { slug: "course-comparison", name: "Course Comparisons", icon: "book" },
  { slug: "programs", name: "Programs & Master's Degrees", icon: "graduation" },
  { slug: "certifications", name: "Certifications", icon: "award" },
  { slug: "career", name: "Career Guidance", icon: "briefcase" },
  { slug: "trends", name: "Industry Trends", icon: "trending" },
  { slug: "stories", name: "Student Stories", icon: "users" },
]

export default types
