// Parses an uploaded Markdown (.md) file - built to the layout documented
// in public/templates/blog-import-template.md - into a partial post object
// the admin editor merges into its form state. See lib/mdImport.js for the
// actual parsing.
import formidable from "formidable";
import fs from "fs";
import { requireAdmin } from "../../../../lib/adminAuth";
import { parseMdToPost } from "../../../../lib/mdImport";

export const config = { api: { bodyParser: false } };

// Vercel's Node.js serverless functions hard-cap the request body at 4.5MB
// (not configurable higher, even on Pro) - has to stay under that on every
// deploy target. A plain-text article file is comfortably under this.
const MAX_BYTES = 4 * 1024 * 1024;

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const form = formidable({ maxFileSize: MAX_BYTES });

  let files;
  try {
    [, files] = await form.parse(req);
  } catch (err) {
    return res.status(400).json({ error: "Upload failed - file too large or unreadable." });
  }

  const file = files.file?.[0];
  if (!file) {
    return res.status(400).json({ error: "No .md file received." });
  }
  // Browsers report inconsistent (often empty, or generic
  // "application/octet-stream") MIME types for .md files, unlike .docx's
  // reliable vendor MIME type - the file extension is the only dependable
  // signal here.
  if (!/\.(md|markdown)$/i.test(file.originalFilename || "")) {
    return res.status(400).json({ error: "Please upload a .md or .markdown file." });
  }

  try {
    const text = await fs.promises.readFile(file.filepath, "utf8");
    const { post, warnings } = await parseMdToPost(text);
    if (!post.title && !post.contentHtml) {
      warnings.push("Nothing recognizable was found in the file - check it matches the sample template's layout.");
    }
    return res.status(200).json({ post, warnings });
  } catch (err) {
    console.error("markdown import failed", err);
    return res.status(500).json({ error: "Could not read that file. Is it a valid .md file?" });
  }
}
