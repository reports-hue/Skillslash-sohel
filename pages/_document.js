// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

const SITE_URL = "https://skillslash.com";
const SITE_NAME = "Skillslash";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.jpg`;
const DEFAULT_DESCRIPTION =
  "Independent comparisons of data science, AI, DSA, cloud, analytics and master's degree programmes, plus career guidance for people moving into tech.";

// Walks the React element tree next/head collected for this page (arrays,
// fragments, wrapper components and all) down to the actual tag elements,
// so the checks below work regardless of how deeply a given page nests its
// <Head> content.
function flattenHead(node, out) {
  if (node === null || node === undefined || typeof node === "boolean") {
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((child) => flattenHead(child, out));
    return;
  }
  if (typeof node !== "object" || !("type" in node)) {
    return;
  }
  if (typeof node.type === "string") {
    out.push(node);
    return;
  }
  // Function component, Fragment, etc. - descend into its children.
  const children = node.props && node.props.children;
  if (children !== undefined) {
    flattenHead(children, out);
  }
}

function scriptContent(el) {
  if (el.props && el.props.dangerouslySetInnerHTML) {
    return el.props.dangerouslySetInnerHTML.__html || "";
  }
  const c = el.props && el.props.children;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return c.join("");
  return "";
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const tags = [];
    flattenHead(initialProps.head, tags);

    const hasCanonical = tags.some(
      (el) => el.type === "link" && el.props.rel === "canonical"
    );
    const hasOg = tags.some(
      (el) =>
        el.type === "meta" &&
        typeof el.props.property === "string" &&
        el.props.property.startsWith("og:")
    );
    const hasOrgSchema = tags.some(
      (el) =>
        el.type === "script" &&
        el.props.type === "application/ld+json" &&
        /"@type"\s*:\s*"(Organization|WebSite)"/.test(scriptContent(el))
    );
    const hasRobots = tags.some(
      (el) => el.type === "meta" && el.props.name === "robots"
    );

    const titleTag = tags.find((el) => el.type === "title");
    let pageTitle = "";
    if (titleTag) {
      const c = titleTag.props.children;
      pageTitle = Array.isArray(c) ? c.join("") : c || "";
    }

    const descTag = tags.find(
      (el) => el.type === "meta" && el.props.name === "description"
    );
    const pageDescription =
      (descTag && descTag.props.content) || DEFAULT_DESCRIPTION;

    // Resolved request path, not the [bracket] route pattern.
    let path = (ctx.asPath || ctx.pathname || "/").split("?")[0].split("#")[0];
    if (path.includes("[")) path = ctx.pathname || "/"; // never leak a raw pattern
    if (path !== "/" && path.endsWith("/")) path = path.slice(0, -1);
    const canonicalUrl = `${SITE_URL}${path}`;

    return {
      ...initialProps,
      hasCanonical,
      hasOg,
      hasOrgSchema,
      hasRobots,
      canonicalUrl,
      ogTitle: pageTitle || SITE_NAME,
      ogDescription: pageDescription,
    };
  }

  render() {
    const {
      hasCanonical,
      hasOg,
      hasOrgSchema,
      hasRobots,
      canonicalUrl,
      ogTitle,
      ogDescription,
    } = this.props;

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.jpg`,
      // Explicit, present-tense statement of what the site is today - the
      // same identity every page's own description and llms.txt already
      // state, now also machine-readable at the entity level. See
      // pages/about.js for the full statement this is a summary of.
      description:
        "Skillslash helps people choose the right courses, certifications and degrees to grow their career in tech, through independent, researched comparisons and guidance.",
      sameAs: [
        "https://www.facebook.com/SkillSlash-100623872122442",
        "https://twitter.com/skillslash",
        "https://www.linkedin.com/company/skillslash",
        "https://www.instagram.com/skillslash_Academy/",
        "https://www.youtube.com/c/Skillslash",
      ],
    };
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
    };

    return (
      <Html lang="en">
        <Head>
          {/* Meta Pixel now loads from _app.js via next/script (strategy
              "lazyOnload") instead of here - a raw synchronous <script> in
              _document.js's <Head> is render-blocking on every page and
              costs real Performance-score points for no benefit a pixel
              needs; deferring it until the page is idle doesn't lose any
              tracking fidelity. */}
          <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
          <link rel="apple-touch-icon" href="/favicon.jpg" />
          <meta name="theme-color" content="#4f419a" />
          <meta
            name="google-site-verification"
            content="ApFxypvGKhEs1yw6DqReZK5Sxm0WnYZFoaeciGRaWRU"
          />
          <meta name="HandheldFriendly" content="true" />
          <meta name="distribution" content="global" />
          <meta
            name="copyright"
            content="Skillslash - Project Based Experiential Learning Platform."
          />
          <meta name="language" content="English" />
          <meta name="rating" content="general" />
          <meta name="revisit-after" content="Daily" />
          <meta name="author" content="skillslash" />
          <meta name="googlebot" content="index,follow" />
          <meta name="bingbot" content="index,follow" />
          {/* Fallback generic robots directive: googlebot/bingbot above only
              cover those two crawlers by name. AI/answer-engine crawlers
              (GPTBot, ClaudeBot, PerplexityBot, etc.) and everyone else look
              for the generic "robots" tag - only added when a page hasn't
              declared its own (every CMS blog post, the admin pages, and
              the thin category pages already do, with their own
              index/noindex logic). */}
          {!hasRobots && <meta name="robots" content="index,follow" />}
          <meta name="expires" content="never" />
          <meta name="coverage" content="Worldwide" />

          {/* Fallback canonical: only when the page did not declare its own,
              so this never produces a duplicate/conflicting tag. */}
          {!hasCanonical && <link rel="canonical" href={canonicalUrl} />}

          {/* Fallback Open Graph / Twitter Card, built from the page's own
              title/description so it stays accurate per page even though
              this block is shared. Skipped if the page sets og: tags itself. */}
          {!hasOg && (
            <>
              <meta property="og:site_name" content={SITE_NAME} />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={ogTitle} />
              <meta property="og:description" content={ogDescription} />
              <meta property="og:url" content={canonicalUrl} />
              <meta property="og:image" content={DEFAULT_OG_IMAGE} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={ogTitle} />
              <meta name="twitter:description" content={ogDescription} />
              <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
            </>
          )}

          {/* Sitewide entity schema. Skipped on the handful of pages that
              already declare their own Organization/WebSite block. */}
          {!hasOrgSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([orgSchema, websiteSchema]),
              }}
            />
          )}
        </Head>
        <body>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=426060596922756&ev=PageView&noscript=1"
              alt="facebook pixel"
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
