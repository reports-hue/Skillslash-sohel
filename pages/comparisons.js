import TypeListingPage from "../components/Blog/TypeListingPage/TypeListingPage"
import { loadPostsByType } from "../lib/typePosts"

export default function Comparisons({ typePosts }) {
  return (
    <TypeListingPage
      title="Comparisons"
      kicker="Comparisons"
      description="Side-by-side course comparisons - curriculum, cost, duration and outcomes - so you can pick between programmes with real information."
      canonicalPath="/comparisons"
      typePosts={typePosts}
      emptyTitle="No comparisons here yet"
      emptyText="We are still writing for this section. Check back soon."
    />
  )
}

export async function getStaticProps() {
  const typePosts = await loadPostsByType("course-comparison")
  return { props: { typePosts }, revalidate: 60 }
}
