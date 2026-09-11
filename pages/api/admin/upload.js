// Saves an editor/cover image and returns its URL.
//
// Two storage backends, chosen automatically:
//   - Vercel Blob, when BLOB_READ_WRITE_TOKEN is set (Vercel provisions this
//     automatically once a Blob store is attached to the project) - required
//     on Vercel, whose serverless functions have a read-only, ephemeral
//     filesystem. `public/uploads` written there vanishes on the next
//     invocation, or errors outright depending on the runtime.
//   - Local disk (public/uploads/blog), when that token is absent - the AWS
//     EC2/Docker deploy in deploy/ runs as a long-lived process with a real
//     persistent disk (see docker-compose.yml's `uploads` volume), so this
//     keeps working there unchanged.
// Every call site only depends on getting back a URL, so this is the only
// file either deploy target needs to differ in.
import crypto from "crypto";
import formidable from "formidable";
import { requireAdmin } from "../../../lib/adminAuth";

export const config = { api: { bodyParser: false } };

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const EXT = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "image/svg+xml": ".svg" };
const MAX_BYTES = 8 * 1024 * 1024;

async function saveToVercelBlob(file, name) {
  const { put } = await import("@vercel/blob");
  const fs = await import("fs");
  const buffer = await fs.promises.readFile(file.filepath);
  const blob = await put(`blog/${name}`, buffer, {
    access: "public",
    contentType: file.mimetype,
    addRandomSuffix: false,
  });
  return blob.url;
}

async function saveToLocalDisk(file, name) {
  const fs = await import("fs");
  const path = await import("path");
  const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.renameSync(file.filepath, path.join(uploadDir, name));
  return `/uploads/blog/${name}`;
}

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const form = formidable({
    maxFileSize: MAX_BYTES,
    filter: ({ mimetype }) => ALLOWED.has(mimetype),
  });

  let files;
  try {
    [, files] = await form.parse(req);
  } catch (err) {
    return res.status(400).json({ error: "Upload failed - file too large or unreadable." });
  }

  const file = files.file?.[0];
  if (!file) {
    return res.status(400).json({
      error: "No image file received (allowed: jpg, png, webp, gif, svg, max 8MB).",
    });
  }

  const ext = EXT[file.mimetype] || (await import("path")).extname(file.originalFilename || "") || ".bin";
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;

  try {
    const url = process.env.BLOB_READ_WRITE_TOKEN
      ? await saveToVercelBlob(file, name)
      : await saveToLocalDisk(file, name);
    return res.status(201).json({ url });
  } catch (err) {
    console.error("upload failed", err);
    return res.status(500).json({ error: "Could not save the image." });
  }
}
