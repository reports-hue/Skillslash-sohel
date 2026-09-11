// Creates (or resets the password of) one admin login.
// Usage: node scripts/create-admin.js you@example.com "a strong password" "Your Name"
require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const [, , email, password, name = "Admin"] = process.argv;

if (!email || !password) {
  console.error(
    'Usage: node scripts/create-admin.js you@example.com "a strong password" "Your Name"'
  );
  process.exit(1);
}
if (password.length < 10) {
  console.error("Use a password of at least 10 characters.");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

// Same rule as lib/db.js: no TLS for a database with no TLS listener -
// localhost, or the docker-compose `db` service - real TLS for anything else.
let dbHost = "";
try {
  dbHost = new URL(process.env.DATABASE_URL).hostname;
} catch {}
const isLocal = ["localhost", "127.0.0.1", "db"].includes(dbHost);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

async function main() {
  const hash = await bcrypt.hash(password, 12);
  const { rows } = await pool.query(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE
       SET password_hash = EXCLUDED.password_hash, name = EXCLUDED.name
     RETURNING id, email, name`,
    [email.trim().toLowerCase(), hash, name]
  );
  console.log("Admin ready:", rows[0]);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
