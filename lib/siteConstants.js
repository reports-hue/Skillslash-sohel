// Plain constants only - no DB/Node-only imports. Pages import SITE_URL from
// here (not from lib/blogPosts, which pulls in `pg`) so the client bundle
// for a page never has any reason to resolve the Postgres driver.
export const SITE_URL = "https://skillslash.com";
