// Parses an uploaded Word (.docx) file - built to the layout documented in
// public/templates/blog-import-template.docx - into a partial post object
// the admin editor merges into its form state. See lib/docxImport.js for
// the actual parsing.
import formidable from "formidable";
import fs from "fs";
import { requireAdmin } from "../../../../lib/adminAuth";
import { parseDocxToPost } from "../../../../lib/docxImport";

export const config = { api: { bodyParser: false } };

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
// Vercel's Node.js serverless functions hard-cap the request body at 4.5MB
// (not configurable higher, even on Pro) - has to stay under that on every
// deploy target. A text-and-tables article doc (no images - those are
// stripped anyway, see lib/docxImport.js) is comfortably under this.
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
    return res.status(400).json({ error: "No .docx file received." });
  }
  if (file.mimetype !== DOCX_MIME && !/\.docx$/i.test(file.originalFilename || "")) {
    return res.status(400).json({ error: "Please upload a .docx file (Word, not .doc or .pdf)." });
  }

  try {
    const buffer = await fs.promises.readFile(file.filepath);
    const { post, warnings } = await parseDocxToPost(buffer);
    if (!post.title && !post.contentHtml) {
      warnings.push("Nothing recognizable was found in the document - check it matches the sample template's layout.");
    }
    return res.status(200).json({ post, warnings });
  } catch (err) {
    console.error("docx import failed", err);
    return res.status(500).json({ error: "Could not read that file. Is it a valid .docx?" });
  }
}
