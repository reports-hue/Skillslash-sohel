import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LuBookmark, LuLinkedin, LuCopy, LuGraduationCap, LuList } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import Navbar from "../../components/Navbar/Navbar";
import { Newsletter } from "../../components/Blog/Sidebar/Sidebar";
import Toc from "../../components/Blog/PostView/Toc";
import { SITE_URL } from "../../lib/siteConstants";
import { toJsonLdGraph } from "../../lib/jsonLdGraph";
import { cmsPostSchema } from "../../lib/cmsPostSchema";
import { extractHeadings } from "../../lib/extractHeadings";
import styles from "../../components/Blog/PostView/PostView.module.css";

const Footer = dynamic(() => import("../../components/Footer/Footer"));

// Server-rendered on every request (not statically generated) so a post
// published or edited from /admin appears live immediately - the brief
// asked for "proper SSR rendering & crawling and indexing", which this
// satisfies directly: Googlebot's fetch always hits the current database
// row, with no rebuild/redeploy/ISR-revalidate window in between.
//
// lib/blogPosts.js and lib/adminAuth.js are imported dynamically, inside
// this function, not as top-level `import`s - lib/blogPosts.js pulls in
// `pg`, which has no browser build. Next strips a page's data-fetching
// function (and everything only reachable from it) out of the client
// bundle, but only when nothing outside that function references the same
// import; a top-level `import` is evaluated unconditionally regardless of
// where its bindings are used, so the client compiler would still try to
// resolve `pg` and fail. A dynamic `import()` called from inside this
// function has no such reference for the client compiler to find.
export async function getServerSideProps({ params, req, res }) {
  const { getPostBySlug, listPublishedByCategory } = await import("../../lib/blogPosts");
  const { getSessionFromRequest } = await import("../../lib/adminAuth");

  const admin = await getSessionFromRequest(req);
  // A logged-in admin can preview a draft (or an already-published post) at
  // its real URL before/without publishing; anyone else only ever gets a
  // published post here - getPostBySlug's own publishedOnly filter is the
  // enforcement point, not anything client-visible.
  const post = admin
    ? await getPostBySlug(params.slug)
    : await getPostBySlug(params.slug, { publishedOnly: true });
  if (!post) return { notFound: true };

  const isPreview = post.status !== "published";

  const related = post.categorySlug
    ? await listPublishedByCategory(post.categorySlug, { excludeId: post.id, limit: 4 })
    : [];

  if (!isPreview) {
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  } else {
    res.setHeader("Cache-Control", "no-store");
  }

  const { html: contentHtml, headings } = extractHeadings(post.contentHtml);

  return {
    props: {
      post: JSON.parse(JSON.stringify({ ...post, contentHtml })),
      related: JSON.parse(JSON.stringify(related)),
      headings,
      isPreview,
    },
  };
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage({ post, related, headings, isPreview }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const canonical = post.canonicalUrl || url;
  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt || "";
  const ogImage = post.ogImageUrl || post.coverImageUrl;
  const robotsContent = isPreview
    ? "noindex,nofollow"
    : [post.robotsIndex ? "index" : "noindex", post.robotsFollow ? "follow" : "nofollow"].join(",");
  const faqs = (post.faqs || []).filter((f) => f.question?.trim() && f.answer?.trim());
  const takeaways = (post.keyTakeaways || []).filter((t) => t?.trim());
  // Google's structured-data guidelines require markup to reflect content
  // that's actually visible on the page - an ItemList of Course/Offer JSON-LD
  // with nothing corresponding on-page risks being ignored (or treated as
  // spam). This table is that visible counterpart.
  const courses = (post.courses || []).filter((c) => c.name?.trim() && c.url?.trim());
  const schemaGraph = cmsPostSchema(post, SITE_URL);
  const cover = post.coverImageUrl || "/covers/_default.svg";

  const copyLink = () => {
    navigator.clipboard?.writeText(url).catch(() => {});
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content={robotsContent} />
        {!isPreview && <link rel="canonical" href={canonical} />}
        {post.keywords?.length ? <meta name="keywords" content={post.keywords.join(", ")} /> : null}

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.ogTitle || metaTitle} />
        <meta property="og:description" content={post.ogDescription || metaDescription} />
        <meta property="og:url" content={url} />
        {ogImage ? <meta property="og:image" content={ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`} /> : null}
        <meta name="twitter:card" content={post.twitterCard || "summary_large_image"} />
        <meta property="article:published_time" content={post.publishedAt || post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt || post.publishedAt} />

        {!isPreview && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toJsonLdGraph(schemaGraph) }}
          />
        )}
      </Head>

      <Navbar />

      {isPreview && (
        <div className={styles.previewBanner} role="status">
          Draft preview - only you can see this. Not indexed, not in the sitemap, not linked from the site.
        </div>
      )}

      <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/">Blog</Link>
          {post.categorySlug && (
            <>
              <span className={styles.breadcrumbSep}>/</span>
              <Link href={`/category/${post.categorySlug}`}>{post.categoryName}</Link>
            </>
          )}
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{post.title}</span>
        </div>
      </nav>

      <header className={styles.header}>
        <div>
          {post.categorySlug ? (
            <Link
              href={`/category/${post.categorySlug}`}
              className={styles.categoryPill}
              style={{ "--accent": post.categoryAccent || "#4f419a" }}
            >
              {post.categoryName}
            </Link>
          ) : null}
          <h1 className={styles.title}>{post.title}</h1>
          {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}

          <div className={styles.byline}>
            <div className={styles.bylineLeft}>
              {post.authorAvatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.authorAvatarUrl} alt={post.authorName} width={40} height={40} className={styles.bylineAvatar} />
              ) : (
                <div className={styles.bylineAvatarFallback}>{post.authorName.slice(0, 1).toUpperCase()}</div>
              )}
              <div className={styles.bylineText}>
                <div className={styles.bylineName}>By {post.authorName}</div>
                <div className={styles.bylineMeta}>
                  {post.authorTitle ? <span>{post.authorTitle}</span> : null}
                  <span className={styles.dot}>·</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt) || "Draft"}</time>
                  {post.readMinutes ? (
                    <>
                      <span className={styles.dot}>·</span>
                      <span>{post.readMinutes} min read</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className={styles.shareRow}>
              <button type="button" className={styles.shareBtn} onClick={copyLink} aria-label="Copy link" title="Copy link">
                <LuCopy />
              </button>
              <a
                className={styles.shareBtn}
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                <LuLinkedin />
              </a>
              <a
                className={styles.shareBtn}
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt={post.title} width={1200} height={675} loading="eager" className={styles.heroImage} />
        </div>
      </header>

      <div className={styles.layout}>
        <main className={styles.main}>
          {takeaways.length ? (
            <aside className={styles.takeaways} aria-label="Key takeaways">
              <p className={styles.takeawaysHead}>
                <span className={styles.takeawaysIcon} aria-hidden="true">
                  <LuBookmark />
                </span>
                Key Takeaways
              </p>
              <ul className={styles.takeawaysGrid}>
                {takeaways.map((t, i) => (
                  <li key={i}>
                    <span className={styles.takeawaysCheck} aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          {courses.length ? (
            <section className={styles.courses} aria-label="Courses compared">
              <h2>Courses compared</h2>
              <div className={styles.courseTableWrap}>
                <table className={styles.courseTable}>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Provider</th>
                      <th>Price</th>
                      <th>Mode</th>
                      <th aria-label="Link" />
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => (
                      <tr key={i}>
                        <td>
                          <div className={styles.courseName}>{c.name}</div>
                          {c.credentialAwarded && <div className={styles.courseCred}>{c.credentialAwarded}</div>}
                        </td>
                        <td>{c.providerName || "—"}</td>
                        <td>
                          {c.price ? `${c.priceCurrency || ""} ${Number(c.price).toLocaleString("en-IN")}`.trim() : "—"}
                        </td>
                        <td>{c.courseMode || "—"}</td>
                        <td>
                          <a href={c.url} target="_blank" rel="noopener noreferrer nofollow">
                            View course
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {faqs.length ? (
            <section className={styles.faqs} aria-label="Frequently asked questions">
              <h2>Frequently asked questions</h2>
              {faqs.map((f, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </section>
          ) : null}
        </main>

        <aside className={styles.sidebar}>
          {post.authorId && post.authorBio ? (
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarCardTitle}>About the Author</p>
              <div className={styles.authorBlock}>
                {post.authorAvatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.authorAvatarUrl} alt={post.authorName} width={52} height={52} loading="lazy" className={styles.authorAvatar} />
                ) : (
                  <div className={styles.authorAvatarFallback}>{post.authorName.slice(0, 1).toUpperCase()}</div>
                )}
                <div>
                  <p className={styles.authorName}>{post.authorName}</p>
                  {post.authorTitle ? <p className={styles.authorTitle}>{post.authorTitle}</p> : null}
                </div>
              </div>
              <p className={styles.authorBio}>{post.authorBio}</p>
              {post.authorSlug ? (
                <Link href={`/authors/${post.authorSlug}`} className={styles.authorViewAll}>
                  View all posts →
                </Link>
              ) : null}
            </div>
          ) : null}

          <Toc headings={headings} />

          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon} aria-hidden="true">
              <LuGraduationCap size={18} />
            </div>
            <p className={styles.ctaTitle}>Find the Right Course for Your Future</p>
            <p className={styles.ctaText}>
              Explore top-rated courses, compare programs and get expert guidance — all in one place.
            </p>
            <Link href="/" className={styles.ctaBtn}>
              Explore Courses →
            </Link>
          </div>

          {related.length ? (
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarCardTitle}>
                <LuList /> Related Articles
              </p>
              <div className={styles.relatedList}>
                {related.slice(0, 4).map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className={styles.relatedItem}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.coverImageUrl || "/covers/_default.svg"} alt="" width={56} height={42} loading="lazy" className={styles.relatedThumb} />
                    <div>
                      <p className={styles.relatedItemTitle}>{r.title}</p>
                      <p className={styles.relatedItemMeta}>{r.readMinutes ? `${r.readMinutes} min read` : ""}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {post.categorySlug && (
                <Link href={`/category/${post.categorySlug}`} className={styles.relatedViewAll}>
                  View all →
                </Link>
              )}
            </div>
          ) : null}

          <div className={styles.sidebarNewsletter}>
            <Newsletter />
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
