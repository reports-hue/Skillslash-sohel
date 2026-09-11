import Head from "next/head";
import AdminLayout from "../../../../components/Admin/Layout/AdminLayout";
import BlogForm from "../../../../components/Admin/Editor/BlogForm";
import { getSessionFromRequest } from "../../../../lib/adminAuth";
import { SITE_URL } from "../../../../lib/siteConstants";

// lib/blogPosts.js and lib/authors.js are imported dynamically, inside this
// function, not as top-level `import`s - both pull in `pg`, which has no
// browser build. See pages/blog/[slug].js for why a top-level import doesn't
// get stripped from the client bundle the way a dynamic import() called from
// inside getServerSideProps does.
export async function getServerSideProps({ req, params }) {
  const admin = await getSessionFromRequest(req);
  if (!admin) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return { notFound: true };

  const { getPostById, listCategories } = await import("../../../../lib/blogPosts");
  const { listAuthors } = await import("../../../../lib/authors");

  const [post, categories, authors] = await Promise.all([
    getPostById(id),
    listCategories(),
    listAuthors(),
  ]);
  if (!post) return { notFound: true };

  return {
    props: {
      admin,
      categories,
      authors,
      siteUrl: SITE_URL,
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}

export default function EditBlogPost({ admin, categories, authors, siteUrl, post }) {
  return (
    <AdminLayout admin={admin}>
      <Head>
        <title>{`Edit "${post.title}" - Skillslash CMS`}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <BlogForm initialPost={post} categories={categories} authors={authors} siteUrl={siteUrl} />
    </AdminLayout>
  );
}
