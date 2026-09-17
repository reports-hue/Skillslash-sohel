// The dedicated article-listing page - every hand-authored and CMS post,
// regardless of type. Split out from "/" (see pages/index.js) so the
// homepage can be a proper landing page and this can be a proper content
// hub: the Navbar's "Articles" tab now points here instead of "/".
import TypeListingPage from "../components/Blog/TypeListingPage/TypeListingPage"
import { loadAllPosts } from "../lib/typePosts"

export default function Articles({ typePosts }) {
  return (
    <TypeListingPage
      title="Articles"
      kicker="Articles"
      description="Every guide, comparison and career article Skillslash has published - course reviews, certification breakdowns and real career advice for tech."
      canonicalPath="/articles"
      typePosts={typePosts}
      emptyTitle="No articles yet"
      emptyText="Check back soon."
    />
  )
}

export async function getStaticProps() {
  const typePosts = await loadAllPosts()
  return { props: { typePosts }, revalidate: 60 }
}
