import TypeListingPage from "../components/Blog/TypeListingPage/TypeListingPage"
import { loadPostsByType } from "../lib/typePosts"

export default function Resources({ typePosts }) {
  return (
    <TypeListingPage
      title="Resources"
      kicker="Resources"
      description="Certification guides and reference material - what each credential actually tests, what it costs, and whether it's worth pursuing."
      canonicalPath="/resources"
      typePosts={typePosts}
      emptyTitle="No resources here yet"
      emptyText="We are still writing for this section. Check back soon."
    />
  )
}

export async function getStaticProps() {
  const typePosts = await loadPostsByType("certifications")
  return { props: { typePosts }, revalidate: 60 }
}
