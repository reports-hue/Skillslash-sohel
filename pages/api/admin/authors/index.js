import { requireAdmin } from "../../../../lib/adminAuth";
import { listAuthors, createAuthor } from "../../../../lib/authors";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === "GET") {
    return res.status(200).json(await listAuthors());
  }

  if (req.method === "POST") {
    const body = req.body || {};
    if (!body.name || !String(body.name).trim()) {
      return res.status(400).json({ error: "Author name is required." });
    }
    const author = await createAuthor(body);
    return res.status(201).json(author);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed." });
}
