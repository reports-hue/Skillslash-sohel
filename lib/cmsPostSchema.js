// JSON-LD for a CMS-authored post (pages/blog/[slug].js). Mirrors the shape
// lib/articleSchema.js builds for the file-based legacy articles, plus an
// FAQPage block and an AI-overview-oriented "key takeaways" summary - both
// driven by fields an editor fills in from the admin panel.
const SITE_NAME = "Skillslash";

// A linked author with a bio is credited as a real Person (better for E-E-A-T
// and AI-overview attribution); a post with only a free-text byline and no
// profile falls back to crediting the Organization, same as the legacy
// articles - naming an unverified person is worse than naming the publisher.
function authorEntity(post, siteUrl) {
  if (post.authorId && post.authorBio) {
    const person = { "@type": "Person", name: post.authorName };
    if (post.authorTitle) person.jobTitle = post.authorTitle;
    if (post.authorBio) person.description = post.authorBio;
    const sameAs = [post.authorTwitterUrl, post.authorLinkedinUrl].filter(Boolean);
    if (sameAs.length) person.sameAs = sameAs;
    if (post.authorAvatarUrl) {
      person.image = post.authorAvatarUrl.startsWith("http")
        ? post.authorAvatarUrl
        : `${siteUrl}${post.authorAvatarUrl}`;
    }
    return person;
  }
  return { "@type": "Organization", name: post.authorName || SITE_NAME, url: siteUrl };
}

// Builds an ItemList of Course/Offer/CourseInstance blocks - the same
// pattern already used on other properties in this account (a Course entity
// with a provider Organization, an Offer for price/availability, and a
// CourseInstance for schedule/mode). Editors fill in one structured row per
// course from the "Courses compared" panel instead of hand-writing JSON, so
// every comparison article can carry this markup consistently.
function courseListSchema(courses, listName) {
  const rows = (courses || []).filter((c) => c.name?.trim() && c.url?.trim());
  if (!rows.length) return null;

  return {
    "@type": "ItemList",
    name: listName || "Course List",
    itemListElement: rows.map((c, i) => {
      const course = {
        "@type": "Course",
        name: c.name,
        url: c.url,
      };
      if (c.description) course.description = c.description;
      if (c.providerName) {
        course.provider = { "@type": "Organization", name: c.providerName };
        if (c.providerUrl) course.provider.sameAs = c.providerUrl;
      }
      if (c.credentialAwarded) course.educationalCredentialAwarded = c.credentialAwarded;

      if (c.price || c.availability) {
        course.offers = {
          "@type": "Offer",
          url: c.url,
        };
        if (c.price) course.offers.price = String(c.price);
        if (c.priceCurrency) course.offers.priceCurrency = c.priceCurrency;
        if (c.availability) course.offers.availability = `https://schema.org/${c.availability}`;
        if (c.category) course.offers.category = c.category;
      }

      if (c.startDate || c.endDate || c.courseMode || c.courseWorkload) {
        course.hasCourseInstance = { "@type": "CourseInstance" };
        if (c.startDate) course.hasCourseInstance.startDate = c.startDate;
        if (c.endDate) course.hasCourseInstance.endDate = c.endDate;
        if (c.courseMode) course.hasCourseInstance.courseMode = c.courseMode;
        if (c.courseWorkload) course.hasCourseInstance.courseWorkload = c.courseWorkload;
      }

      return { "@type": "ListItem", position: i + 1, item: course };
    }),
  };
}

export function cmsPostSchema(post, siteUrl) {
  const url = `${siteUrl}/blog/${post.slug}`;
  const image = post.ogImageUrl || post.coverImageUrl;

  const blogPosting = {
    "@type": post.schemaType || "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    url,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: authorEntity(post, siteUrl),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.png` },
    },
  };
  if (image) blogPosting.image = image.startsWith("http") ? image : `${siteUrl}${image}`;
  if (post.categoryName) blogPosting.articleSection = post.categoryName;
  if (post.readMinutes) blogPosting.timeRequired = `PT${post.readMinutes}M`;
  if (post.keywords?.length) blogPosting.keywords = post.keywords.join(", ");

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/` },
    ],
  };
  if (post.categorySlug) {
    breadcrumb.itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: post.categoryName,
      item: `${siteUrl}/category/${post.categorySlug}`,
    });
  }

  const graph = { BlogPosting: blogPosting, BreadcrumbList: breadcrumb };

  const faqs = (post.faqs || []).filter((f) => f.question?.trim() && f.answer?.trim());
  if (faqs.length) {
    graph.FAQPage = {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
  }

  const courseList = courseListSchema(post.courses, `Courses compared in ${post.title}`);
  if (courseList) {
    graph.ItemList = courseList;
    // Give search engines a route from the article to the comparison list it
    // contains - the same relation an ItemList embedded inline would imply.
    blogPosting.mainEntity = { "@id": `${url}#course-list` };
    courseList["@id"] = `${url}#course-list`;
  }

  if (post.structuredDataOverride) {
    Object.assign(graph, post.structuredDataOverride);
  }

  return graph;
}
