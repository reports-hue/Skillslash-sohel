import { LuVideo } from "react-icons/lu";
import styles from "./WebinarPromo.module.css";

// Replaces what used to be an <Image> pointed at insta_post_new.svg /
// 29th_webinar.svg / third_time.svg - all three turned out to be
// auto-generated placeholder art (a flat gradient rectangle with the
// filename as its own visible text, not a real event flyer), same as
// every other asset under /cdn/digital-marketing/. A plain, honest promo
// panel instead of a fake flyer graphic - no specific claims invented to
// replace what the fake image implied.
const WebinarPromo = () => (
  <div className={styles.promo}>
    <LuVideo className={styles.icon} aria-hidden="true" />
    <p className={styles.eyebrow}>Live Webinar</p>
    <h1 className={styles.title}>Digital Marketing Masterclass</h1>
    <p className={styles.desc}>
      Register below to save your spot - session details are confirmed by email.
    </p>
  </div>
);

export default WebinarPromo;
