// Real-time SEO/AEO/GEO/DEO/AIO health checks for a post, in the same spirit
// as Yoast/Rank Math's "SEO score" box - deterministic, rule-based, runs on
// every keystroke in the admin editor with no API calls. See
// components/Admin/Editor/SeoScorePanel.js for how this is rendered.
//
// The five dimensions checked, and what each one is actually about:
//   SEO  - classic on-page search ranking factors (Google/Bing).
//   AEO  - Answer Engine Optimization: being the thing voice assistants and
//          featured snippets quote directly (clear Q&A structure).
//   GEO  - Generative Engine Optimization: being the source an LLM (ChatGPT,
//          Perplexity, Google AI Overviews) cites when answering a question.
//   DEO  - Discovery Engine Optimization: being the kind of content platforms
//          like Google Discover proactively surface (strong image, engaging
//          title, credible author, freshness) rather than content someone
//          had to search for.
//   AIO  - AI Overviews specifically: complete, machine-readable structured
//          data (schema.org) an AI Overview panel can lift a fact from.

function stripTags(html) {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function getHeadings(html, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi");
  const out = [];
  let m;
  while ((m = re.exec(html || ""))) out.push(stripTags(m[1]));
  return out;
}

function getLinks(html) {
  const re = /<a\s+([^>]*)>([\s\S]*?)<\/a>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html || ""))) {
    const attrs = m[1];
    const href = (attrs.match(/href="([^"]*)"/) || [])[1] || "";
    const rel = (attrs.match(/rel="([^"]*)"/) || [])[1] || "";
    out.push({ href, text: stripTags(m[2]), nofollow: /nofollow/i.test(rel) });
  }
  return out;
}

function getImages(html) {
  const re = /<img\s+([^>]*)>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html || ""))) {
    const attrs = m[1];
    const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] || "";
    out.push({ alt });
  }
  return out;
}

function hasTag(html, tag) {
  return new RegExp(`<${tag}[^>]*>`, "i").test(html || "");
}

function isSameHost(url, siteUrl) {
  try {
    return new URL(url, siteUrl).hostname === new URL(siteUrl).hostname;
  } catch {
    return false;
  }
}

function check(id, category, label, status, hint) {
  return { id, category, label, status, hint };
}

