import { useState } from "react"
import Link from "next/link"
import { LuMail, LuFlame, LuArrowRight, LuGraduationCap } from "react-icons/lu"
import styles from "./Sidebar.module.css"

export const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [state, setState] = useState({ status: "idle", message: "" })

  const submit = async (event) => {
    event.preventDefault()
    if (!email.trim()) return

    setState({ status: "sending", message: "" })
    try {
      const response = await fetch("/api/v1/getNewsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!response.ok) throw new Error("request failed")
      setState({ status: "done", message: "You are subscribed. Thanks!" })
      setEmail("")
    } catch (error) {
      setState({
        status: "error",
        message: "That did not go through. Please try again.",
      })
    }
  }

  return (
    <section
      id="newsletter"
      className={styles.newsletter}
      aria-labelledby="newsletter-heading"
    >
      <p className={styles.newsletterTop}>
        <LuMail className={styles.newsletterIcon} aria-hidden="true" />
        <span id="newsletter-heading" className={styles.newsletterTitle}>
          Get the Best Insights, Weekly
        </span>
      </p>
      <p className={styles.newsletterCopy}>
        Get our latest course guides, career tips and industry trends delivered
        to your inbox.
      </p>

      <form className={styles.newsletterForm} onSubmit={submit}>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email address"
          aria-label="Email address"
        />
        <button type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending" : "Subscribe"}
          <LuArrowRight aria-hidden="true" />
        </button>
      </form>

      <p
        className={
          state.status === "error" ? styles.newsletterError : styles.newsletterNote
        }
        role={state.status === "error" ? "alert" : undefined}
      >
        {state.message || "No spam. Only valuable insights."}
      </p>
    </section>
  )
}

export const PopularArticles = ({ posts }) => {
  if (!posts.length) return null

  return (
    <section className={styles.popular} aria-labelledby="popular-heading">
      <div className={styles.popularHead}>
        <h2 id="popular-heading" className={styles.popularTitle}>
          <LuFlame className={styles.flame} aria-hidden="true" />
          Popular Articles
        </h2>
        <Link href="/search" className={styles.viewAll}>
          View all &rarr;
        </Link>
      </div>
      <ol className={styles.popularList}>
        {posts.map((post, index) => (
          <li key={post.slug} className={styles.popularItem}>
            <span className={styles.rank}>{index + 1}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover || post.image || "/covers/_default.svg"}
              alt=""
              width={56}
              height={42}
              loading="lazy"
              className={styles.popularThumb}
            />
            <div>
              <Link href={post.href || `/${post.slug}`} className={styles.popularLink}>
                {post.title}
              </Link>
              {post.readMinutes ? (
                <p className={styles.popularMeta}>{post.readMinutes} min read</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export const TakeNextStep = () => (
  <section className={styles.cta} aria-labelledby="cta-heading">
    <span className={styles.ctaIcon} aria-hidden="true">
      <LuGraduationCap />
    </span>
    <h2 id="cta-heading" className={styles.ctaTitle}>
      Ready to take the next step?
    </h2>
    <p className={styles.ctaCopy}>
      Explore our expert-designed programs and start learning today.
    </p>
    <Link href="/" className={styles.ctaBtn}>
      Explore Courses <LuArrowRight aria-hidden="true" />
    </Link>
  </section>
)
