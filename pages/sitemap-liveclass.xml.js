// Sitemap branch: /liveclass/* pages - only the canonical (non
// ad-tracking-variant) slug. See pages/sitemap.xml.js for the index this
// hangs off of.
import { urlEntry, urlset, writeXml, iso, slugsFromDir, SITE_URL } from "../lib/sitemapCore";

// Ad-campaign tracking variants of the same landing page; only the clean
// slug goes in the sitemap so Google isn't asked to index near-duplicates.
const LIVECLASS_INCLUDE = new Set(["digital-marketing-master-course"]);

function buildSitemap() {
  const entries = slugsFromDir("DigitalMarketingContent")
    .filter(({ slug }) => LIVECLASS_INCLUDE.has(slug))
    .map(({ slug, mtime }) =>
      urlEntry(`${SITE_URL}/liveclass/${slug}`, {
        lastmod: iso(mtime),
        priority: "0.5",
        changefreq: "monthly",
      })
    );
  return urlset(entries);
}

export default function SitemapLiveclass() {
  return null;
}

export async function getServerSideProps({ res }) {
  writeXml(res, buildSitemap());
  return { props: {} };
}
