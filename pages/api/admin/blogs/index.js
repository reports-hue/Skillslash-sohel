import { requireAdmin } from "../../../../lib/adminAuth";
import { listPosts, createPost } from "../../../../lib/blogPosts";
import { uniqueSlug } from "../../../../lib/slug";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === "GET") {
    const { status } = req.query;
    const posts = await listPosts(status ? { status } : {});
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const body = req.body || {};
    if (!body.title || !String(body.title).trim()) {
      return res.status(400).json({ error: "Title is required." });
    }
    const slug = await uniqueSlug(body.slug || body.title);
    try {
      const post = await createPost({ ...body, slug });
      return res.status(201).json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not create the post." });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed." });
}
