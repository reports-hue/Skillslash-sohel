import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./blogHeader.module.css";
import { FaLinkedin } from "react-icons/fa";
import { articleSchema } from "../../../lib/articleSchema";

// The old skillslash-cdn S3 bucket no longer exists, so every image it served
// renders as a broken placeholder. Article artwork now comes from the locally
// generated cover for the post, keyed off the route.
const coverFor = (asPath) => {
  const slug = (asPath || "").split("?")[0].split("#")[0].replace(/^\/|\/$/g, "");
  return slug ? `/covers/${slug}.svg` : null;
};

// `titleAuthor` was filled with the city name on several articles, so only
// treat it as a byline when it is not just repeating the city.
const authorName = (author, titleAuthor, city) => {
  const value = (author || titleAuthor || "").trim();
  if (!value) return "";
  if (city && value.toLowerCase() === String(city).trim().toLowerCase()) return "";
  return value;
};

export default function BlogHeader({
  title,
  subTitle,
  city,
  author,
  titleAuthor,
  linkedinId,
  rytImg,
  cover,
}) {
  const { asPath } = useRouter();
  const banner = cover || coverFor(asPath) || rytImg;
  const slug = (asPath || "").split("?")[0].split("#")[0].replace(/^\/|\/$/g, "");
  const schema = articleSchema(slug);
  const name = authorName(author, titleAuthor, city);
  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <header className={styles.Blog}>
      {/* Identifies the page as an editorial article (BlogPosting) with its
          publisher, dates and breadcrumb trail - the markup answer engines
          use to attribute and date a piece of writing. */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      )}

      <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/">Blog</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>
            {subTitle} {title} {city}
          </span>
        </div>
      </nav>

      <div className={styles.blogHeader}>
        <div className={styles.titleAuthor}>
          <div>
            <span className={styles.eyebrow}>Article</span>
            <h1 className={styles.title}>
              <span className={styles.subtitle}>{subTitle}</span>
              <br className={styles.mobileBreak} /> {title}{" "}
              <span className={styles.city}>{city}</span>
            </h1>
          </div>

          {(name || linkedinId) && (
            <div className={styles.authordiv}>
              {name && (
                <>
                  <span className={styles.avatar} aria-hidden="true">
                    {initial}
                  </span>
                  <span>By {name}</span>
                </>
              )}
              {linkedinId && (
                <Link
                  href={linkedinId}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    name ? `${name} on LinkedIn` : "Author on LinkedIn"
                  }
                >
                  <FaLinkedin />
                </Link>
              )}
            </div>
          )}
        </div>

        {banner && (
          <div className={styles.rytImg}>
            <Image
              width={500}
              height={281}
              loading="lazy"
              src={banner}
              alt=""
            />
          </div>
        )}
      </div>
    </header>
  );
}
