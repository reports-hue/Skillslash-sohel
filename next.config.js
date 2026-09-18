/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  // Produces .next/standalone - a self-contained server with only the
  // production node_modules it actually traced as needed, instead of
  // shipping the full node_modules tree into the Docker image. Cuts the
  // container image from ~1GB+ down to well under 200MB and speeds up cold
  // starts - see Dockerfile for how the standalone output is assembled.
  //
  // Skipped when building on Vercel (Vercel sets VERCEL=1 during every
  // build): Vercel does its own serverless-function packaging and expects
  // the normal per-page .next/server output with .nft.json trace files.
  // "standalone" mode replaces that with a single self-contained bundle
  // instead, and Vercel's own post-build step then fails looking for a
  // trace file that mode never produces (`ENOENT ... next-server.js.nft.json`).
  output: process.env.VERCEL ? undefined : "standalone",

  // lib/sitemapCore.js's slugsFromDir(dirName) reads content/,
  // SkillsContent/ or DigitalMarketingContent/ through a directory-name
  // *variable*, which defeats Turbopack's static analysis of the fs calls
  // inside it - it can't tell which directory a given sitemap route
  // actually needs, so its fallback is to trace and ship the *entire
  // project* into that one serverless function (flagged as a build
  // warning). Declaring each sitemap branch's own directory here keeps
  // that function's deploy small and correct on every target that relies
  // on file tracing - both Vercel's per-route functions and this
  // project's own `output: "standalone"` bundle above. pages/sitemap.xml.js
  // (the index) and sitemap-pages/blog/categories.xml.js don't call
  // slugsFromDir at all, so they need no entry here.
  outputFileTracingIncludes: {
    "/sitemap-courses.xml": ["content/**"],
    "/sitemap-selfpaced.xml": ["SkillsContent/**"],
    "/sitemap-liveclass.xml": ["DigitalMarketingContent/**"],
  },

  // Next 16 removed `next build`'s built-in ESLint pass entirely (this used
  // to be `eslint: { ignoreDuringBuilds: true }`, now an unrecognized key) -
  // linting is no longer part of the build regardless. It still runs via
  // `npm run lint` on its own; a pre-existing backlog of errors in the
  // legacy course pages (from a since-fixed broken .eslintrc) is unaffected
  // either way.

  async redirects() {
    return [
      {
        // Contact page was removed in the blog revamp with no replacement.
        source: "/Contact-us",
        destination: "/",
        permanent: true,
      },
      // No /About -> /about redirect: Next.js matches a redirect `source`
      // case-insensitively while the page router itself is case-sensitive
      // (same gotcha documented further down for the Indore casing
      // redirects), so a rule here would also catch requests to the real
      // /about page itself and 308 it to its own URL forever. Verified live
      // (curl -I /about looped 308 -> /about before this was removed).
      // The old capital-A /About now 404s, same convention already used
      // elsewhere in this file for a non-canonical casing.
      {
        // Careers and Verify a Certificate were removed - also dropped
        // from the footer (components/Footer/Footer.js).
        source: "/Career",
        destination: "/",
        permanent: true,
      },
      {
        source: "/verify-certificate",
        destination: "/",
        permanent: true,
      },
      {
        // A dated one-off webinar landing page (event long past) -
        // removed, redirected to the canonical undated registration page
        // rather than /: same page family/purpose, not a dead end.
        source: "/digitalmarketing/webinar-registration-29th-june",
        destination: "/digitalmarketing/webinar-registration",
        permanent: true,
      },
      {
        // Data Analytics was folded into Data Science.
        source: "/category/data-analytics",
        destination: "/category/data-science",
        permanent: true,
      },
      {
        // Master Degree category was removed.
        source: "/category/master-degree",
        destination: "/",
        permanent: true,
      },
      {
        // Second batch of duplicate-content pages generated from typo'd
        // filenames in content/. Like the first batch, each one's own page
        // metadata already declared the canonical URL below; these redirects
        // make that authoritative and the source files are removed.
        source: "/business-analytics-coursesss-in-mumbai",
        destination: "/business-analytics-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/data-science-cn-pune",
        destination: "/data-science-course-in-pune",
        permanent: true,
      },
      {
        source: "/data-science-course-ins-chandigarh",
        destination: "/data-science-course-in-chandigarh",
        permanent: true,
      },
      {
        source: "/data-science-course-ins-jaipur",
        destination: "/data-science-course-in-jaipur",
        permanent: true,
      },
      {
        source: "/data-science-course-tra-hyderabad",
        destination: "/data-science-course-training-hyderabad",
        permanent: true,
      },
      {
        source: "/data-science-course-training-kolkatas",
        destination: "/data-science-course-training-kolkata",
        permanent: true,
      },
      {
        source: "/data-scienced-kochi",
        destination: "/data-science-course-in-kochi",
        permanent: true,
      },
      {
        source: "/data-sscience-patna",
        destination: "/data-science-course-in-patna",
        permanent: true,
      },
      {
        source: "/data-science-in-chennai",
        destination: "/data-science-course-in-chennai",
        permanent: true,
      },
      {
        source: "/data-science-in-delhi",
        destination: "/data-science-course-in-delhi",
        permanent: true,
      },
      {
        // The following seven were duplicate-content pages generated from
        // typo'd filenames in content/ (e.g. a stray copy of the Kanpur
        // article saved as "data-scie-kanpur.json"). Each one's own page
        // metadata already self-declared the canonical URL below; these
        // redirects make that authoritative instead of just a hint, and the
        // source files have been removed so they can't be regenerated.
        source: "/data-scie-kanpur",
        destination: "/data-science-course-in-kanpur",
        permanent: true,
      },
      {
        source: "/data-scien-in-mysore",
        destination: "/data-science-course-in-mysore",
        permanent: true,
      },
      {
        source: "/data-science-corse-Indore",
        destination: "/data-science-course-in-Indore",
        permanent: true,
      },
      {
        source: "/data-science-course--mumbai",
        destination: "/data-science-course-in-mumbai",
        permanent: true,
      },
      {
        source: "/data-science-coursezzzzzz-in-bangalore",
        destination: "/data-science-course-in-bangalore",
        permanent: true,
      },
      {
        source: "/dsa-system-designsssss",
        destination: "/dsa-system-design",
        permanent: true,
      },
      {
        source: "/bsusiness-analytics-urse-ins-hyderabad",
        destination: "/business-analytics-course-in-hyderabad",
        permanent: true,
      },
      {
        source: "/ai-and-ml-program",
        destination: "/selfpaced/data-science-&-aI-bootcamp",
        permanent: true,
      },
      {
        source: "/data-science-course-in-kolkata",
        destination: "/data-science-course-training-kolkata",
        permanent: true,
      },
      {
        source: "/data-science-course-in-hyderabad",
        destination: "/data-science-course-training-hyderabad",
        permanent: true,
      },

      {
        source: "/advanced-data-science-and-ai-course-with-real-work-experience",
        destination: "/selfpaced/data-science-&-aI-bootcamp",
        permanent: true,
      },
      {
        source: "/data-science-course",
        destination: "/selfpaced/data-science-&-aI-bootcamp",
        permanent: true,
      },
      {
        source: "/data-analytics-course",
        destination: "/selfpaced/data-analytics-bootcamp",
        permanent: true,
      },
      {
        source: "/full-stack-developer-course",
        destination: "/selfpaced/dsa-system-design-bootcamp",
        permanent: true,
      },

      {
        source: "/data-structures-algorithm-&-system-design",
        destination: "/dsa-system-design",
        permanent: true,
      },

      {
        source: "/data-structures-algorithms",
        destination: "/dsa-system-design",
        permanent: true,
      },

      {
        source: "/data-structures-and-algorithms-course",
        destination: "/dsa-system-design",
        permanent: true,
      },


      {
        source: "/best-data-structures-algorithms-course",
        destination: "/dsa-system-design",
        permanent: true,
      },

      {
        source: "/data-structures-course",
        destination: "/dsa-system-design",
        permanent: true,
      },

      // --- Dead URLs that still receive external links (audited 2026-09) ---
      // Each of these returned a hard 404 while a canonical tag, an old
      // sitemap or an inbound link still pointed at it.

      // NOTE: no casing-variant redirects here. Next.js matches redirect
      // `source` case-insensitively while the page router itself is
      // case-sensitive, so a rule like
      //   /data-science-course-in-indore -> /data-science-course-in-Indore
      // also matches the destination and puts the live page into an infinite
      // redirect loop. The mixed-case URLs stay self-canonical instead and
      // their lowercase spellings keep returning 404.

      // Retired DSA slugs - sent straight to the live article rather than
      // through /data-structures-course, which is itself a redirect.
      {
        source: "/data-structures-algorithms-course",
        destination: "/dsa-system-design",
        permanent: true,
      },
      {
        source: "/data-structures-&-algorithm-system-design",
        destination: "/dsa-system-design",
        permanent: true,
      },

      {
        // /blog itself (no sub-path) has no index page - the blog's home is
        // the site root (Navbar's "Articles" tab links to "/", not "/blog";
        // see components/Navbar/Navbar.js's tabHref). Was a real 404 for
        // anyone hitting the bare legacy root URL.
        source: "/blog",
        destination: "/",
        permanent: true,
      },

      // Legacy /blog/<topic> hubs from the old WordPress blog, mapped to the
      // closest category on the new blog. Topics with no equivalent
      // (block-chain, cyber-security, iot) are deliberately left as 404s -
      // pointing them at an unrelated page would just be a soft 404.
      {
        source: "/blog/data-science",
        destination: "/category/data-science",
        permanent: true,
      },
      {
        source: "/blog/business-analytics",
        destination: "/category/data-science",
        permanent: true,
      },
      {
        source: "/blog/ai-and-machine-learning",
        destination: "/category/artificial-intelligence",
        permanent: true,
      },
      {
        source: "/blog/full-stack",
        destination: "/category/fde",
        permanent: true,
      },
      {
        source: "/blog/career",
        destination: "/Career",
        permanent: true,
      },
     
      // {
      //   source: "/blog/ai-and-machine-learning",
      //   destination:
      //     "/blog/Data-Science-Vs-Artificial-Intelligence-What's-the-Difference",
      //   permanent: true,
      // },
      // {
      //   source: "/blog/block-chain",
      //   destination: "/blog/category/block-chain",
      //   permanent: true,
      // },
      // {
      //   source: "/blog/business-analytics",
      //   destination: "/blog/category/business-analytics",
      //   permanent: true,
      // },
      // {
      //   source: "/blog/career",
      //   destination: "/blog/category/career",
      //   permanent: true,
      // },
      // {
      //   source: "/blog/cyber-security",
      //   destination: "/blog/category/cyber-security",
      //   permanent: true,
      // },
      // {
      //   source: "/blog/data-science",
      //   destination:
      //     "/blog/Data-Science-Vs-Artificial-Intelligence-What's-the-Difference",
      //   permanent: true,
      // },
      // {
      //   source: "/blog/full-stack",
      //   destination: "/full-stack-development-course",
      //   permanent: true,
      // },
      // {
      //   source: "/blog/iot",
      //   destination: "/blog/IoT-Technology",
      //   permanent: true,
      // },
      // {
      //   source: "/data-science-course-in-indore",
      //   destination: "/data-science-course-in-Indore",
      //   permanent: true,
      // },
      // {
      //   source: "/data-structures-&-algorithm-system-design",
      //   destination: "/system-design-course",
      //   permanent: true,
      // },
      // {
      //   source: "/data-structures-algorithms-course",
      //   destination: "/data-structures-course",
      //   permanent: true,
      // },
      // {
      //   source: "/web-development-course-in-Kolkata",
      //   destination: "/web-development-course-in-kolkata",
      //   permanent: true,
      // },
      // {
      //   source: "https://blog.skillslash.com/",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source: "https://blog.skillslash.com/",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source: "https://blog.skillslash.com/",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source: "https://blog.skillslash.com/",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/5-Healthcare-Data-Science-Real-Time-Projects-To-Get-You-Hired-in-2023",
      //   destination:
      //     "/blog/5-Healthcare-Data-Science-Real-Time-Projects-To-Get-You-Hired-in-2023",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/5-Healthcare-Data-Science-Real-Time-Projects-To-Get-You-Hired-in-2023",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/5-Healthcare-Data-Science-Real-Time-Projects-To-Get-You-Hired-in-2023",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/5-Healthcare-Data-Science-Real-Time-Projects-To-Get-You-Hired-in-2023",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/5-Healthcare-Data-Science-Real-Time-Projects-To-Get-You-Hired-in-2023",
      //   destination:
      //     "https://skillslash.com/full-stack-web-development-in-bangalore",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/5-ways-data-science-is-transforming-the-fashion-industry",
      //   destination:
      //     "/blog/5-ways-data-science-is-transforming-the-fashion-industry",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/5-ways-data-science-is-transforming-the-fashion-industry",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/5-ways-data-science-is-transforming-the-fashion-industry",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/5-ways-data-science-is-transforming-the-fashion-industry",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/An-Overview-of-Common-Data-Structures -Arrays-Linked-lists-and-Trees",
      //   destination:
      //     "/blog/An-Overview-of-Common-Data-Structures -Arrays-Linked-lists-and-Trees",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/An-Overview-of-Common-Data-Structures -Arrays-Linked-lists-and-Trees",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/An-Overview-of-Common-Data-Structures -Arrays-Linked-lists-and-Trees",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/An-Overview-of-Common-Data-Structures -Arrays-Linked-lists-and-Trees",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "/blog/An-Overview-of-Common-Data-Structures -Arrays-Linked-lists-and-Trees",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/Fibonacci-Hashing-and-Fastest-Hashtable",
      //   destination:
      //     "https://skillslash.com/blog/Fibonacci-Hashing-and-Fastest-Hashtable",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Fibonacci-Hashing-and-Fastest-Hashtable",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Fibonacci-Hashing-and-Fastest-Hashtable",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Fibonacci-Hashing-and-Fastest-Hashtable",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Fibonacci-Hashing-and-Fastest-Hashtable",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source: "https://blog.skillslash.com/Hotel-Booking-Application-Design",
      //   destination:
      //     "https://skillslash.com/blog/Hotel-Booking-Application-Design",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Hotel-Booking-Application-Design",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Hotel-Booking-Application-Design",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Hotel-Booking-Application-Design",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Hotel-Booking-Application-Design",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/How-to-create-a-word-search-application",
      //   destination:
      //     "https://skillslash.com/blog/How-to-create-a-word-search-application",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/How-to-create-a-word-search-application",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/How-to-create-a-word-search-application",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/How-to-create-a-word-search-application",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/How-to-create-a-word-search-application",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/Python-for-Data-Science-8-Concepts-You-May-Have-Forgotten",
      //   destination:
      //     "https://skillslash.com/blog/Python-for-Data-Science-8-Concepts-You-May-Have-Forgotten",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Python-for-Data-Science-8-Concepts-You-May-Have-Forgotten",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Python-for-Data-Science-8-Concepts-You-May-Have-Forgotten",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Python-for-Data-Science-8-Concepts-You-May-Have-Forgotten",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Python-for-Data-Science-8-Concepts-You-May-Have-Forgotten",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/Role-of-a-Data-Scientist-in-BFSI-Sector-in-2023",
      //   destination:
      //     "https://skillslash.com/blog/Role-of-a-Data-Scientist-in-BFSI-Sector-in-2023",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Role-of-a-Data-Scientist-in-BFSI-Sector-in-2023",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Role-of-a-Data-Scientist-in-BFSI-Sector-in-2023",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Role-of-a-Data-Scientist-in-BFSI-Sector-in-2023",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Role-of-a-Data-Scientist-in-BFSI-Sector-in-2023",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/Statistical_Analysis_of_Cricket_Data",
      //   destination:
      //     "https://skillslash.com/blog/Statistical_Analysis_of_Cricket_Data",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Statistical_Analysis_of_Cricket_Data",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Statistical_Analysis_of_Cricket_Data",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Statistical_Analysis_of_Cricket_Data",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Statistical_Analysis_of_Cricket_Data",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source: "https://blog.skillslash.com/Statistical_modeling",
      //   destination: "https://skillslash.com/blog/Statistical_modeling",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Statistical_modeling",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Statistical_modeling",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Statistical_modeling",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/Statistical_modeling",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/Top-place-to-learn-data-science-course-in-India",
      //   destination:
      //     "https://skillslash.com/blog/Top-place-to-learn-data-science-course-in-India",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Top-place-to-learn-data-science-course-in-India",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Top-place-to-learn-data-science-course-in-India",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Top-place-to-learn-data-science-course-in-India",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/Top-place-to-learn-data-science-course-in-India",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/a-day-in-the-life-of-a-data-science-professional",
      //   destination:
      //     "https://skillslash.com/blog/a-day-in-the-life-of-a-data-science-professional",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/a-day-in-the-life-of-a-data-science-professional",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/a-day-in-the-life-of-a-data-science-professional",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/a-day-in-the-life-of-a-data-science-professional",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/a-day-in-the-life-of-a-data-science-professional",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/best-data-science-course-in-bangalore",
      //   destination:
      //     "https://skillslash.com/blog/best-data-science-course-in-bangalore",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/best-data-science-course-in-bangalore",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/best-data-science-course-in-bangalore",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/best-data-science-course-in-bangalore",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/best-data-science-course-in-bangalore",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/big-data-case-study-what-makes-spotify-successful",
      //   destination:
      //     "https://skillslash.com/blog/big-data-case-study-what-makes-spotify-successful",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/big-data-case-study-what-makes-spotify-successful",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/big-data-case-study-what-makes-spotify-successful",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/big-data-case-study-what-makes-spotify-successful",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/big-data-case-study-what-makes-spotify-successful",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source: "https://blog.skillslash.com/chatGPT-bradAI-data-science",
      //   destination: "https://skillslash.com/blog/chatGPT-bradAI-data-science",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/chatGPT-bradAI-data-science",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/chatGPT-bradAI-data-science",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/chatGPT-bradAI-data-science",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source: "https://skillslash.com/blog/chatGPT-bradAI-data-science",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://blog.skillslash.com/college-enquiry-chat-bot-with-data-science",
      //   destination:
      //     "https://skillslash.com/blog/college-enquiry-chat-bot-with-data-science",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/college-enquiry-chat-bot-with-data-science",
      //   destination: "https://skillslash.com/blog",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/college-enquiry-chat-bot-with-data-science",
      //   destination: "https://skillslash.com/About",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/college-enquiry-chat-bot-with-data-science",
      //   destination: "https://skillslash.com/Contact-us",
      //   permanent: true,
      // },
      // {
      //   source:
      //     "https://skillslash.com/blog/college-enquiry-chat-bot-with-data-science",
      //   destination: "https://skillslash.com/event",
      //   permanent: true,
      // },
    ];
  },

  images: {
    // The skillslash-cdn bucket was deleted, so every legacy/marketing page
    // ships its imagery from /public locally. CMS blog cover images are the
    // one exception: pages/api/admin/upload.js stores them on Vercel Blob
    // (public.blob.vercel-storage.com) when deployed there, and
    // components/Blog/PostCard/PostCard.js renders that URL straight into
    // next/image. Without this, the first cover image an admin uploads on
    // Vercel 500s with "hostname is not configured under images" - this
    // never surfaces locally/on Docker, where uploads stay on local disk.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Real YouTube video thumbnails for the testimonial cards
      // (components/VideoTestimonial/VideoTestimonialSwiper.js), fetched by
      // video id instead of shipping a static placeholder graphic per review.
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    minimumCacheTTL: 120,
    // Next 16 requires every `quality` value a component actually passes to
    // <Image> to be pre-declared here (undeclared values now warn, and are
    // rejected outright in a future version) - 75 is the implicit default
    // for every <Image> that doesn't set `quality` at all; 40/50/100 are the
    // explicit values used across the legacy course pages.
    qualities: [40, 50, 75, 100],
    // Article covers in /public/covers are first-party SVGs we generate.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer(nextConfig);
// export async function redirects() {
//   return [
//     {
//       source: "/ai-and-ml-program",
//       destination:
//         "/advanced-data-science-and-ai-course-with-real-work-experience",
//       permanent: true,
//     },
//     {
//       source: "/data-science-course-in-kolkata",
//       destination: "/data-science-course-training-kolkata",
//       permanent: true,
//     },
//     {
//       source: "/data-science-course-in-hyderabad",
//       destination: "/data-science-course-training-hyderabad",
//       permanent: true,
//     },
//   ];
// }
module.exports = nextConfig;