// status: "good" | "warn" | "bad"
export function analyzePost(post, { siteUrl = "https://skillslash.com" } = {}) {
  const title = post.title || "";
  const metaTitle = post.metaTitle || title;
  const metaDescription = post.metaDescription || post.excerpt || "";
  const focusKeyword = (post.focusKeyword || "").trim().toLowerCase();
  const html = post.contentHtml || "";
  const text = stripTags(html);
  const textLower = text.toLowerCase();
  const words = countWords(text);
  const h2s = getHeadings(html, "h2");
  const h3s = getHeadings(html, "h3");
  const links = getLinks(html);
  const images = getImages(html);
  const keyTakeaways = post.keyTakeaways || [];
  const faqs = post.faqs || [];
  const courses = post.courses || [];
  const kw = (t) => (focusKeyword ? t.toLowerCase().includes(focusKeyword) : null);

  const checks = [];

  // ---------------- SEO ----------------
  if (!focusKeyword) {
    checks.push(check("seo-kw-set", "seo", "Focus keyword set", "warn", "Set a focus keyword so the checks below can run."));
  } else {
    checks.push(check("seo-kw-title", "seo", "Focus keyword in title", kw(title) ? "good" : "bad", kw(title) ? "Present in the title." : `"${focusKeyword}" doesn't appear in the title.`));
    checks.push(check("seo-kw-meta", "seo", "Focus keyword in meta description", kw(metaDescription) ? "good" : "warn", kw(metaDescription) ? "Present in the meta description." : "Add it to the meta description shown in Google results."));
    const first100 = text.split(/\s+/).slice(0, 100).join(" ").toLowerCase();
    checks.push(check("seo-kw-intro", "seo", "Focus keyword in the first 100 words", first100.includes(focusKeyword) ? "good" : "warn", first100.includes(focusKeyword) ? "Found early in the article." : "Mention it within the opening paragraph."));
    const inHeading = h2s.concat(h3s).some((h) => h.toLowerCase().includes(focusKeyword));
    checks.push(check("seo-kw-heading", "seo", "Focus keyword in a subheading", inHeading ? "good" : "warn", inHeading ? "At least one H2/H3 contains it." : "Work it into at least one H2 or H3."));
    const density = words ? (textLower.split(focusKeyword).length - 1) / (words / 100) : 0;
    checks.push(
      check(
        "seo-kw-density",
        "seo",
        "Keyword density",
        density === 0 ? "bad" : density > 3 ? "warn" : "good",
        density === 0 ? "It isn't used in the body at all." : density > 3 ? `${density.toFixed(1)}% - reads as keyword-stuffed above ~3%.` : `${density.toFixed(1)}% - in the healthy 0.5-3% range.`
      )
    );
    checks.push(check("seo-kw-slug", "seo", "Focus keyword in the URL slug", (post.slug || "").includes(focusKeyword.replace(/\s+/g, "-")) ? "good" : "warn", "A keyword-matching slug is a minor but easy win."));
  }

  checks.push(check("seo-title-len", "seo", "Meta title length", metaTitle.length >= 40 && metaTitle.length <= 60 ? "good" : "warn", `${metaTitle.length} characters - Google truncates past ~60.`));
  checks.push(check("seo-desc-len", "seo", "Meta description length", metaDescription.length >= 120 && metaDescription.length <= 160 ? "good" : "warn", `${metaDescription.length} characters - aim for 120-160.`));
  checks.push(check("seo-word-count", "seo", "Content length", words >= 900 ? "good" : words >= 500 ? "warn" : "bad", `${words} words - comparison/guide articles that rank well are usually 900+.`));
  checks.push(check("seo-h2-count", "seo", "Subheadings present", h2s.length >= 2 ? "good" : "warn", `${h2s.length} H2 heading(s) - break long sections up so it's scannable.`));
  const externalLinks = links.filter((l) => l.href && !isSameHost(l.href, siteUrl));
  const internalLinks = links.filter((l) => l.href && isSameHost(l.href, siteUrl));
  checks.push(check("seo-internal-links", "seo", "Internal links", internalLinks.length >= 1 ? "good" : "warn", `${internalLinks.length} link(s) to this site - helps crawlers and keeps readers on-site.`));
  checks.push(check("seo-external-links", "seo", "External links to credible sources", externalLinks.length >= 1 ? "good" : "warn", `${externalLinks.length} outbound link(s) - citing sources is a trust signal.`));
  const imagesWithoutAlt = images.filter((i) => !i.alt.trim());
  checks.push(check("seo-image-alt", "seo", "Image alt text", images.length === 0 ? "warn" : imagesWithoutAlt.length === 0 ? "good" : "bad", images.length === 0 ? "No images in the body yet." : imagesWithoutAlt.length === 0 ? "Every image has alt text." : `${imagesWithoutAlt.length} of ${images.length} image(s) are missing alt text.`));
  checks.push(check("seo-canonical", "seo", "Canonical URL", "good", post.canonicalUrl ? "Explicitly set." : "Left blank - self-canonicalises, which is correct unless this is a duplicate."));

  // ---------------- AEO (Answer Engine Optimization) ----------------
  checks.push(check("aeo-faq-count", "aeo", "FAQ coverage", faqs.length >= 3 ? "good" : faqs.length >= 1 ? "warn" : "bad", `${faqs.length} FAQ(s) - 3+ well-phrased Q&As is what usually earns a featured snippet or voice-assistant answer.`));
  const questionLike = faqs.filter((f) => /^(what|why|how|when|where|which|who|is|are|can|does|do)\b/i.test((f.question || "").trim()) || /\?\s*$/.test((f.question || "").trim()));
  checks.push(check("aeo-faq-phrasing", "aeo", "FAQ questions phrased naturally", faqs.length === 0 ? "warn" : questionLike.length === faqs.length ? "good" : "warn", faqs.length === 0 ? "Add FAQs first." : questionLike.length === faqs.length ? "All read like something a person would actually ask." : "Some FAQ questions don't read as natural questions - rephrase as \"What is...\" / \"How does...\"."));
  const answerLenOk = faqs.filter((f) => {
    const len = (f.answer || "").trim().split(/\s+/).filter(Boolean).length;
    return len >= 15 && len <= 60;
  });
  checks.push(check("aeo-answer-length", "aeo", "FAQ answers are snippet-length", faqs.length === 0 ? "warn" : answerLenOk.length === faqs.length ? "good" : "warn", "Answers around 15-60 words are the length engines tend to quote directly."));
  checks.push(check("aeo-takeaways", "aeo", "Key takeaways present", keyTakeaways.length >= 3 ? "good" : keyTakeaways.length >= 1 ? "warn" : "bad", `${keyTakeaways.length} takeaway(s) - a short, direct summary is exactly what gets lifted into a spoken answer.`));
  checks.push(check("aeo-direct-answer", "aeo", "Opens with a direct answer", (() => {
    const firstPara = text.split(/(?<=[.!?])\s+/).slice(0, 3).join(" ");
    return firstPara.length > 40;
  })() ? "good" : "warn", "The article should state its main point in the first couple of sentences, not build up to it."));

  // ---------------- GEO (Generative Engine Optimization) ----------------
  const hasNumbers = /\b\d{2,}\b/.test(text) || /[₹$€]\s?\d/.test(text);
  checks.push(check("geo-data-signals", "geo", "Concrete data/numbers cited", hasNumbers ? "good" : "warn", hasNumbers ? "Contains specific figures - LLMs favor citing sources with concrete data over vague claims." : "Add specific numbers (prices, durations, stats) an AI answer could quote."));
  checks.push(check("geo-structure", "geo", "Clear heading hierarchy", h2s.length >= 2 && h3s.length >= 0 ? "good" : "warn", "Multiple H2 sections make it easy for an LLM to extract one section as a self-contained answer."));
  const hasListOrTable = hasTag(html, "ul") || hasTag(html, "ol") || hasTag(html, "table") || courses.length > 0;
  checks.push(check("geo-lists", "geo", "Lists or comparison tables", hasListOrTable ? "good" : "warn", hasListOrTable ? "Structured lists/tables are easy for a generative engine to lift verbatim." : "Add a bulleted list or comparison table somewhere in the body."));
  checks.push(check("geo-comparison-data", "geo", "Comparable, structured course data", courses.length > 0 ? "good" : "warn", courses.length > 0 ? `${courses.length} course(s) with structured price/provider/mode data - ideal for a "compare X vs Y" AI answer.` : "If this is a comparison article, fill in the Courses Compared table."));
  const freshnessDays = post.updatedAt ? (Date.now() - new Date(post.updatedAt).getTime()) / 86400000 : null;
  checks.push(
    check(
      "geo-freshness",
      "geo",
      "Recently updated",
      freshnessDays === null ? "warn" : freshnessDays <= 180 ? "good" : "warn",
      freshnessDays === null ? "Not saved yet - freshness is tracked from the last save." : freshnessDays <= 180 ? `Updated ${Math.round(freshnessDays)} day(s) ago.` : `Last updated ${Math.round(freshnessDays)} days ago - AI answer engines weight recency, consider a refresh.`
    )
  );

  // ---------------- DEO (Discovery Engine Optimization) ----------------
  checks.push(check("deo-cover-image", "deo", "Strong cover image", post.coverImageUrl ? "good" : "bad", post.coverImageUrl ? "Set." : "Google Discover requires a large, high-quality image (1200px+) - without one this post is ineligible for Discover entirely."));
  checks.push(check("deo-title-engaging", "deo", "Title is specific and engaging", title.length >= 20 && title.length <= 70 ? "good" : "warn", `${title.length} characters - specific, benefit-led titles ("Which Career Path Fits You in 2026") outperform generic ones in Discover feeds.`));
  checks.push(check("deo-author-credibility", "deo", "Author credibility signals", post.authorId ? "good" : "warn", post.authorId ? "A named author with a bio is attached (E-E-A-T)." : "Attach a real author profile rather than leaving this on the generic default."));
  checks.push(check("deo-excerpt", "deo", "Compelling excerpt", (post.excerpt || "").length >= 50 ? "good" : "warn", "The excerpt is what shows on card previews and in Discover - make it earn the click."));

  // ---------------- AIO (AI Overviews / structured data) ----------------
  checks.push(check("aio-schema-type", "aio", "Article schema declared", post.schemaType ? "good" : "warn", `Using "${post.schemaType || "BlogPosting"}".`));
  checks.push(check("aio-faq-schema", "aio", "FAQPage schema will be generated", faqs.length > 0 ? "good" : "warn", faqs.length > 0 ? "FAQs feed a FAQPage JSON-LD block automatically." : "Add FAQs so a FAQPage schema block is generated."));
  checks.push(check("aio-course-schema", "aio", "Course/Offer schema completeness", (() => {
    if (courses.length === 0) return "warn";
    const incomplete = courses.filter((c) => !c.name || !c.price || !c.url);
    return incomplete.length === 0 ? "good" : "warn";
  })(), courses.length === 0 ? "No courses table - skip if this isn't a comparison article." : "Every course needs a name, price and URL for the Offer schema to be valid."));
  checks.push(check("aio-keywords", "aio", "Keywords declared", (post.keywords || []).length >= 3 ? "good" : "warn", `${(post.keywords || []).length} keyword(s) set - feeds the meta keywords tag and the density check above.`));
  checks.push(check("aio-og-complete", "aio", "Open Graph fields complete", (post.ogTitle || post.metaTitle) && (post.ogDescription || post.metaDescription) ? "good" : "warn", "OG title/description (or their meta fallbacks) are what an AI crawler's preview card uses."));

  const categories = ["seo", "aeo", "geo", "deo", "aio"].map((id) => {
    const items = checks.filter((c) => c.category === id);
    const points = items.reduce((sum, c) => sum + (c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0), 0);
    const score = items.length ? Math.round((points / items.length) * 100) : 0;
    return { id, score, checks: items };
  });

  const overallScore = categories.length ? Math.round(categories.reduce((s, c) => s + c.score, 0) / categories.length) : 0;

  return { overall: overallScore, categories };
}
