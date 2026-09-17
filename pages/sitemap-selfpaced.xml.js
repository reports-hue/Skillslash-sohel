// Sitemap branch: /selfpaced/* self-paced product pages, excluding the
// noindexed booking utilities and ad-campaign tracking variants. See
// pages/sitemap.xml.js for the index this hangs off of.
import { urlEntry, urlset, writeXml, iso, slugsFromDir, SITE_URL } from "../lib/sitemapCore";

// Utility/private booking pages: they carry `noindex` and have no fixed
// canonical content to rank.
const SELFPACED_EXCLUDE = new Set([
  "Project-session",
  "Project-session-dsa",
  "one-one-doubt-session",
  "one-one-doubt-session-dsa",
  "demo-ds",
]);

// "-ac1"/"-ps1" self-paced slugs are ad-campaign copies of an existing
// landing page with identical copy and title. They stay live for paid
// traffic and canonicalise to the clean slug, so only the clean slug is
// submitted here.
const CAMPAIGN_VARIANT = /-(ac1|ps1)$/;

function buildSitemap() {
  const entries = slugsFromDir("SkillsContent")
    .filter(({ slug }) => !SELFPACED_EXCLUDE.has(slug))
    .filter(({ slug }) => !CAMPAIGN_VARIANT.test(slug))
    .map(({ slug, mtime }) =>
      urlEntry(`${SITE_URL}/selfpaced/${slug}`, {
        lastmod: iso(mtime),
        priority: "0.5",
        changefreq: "monthly",
      })
    );
  return urlset(entries);
}

export default function SitemapSelfpaced() {
  return null;
}

export async function getServerSideProps({ res }) {
  writeXml(res, buildSitemap());
  return { props: {} };
}
