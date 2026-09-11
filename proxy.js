import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// A handful of old inbound/backlinked URLs differ from their live page only
// by casing. They can't be handled in next.config.js's redirects() because
// Next matches a redirect `source` case-insensitively while the page router
// itself is case-sensitive - a rule mapping the lowercase spelling to the
// correctly-cased page also matches that same destination and loops.
//
// Middleware compares the raw request path with a strict, case-sensitive
// string check instead, so a request for the correctly-cased page never
// matches a key here and is never touched - only the literal old spelling is
// redirected, once, with no risk of looping back on itself.
const CASE_REDIRECTS = {
  "/data-science-course-in-indore": "/data-science-course-in-Indore",
  "/web-development-course-in-Kolkata": "/web-development-course-in-kolkata",
};

const COOKIE_NAME = "skillslash_admin";
const PUBLIC_ADMIN_PATHS = new Set(["/admin/login"]);

// Edge runtime can't use the `pg` pool or `bcrypt` - this only checks the
// JWT is validly signed and unexpired, which is enough to gate page access.
// Every /api/admin/* route additionally calls requireAdmin() itself with the
// same check server-side, which is the real authorization boundary; this is
// a fast reject + a clean redirect-to-login for the page shell.
async function hasValidSession(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 16) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const caseDestination = CASE_REDIRECTS[pathname];
  if (caseDestination) {
    const url = request.nextUrl.clone();
    url.pathname = caseDestination;
    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/admin") && !PUBLIC_ADMIN_PATHS.has(pathname)) {
    if (!(await hasValidSession(request))) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/data-science-course-in-indore",
    "/web-development-course-in-Kolkata",
    "/admin/:path*",
  ],
};
