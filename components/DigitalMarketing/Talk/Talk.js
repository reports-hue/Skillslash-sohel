import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Talk.module.css"; // Import the CSS module
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";

const Talk = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.talkHead}>
      <div className={styles.talkMain}>
        <div className={styles.backgroundImageWrapper}>
          <Image
            src={
              isMobile
                ? "https://skillslash-cdn.s3.ap-south-1.amazonaws.com/digital-marketing/mbl_talk.webp"
                : "https://skillslash-cdn.s3.ap-south-1.amazonaws.com/digital-marketing/Group+908.webp"
            }
            layout="fill"
            objectFit="cover"
            alt="bg img"
            loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <span className={styles.gotspan}>Got more questions?</span>
          <h5 className={styles.teamh5}>Talk to our team directly</h5>
          <p className={styles.para}>
            Contact us and our academic counsellor will get in touch with you
            shortly
          </p>
          <Link href="tel:+91 " className={styles.btn}>
            <FiPhoneCall className={styles.icon} /> +91
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Talk;
