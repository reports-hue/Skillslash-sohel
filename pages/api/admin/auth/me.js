import { requireAdmin } from "../../../../lib/adminAuth";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;
  res.status(200).json(admin);
}
