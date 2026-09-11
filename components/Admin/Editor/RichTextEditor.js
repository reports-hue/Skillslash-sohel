import { useEffect, useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  LuBold, LuItalic, LuUnderline, LuStrikethrough, LuHeading2, LuHeading3,
  LuHeading4, LuList, LuListOrdered, LuQuote, LuCode, LuLink, LuImage,
  LuTable, LuUndo2, LuRedo2, LuAlignLeft, LuAlignCenter, LuAlignRight,
  LuMinus, LuImagePlus,
} from "react-icons/lu";
import styles from "./RichTextEditor.module.css";

// Stock Link/Image don't expose `rel`/`target` (link) or `alt` (image) as
// editable per-instance attributes - only as fixed extension-wide defaults.
// Both are re-declared here so each link's dofollow/nofollow state and each
// image's alt text can be set individually from the popovers below.
const Link = TiptapLink.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      target: { default: "_blank" },
      rel: { default: "noopener noreferrer" },
    };
  },
});

const Image = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alt: { default: "" },
    };
  },
});

async function uploadImage(file) {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Image upload failed.");
  }
  const { url } = await res.json();
  return url;
}

function ToolbarButton({ onClick, active, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`${styles.tBtn} ${active ? styles.tBtnActive : ""}`}
    >
      {children}
    </button>
  );
}

const NOFOLLOW = "nofollow";

function relToNofollow(rel) {
  return (rel || "").split(/\s+/).includes(NOFOLLOW);
}
function nofollowToRel(nofollow) {
  return nofollow ? `noopener noreferrer ${NOFOLLOW}` : "noopener noreferrer";
}

