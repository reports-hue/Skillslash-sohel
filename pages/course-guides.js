import TypeListingPage from "../components/Blog/TypeListingPage/TypeListingPage"
import { loadPostsByType } from "../lib/typePosts"

export default function CourseGuides({ typePosts }) {
  return (
    <TypeListingPage
      title="Course Guides"
      kicker="Course Guides"
      description="In-depth guides to bootcamps, certifications and master's programmes - what each one actually covers, what it costs, and who it's for."
      canonicalPath="/course-guides"
      typePosts={typePosts}
      emptyTitle="No course guides here yet"
      emptyText="We are still writing for this section. Check back soon."
    />
  )
}

export async function getStaticProps() {
  const typePosts = await loadPostsByType("programs")
  return { props: { typePosts }, revalidate: 60 }
}
