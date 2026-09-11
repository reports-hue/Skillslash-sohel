import Head from "next/head";
import AdminLayout from "../../../components/Admin/Layout/AdminLayout";
import BlogForm from "../../../components/Admin/Editor/BlogForm";
import { getSessionFromRequest } from "../../../lib/adminAuth";
import { SITE_URL } from "../../../lib/siteConstants";

// lib/blogPosts.js, lib/authors.js and lib/siteSettings.js are imported
// dynamically, inside this function, not as top-level `import`s - all three
// pull in `pg`, which has no browser build. See pages/blog/[slug].js for why
// a top-level import doesn't get stripped from the client bundle the way a
// dynamic import() called from inside getServerSideProps does.
export async function getServerSideProps({ req }) {
  const admin = await getSessionFromRequest(req);
  if (!admin) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }

  const { listCategories } = await import("../../../lib/blogPosts");
  const { listAuthors } = await import("../../../lib/authors");
  const { getSiteSettings, applyDefaults } = await import("../../../lib/siteSettings");

  const [categories, authors, settings] = await Promise.all([
    listCategories(),
    listAuthors(),
    getSiteSettings(),
  ]);
  const defaultAuthor = authors.find((a) => a.id === settings.defaultAuthorId) || authors[0] || null;

  // Site-wide defaults (set once in /admin/settings) pre-fill a brand-new
  // post's author and SEO fields, instead of every post starting blank.
  const draft = applyDefaults({}, settings, defaultAuthor);

  return {
    props: { admin, categories, authors, settings, siteUrl: SITE_URL, initialPost: draft },
  };
}

export default function NewBlogPost({ admin, categories, authors, settings, siteUrl, initialPost }) {
  return (
    <AdminLayout admin={admin}>
      <Head>
        <title>New post - Skillslash CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <BlogForm
        initialPost={initialPost}
        categories={categories}
        authors={authors}
        settings={settings}
        siteUrl={siteUrl}
      />
    </AdminLayout>
  );
}
