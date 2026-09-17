import TypeListingPage from "../components/Blog/TypeListingPage/TypeListingPage"
import { loadPostsByType } from "../lib/typePosts"

export default function CareerAdvice({ typePosts }) {
  return (
    <TypeListingPage
      title="Career Advice"
      kicker="Career Advice"
      description="Career roadmaps, hiring realities and how to break into tech - practical guidance for people moving into data, cloud and software roles."
      canonicalPath="/career-advice"
      typePosts={typePosts}
      emptyTitle="No career advice here yet"
      emptyText="We are still writing for this section. Check back soon."
    />
  )
}

export async function getStaticProps() {
  const typePosts = await loadPostsByType("career")
  return { props: { typePosts }, revalidate: 60 }
}
