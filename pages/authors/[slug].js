import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Blog/PostCard/PostCard";
import { SITE_URL } from "../../lib/siteConstants";
import styles from "../../styles/authorProfile.module.css";

const Footer = dynamic(() => import("../../components/Footer/Footer"));

// Dynamic import inside getServerSideProps, not a top-level import - see
// pages/blog/[slug].js for why (lib/authors.js pulls in `pg`, which has no
// browser build, and a top-level import doesn't get stripped from the
// client bundle the way a dynamic import() called from inside this
// function does).
export async function getServerSideProps({ params, res }) {
  const { listAuthors } = await import("../../lib/authors");
  const { listPublishedByAuthor } = await import("../../lib/blogPosts");

  const authors = await listAuthors();
  const author = authors.find((a) => a.slug === params.slug);
  if (!author) return { notFound: true };

  const posts = await listPublishedByAuthor(params.slug);

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");

  return {
    props: {
      author: JSON.parse(JSON.stringify(author)),
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default function AuthorProfilePage({ author, posts }) {
  const url = `${SITE_URL}/authors/${author.slug}`;
  const description =
    author.bio || `Articles by ${author.name} on the Skillslash blog.`;

  return (
    <div className={styles.page}>
      <Head>
        <title>{`${author.name} - Skillslash Blog`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.name} - Skillslash Blog`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: author.name,
                jobTitle: author.title || undefined,
                description: author.bio || undefined,
                image: author.avatarUrl
                  ? author.avatarUrl.startsWith("http")
                    ? author.avatarUrl
                    : `${SITE_URL}${author.avatarUrl}`
                  : undefined,
                sameAs: [author.twitterUrl, author.linkedinUrl].filter(Boolean),
              },
            }),
          }}
        />
      </Head>

      <Navbar />

      <div className={styles.shell}>
        <header className={styles.header}>
          {author.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={author.avatarUrl} alt={author.name} width={88} height={88} className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>{author.name.slice(0, 1).toUpperCase()}</div>
          )}
          <div>
            <h1 className={styles.name}>{author.name}</h1>
            {author.title ? <p className={styles.title}>{author.title}</p> : null}
            {author.bio ? <p className={styles.bio}>{author.bio}</p> : null}
            {(author.twitterUrl || author.linkedinUrl) && (
              <div className={styles.links}>
                {author.twitterUrl && (
                  <a href={author.twitterUrl} target="_blank" rel="noreferrer noopener">X / Twitter</a>
                )}
                {author.linkedinUrl && (
                  <a href={author.linkedinUrl} target="_blank" rel="noreferrer noopener">LinkedIn</a>
                )}
              </div>
            )}
          </div>
        </header>

        <h2 className={styles.postsHeading}>
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </h2>

        {posts.length ? (
          <div className={styles.grid}>
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={{
                  slug: post.slug,
                  title: post.title,
                  excerpt: post.excerpt,
                  category: post.categorySlug,
                  publishedAt: post.publishedAt,
                  readMinutes: post.readMinutes,
                  cover: post.coverImageUrl || "/covers/_default.svg",
                  href: `/blog/${post.slug}`,
                }}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            No published articles yet. <Link href="/">Back to the blog</Link>.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
