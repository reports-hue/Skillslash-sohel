import { requireAdmin } from "../../../lib/adminAuth";
import { listCategories } from "../../../lib/blogPosts";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  res.status(200).json(await listCategories());
}
