// Single shared Postgres pool. Next.js reloads API route modules on every
// request in dev, which would otherwise open a new pool (and eventually
// exhaust connections) on every hot-reload - stash it on `global` so dev and
// serverless cold starts alike reuse one pool per process.
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to your environment before using the blog CMS."
  );
}

// Managed Postgres (Neon, Supabase, RDS, etc.) requires TLS but ships a
// certificate chain `pg` doesn't always validate cleanly - a database with
// no TLS listener at all (local dev on localhost, or the `db` container
// docker-compose.yml stands up, reachable only by its compose-network
// hostname) needs no `ssl` option, and pg errors out if given one.
// docker-compose.yml's DATABASE_URL always points at host `db`; anything
// else is treated as a real, TLS-terminating managed database.
let dbHost = "";
try {
  dbHost = new URL(process.env.DATABASE_URL).hostname;
} catch {
  // Malformed connection string - let `pg` itself raise the real error
  // when it tries to connect, rather than failing differently here.
}
const isLocal = ["localhost", "127.0.0.1", "db"].includes(dbHost);

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 10,
    // Without these, a network hiccup (or - as found during the Next 16
    // upgrade - a build environment that can't reach the DB at all) leaves
    // `await pool.query()` hanging forever instead of rejecting. Every page
    // that reads CMS posts already wraps the call in try/catch and falls
    // back to "no CMS posts" on error, so a real timeout turns a frozen
    // `next build` into a normal, recoverable failure for that one call.
    connectionTimeoutMillis: 8000,
    statement_timeout: 10000,
    query_timeout: 10000,
    idleTimeoutMillis: 30000,
  });
}

const pool = global.__skillslashPgPool || createPool();
if (process.env.NODE_ENV !== "production") {
  global.__skillslashPgPool = pool;
}

export function query(text, params) {
  return pool.query(text, params);
}

export async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export default pool;
