import posts from "../Data/blog/posts";
import { categoryBySlug } from "../Data/blog/categories";

const SITE_URL = "https://skillslash.com";
const SITE_NAME = "Skillslash";

// The article pages carry Product/Course/HowTo markup about the programmes
// they review, but nothing that identifies the page itself as an editorial
// article. BlogPosting is the type search engines and answer engines look
// for to attribute a piece of writing to a publisher and a date, so it is
// built here from the same registry that drives the blog listings.
//
// Authorship is credited to the organisation rather than a person: the
// per-article byline field is unreliable (several articles have a city name
// in it), and naming the wrong author is worse than crediting the publisher.
export function articleSchema(slug) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const category = categoryBySlug(post.category);
  const url = `${SITE_URL}/${post.slug}`;
  const image = post.cover ? `${SITE_URL}${post.cover}` : undefined;

  const blogPosting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.jpg` },
    },
  };
  if (image) blogPosting.image = image;
  if (category) blogPosting.articleSection = category.name;
  if (post.readMinutes) blogPosting.timeRequired = `PT${post.readMinutes}M`;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    ],
  };
  if (category) {
    breadcrumb.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: category.name,
      item: `${SITE_URL}/category/${category.slug}`,
    });
  }
  breadcrumb.itemListElement.push({
    "@type": "ListItem",
    position: breadcrumb.itemListElement.length + 1,
    name: post.title,
    item: url,
  });

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [blogPosting, breadcrumb],
  });
}
