import bcrypt from "bcrypt";
import { query } from "../../../../lib/db";
import { createSessionToken, sessionCookie } from "../../../../lib/adminAuth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const { rows } = await query(
    "SELECT id, email, name, password_hash FROM admin_users WHERE email = $1",
    [String(email).trim().toLowerCase()]
  );
  const user = rows[0];

  // Same generic message either way - don't reveal whether the email exists.
  const invalid = () => res.status(401).json({ error: "Invalid email or password." });

  if (!user) return invalid();
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return invalid();

  const token = await createSessionToken(user);
  res.setHeader("Set-Cookie", sessionCookie(token));
  return res.status(200).json({ id: user.id, email: user.email, name: user.name });
}
