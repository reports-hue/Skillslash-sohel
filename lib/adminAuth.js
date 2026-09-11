// Admin session tokens: signed JWTs in an httpOnly cookie, verified with
// `jose` (works in both the Node API routes and the Edge middleware runtime -
// `jsonwebtoken` does not run on Edge).
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "skillslash_admin";
const SESSION_HOURS = 12;

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_JWT_SECRET is not set (or too short). Add a random 32+ character " +
        "string to your environment before using the admin panel."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken({ id, email, name }) {
  return new SignJWT({ sub: String(id), email, name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(getSecret());
}

export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return { id: Number(payload.sub), email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}

export function sessionCookie(token) {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_HOURS * 3600}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export { COOKIE_NAME };

// `req.cookies` is only parsed for us on the NextApiRequest object that API
// routes receive - getServerSideProps gets a plain IncomingMessage, so read
// the raw Cookie header by hand to support both call sites.
function readCookie(req, name) {
  if (req.cookies?.[name]) return req.cookies[name];
  const header = req.headers?.cookie;
  if (!header) return null;
  const match = header
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

// For pages/api/admin/* route handlers: reads + verifies the cookie, or
// writes a 401 and returns null. Usage:
//   const admin = await requireAdmin(req, res); if (!admin) return;
export async function requireAdmin(req, res) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: "Not authenticated." });
    return null;
  }
  return session;
}

// For getServerSideProps in /admin pages: same check, no res side-effects -
// the caller decides what to do (usually a `redirect` return).
export async function getSessionFromRequest(req) {
  const token = readCookie(req, COOKIE_NAME);
  return verifySessionToken(token);
}
