import { requireAdmin } from "../../../../lib/adminAuth";
import { getAuthorById, updateAuthor, deleteAuthor } from "../../../../lib/authors";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const id = Number(req.query.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid author id." });
  }

  if (req.method === "GET") {
    const author = await getAuthorById(id);
    if (!author) return res.status(404).json({ error: "Not found." });
    return res.status(200).json(author);
  }

  if (req.method === "PUT") {
    const body = req.body || {};
    if (!body.name || !String(body.name).trim()) {
      return res.status(400).json({ error: "Author name is required." });
    }
    const author = await updateAuthor(id, body);
    return res.status(200).json(author);
  }

  if (req.method === "DELETE") {
    await deleteAuthor(id);
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed." });
}
