import { requireAdmin } from "../../../lib/adminAuth";
import { getSiteSettings, updateSiteSettings } from "../../../lib/siteSettings";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === "GET") {
    return res.status(200).json(await getSiteSettings());
  }

  if (req.method === "PUT") {
    const settings = await updateSiteSettings(req.body || {});
    return res.status(200).json(settings);
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method not allowed." });
}
