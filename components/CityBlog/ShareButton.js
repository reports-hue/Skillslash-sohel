import { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaRegCopy, FaCheck } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./shareButtons.module.css";

const ShareButtons = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const openShare = (shareUrl) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleFacebookShare = () =>
    openShare(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    );

  const handleLinkedInShare = () =>
    openShare(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}`
    );

  const handleTwitterShare = () =>
    openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      // Clipboard is blocked outside a secure context - fall back to a prompt
      // so the reader can still copy the link by hand.
      window.prompt("Copy this link", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className={styles.row}>
      <span className={styles.label}>Share</span>

      <button
        type="button"
        onClick={handleFacebookShare}
        aria-label="Share on Facebook"
        className={`${styles.btn} ${styles.facebook}`}
      >
        <FaFacebookF aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={handleLinkedInShare}
        aria-label="Share on LinkedIn"
        className={`${styles.btn} ${styles.linkedin}`}
      >
        <FaLinkedinIn aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={handleTwitterShare}
        aria-label="Share on X"
        className={`${styles.btn} ${styles.x}`}
      >
        <FaXTwitter aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        aria-label={copied ? "Link copied" : "Copy link to this article"}
        className={`${styles.btn} ${styles.copy} ${
          copied ? styles.copied : ""
        }`}
      >
        {copied ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
      </button>

      {copied && (
        <span className={styles.status} role="status">
          Link copied
        </span>
      )}
    </div>
  );
};

export default ShareButtons;