export default function RichTextEditor({ value, onChange, wordCountRef }) {
  const [linkPanel, setLinkPanel] = useState(null); // { url, nofollow, newTab } | null
  const [imagePanel, setImagePanel] = useState(null); // { mode: "insert"|"edit", file?, alt } | null

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Link,
      Image,
      Placeholder.configure({ placeholder: "Start writing the article..." }),
      CharacterCount,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
      if (wordCountRef) wordCountRef.current = e.storage.characterCount.words();
    },
    immediatelyRender: false,
  });

  // Keep the editor in sync if the parent resets `value` (e.g. loading an
  // existing post after the editor has already mounted).
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const openLinkPanel = useCallback(() => {
    if (!editor) return;
    const attrs = editor.getAttributes("link");
    setLinkPanel({
      url: attrs.href || "",
      nofollow: relToNofollow(attrs.rel),
      newTab: attrs.target !== "_self",
    });
  }, [editor]);

  const applyLink = () => {
    if (!editor || !linkPanel) return;
    const url = linkPanel.url.trim();
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: url,
          rel: nofollowToRel(linkPanel.nofollow),
          target: linkPanel.newTab ? "_blank" : "_self",
        })
        .run();
    }
    setLinkPanel(null);
  };

  const addImage = useCallback(() => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      // Alt text drives image SEO and screen-reader access - ask for it up
      // front rather than defaulting to the filename.
      setImagePanel({ mode: "insert", file, alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") });
    };
    input.click();
  }, [editor]);

  const openEditAlt = useCallback(() => {
    if (!editor) return;
    setImagePanel({ mode: "edit", alt: editor.getAttributes("image").alt || "" });
  }, [editor]);

  const applyImagePanel = async () => {
    if (!editor || !imagePanel) return;
    if (imagePanel.mode === "edit") {
      editor.chain().focus().updateAttributes("image", { alt: imagePanel.alt }).run();
      setImagePanel(null);
      return;
    }
    try {
      const url = await uploadImage(imagePanel.file);
      editor.chain().focus().setImage({ src: url, alt: imagePanel.alt }).run();
    } catch (err) {
      window.alert(err.message);
    } finally {
      setImagePanel(null);
    }
  };

  if (!editor) return <div className={styles.wrap} />;

  const words = editor.storage.characterCount.words();
  const chars = editor.storage.characterCount.characters();

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar} role="toolbar" aria-label="Formatting">
        <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><LuUndo2 /></ToolbarButton>
        <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><LuRedo2 /></ToolbarButton>
        <span className={styles.divider} />
        <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><LuBold /></ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><LuItalic /></ToolbarButton>
        <ToolbarButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><LuUnderline /></ToolbarButton>
        <ToolbarButton label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><LuStrikethrough /></ToolbarButton>
        <span className={styles.divider} />
        <ToolbarButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><LuHeading2 /></ToolbarButton>
        <ToolbarButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><LuHeading3 /></ToolbarButton>
        <ToolbarButton label="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}><LuHeading4 /></ToolbarButton>
        <span className={styles.divider} />
        <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><LuList /></ToolbarButton>
        <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><LuListOrdered /></ToolbarButton>
        <ToolbarButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><LuQuote /></ToolbarButton>
        <ToolbarButton label="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><LuCode /></ToolbarButton>
        <span className={styles.divider} />
        <ToolbarButton label="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><LuAlignLeft /></ToolbarButton>
        <ToolbarButton label="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><LuAlignCenter /></ToolbarButton>
        <ToolbarButton label="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><LuAlignRight /></ToolbarButton>
        <span className={styles.divider} />
        <ToolbarButton label="Link" active={editor.isActive("link")} onClick={openLinkPanel}><LuLink /></ToolbarButton>
        <ToolbarButton label="Insert image" onClick={addImage}><LuImage /></ToolbarButton>
        {editor.isActive("image") && (
          <ToolbarButton label="Edit image alt text" onClick={openEditAlt}><LuImagePlus /></ToolbarButton>
        )}
        <ToolbarButton
          label="Table"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <LuTable />
        </ToolbarButton>
        <ToolbarButton label="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}><LuMinus /></ToolbarButton>
      </div>

      {linkPanel && (
        <div className={styles.panel}>
          <input
            className={styles.panelInput}
            placeholder="https://..."
            value={linkPanel.url}
            autoFocus
            onChange={(e) => setLinkPanel({ ...linkPanel, url: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && applyLink()}
          />
          <label className={styles.panelCheck}>
            <input
              type="checkbox"
              checked={linkPanel.nofollow}
              onChange={(e) => setLinkPanel({ ...linkPanel, nofollow: e.target.checked })}
            />
            nofollow
          </label>
          <label className={styles.panelCheck}>
            <input
              type="checkbox"
              checked={linkPanel.newTab}
              onChange={(e) => setLinkPanel({ ...linkPanel, newTab: e.target.checked })}
            />
            new tab
          </label>
          <button type="button" className={styles.panelBtn} onClick={applyLink}>
            {linkPanel.url.trim() ? "Apply" : "Remove link"}
          </button>
          <button type="button" className={styles.panelBtnGhost} onClick={() => setLinkPanel(null)}>
            Cancel
          </button>
        </div>
      )}

      {imagePanel && (
        <div className={styles.panel}>
          <input
            className={styles.panelInput}
            placeholder="Describe this image (alt text)"
            value={imagePanel.alt}
            autoFocus
            onChange={(e) => setImagePanel({ ...imagePanel, alt: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && applyImagePanel()}
          />
          <button type="button" className={styles.panelBtn} onClick={applyImagePanel}>
            {imagePanel.mode === "edit" ? "Save alt text" : "Insert image"}
          </button>
          <button type="button" className={styles.panelBtnGhost} onClick={() => setImagePanel(null)}>
            Cancel
          </button>
        </div>
      )}

      <EditorContent editor={editor} className={styles.content} />

      <div className={styles.footer}>
        <span>{words} words</span>
        <span>{chars} characters</span>
        <span>{Math.max(1, Math.round(words / 200))} min read</span>
      </div>
    </div>
  );
}
