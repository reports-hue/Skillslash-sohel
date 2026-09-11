import { requireAdmin } from "../../../../lib/adminAuth";
import { getPostById, updatePost, deletePost } from "../../../../lib/blogPosts";
import { query } from "../../../../lib/db";
import { slugify } from "../../../../lib/slug";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const id = Number(req.query.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid post id." });
  }

  if (req.method === "GET") {
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ error: "Not found." });
    return res.status(200).json(post);
  }

  if (req.method === "PUT") {
    const body = req.body || {};
    if (!body.title || !String(body.title).trim()) {
      return res.status(400).json({ error: "Title is required." });
    }
    let slug = slugify(body.slug || body.title);
    const { rows } = await query(
      "SELECT id FROM blog_posts WHERE slug = $1 AND id != $2",
      [slug, id]
    );
    if (rows.length) {
      return res
        .status(409)
        .json({ error: `The slug "${slug}" is already used by another post.` });
    }
    try {
      const post = await updatePost(id, { ...body, slug });
      return res.status(200).json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not update the post." });
    }
  }

  if (req.method === "DELETE") {
    await deletePost(id);
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed." });
}
