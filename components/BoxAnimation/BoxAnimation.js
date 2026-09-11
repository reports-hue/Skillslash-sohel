import React, { useState, useEffect } from "react";
import AnimateHeading from "../Animation/Text/AnimateHeading";
import styles from "./BoxAnimation.module.css";
import Image from "next/image";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
const BoxAnimation = () => {
  const [animateHeader, setAnimateHeader] = useState(false);
  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 640) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);
  return (
    <div className={styles.Wrapper}>
      {animateHeader ? <AnimateHeading /> : ""}

      <div className={styles.contentGrid}>
        <div className={styles.first}>
          <ul className={styles.iconWrap}>
            <li>
              <Image
                src="/cdn/static/web/New-UI/acquire-expertise-icon.svg"
                height={40}
                width={40}
                alt="acquire-expertise"
              />
            </li>
          </ul>
          <div className={styles.contentWrap}>
            <h5>Acquire Expertise</h5>
            <p>
              Attend live sessions led by industry veterans for an immersive
              experience that builds your expertise.
            </p>
          </div>
        </div>
        <div className={styles.arrowWrap}>
          <Image
            src="/cdn/static/web/New-UI/arrow-icon.svg"
            height={60}
            width={60}
            alt="acquire-expertise"
          />
        </div>
        <div className={styles.second}>
          <ul className={styles.iconWrap}>
            <li>
              <Image
                src="/cdn/static/web/New-UI/relevent-exp-icon.svg"
                height={40}
                width={40}
                alt="relevant-expertise"
              />
            </li>
          </ul>
          <div className={styles.contentWrap}>
            <h5>Build Relevant Experience</h5>
            <p>
              Mentors help you select the domain and guide you through live
              projects to build relevant expertise.
            </p>
          </div>
        </div>
        <div className={styles.arrowWrap1}>
          <Image
            src="/cdn/static/web/New-UI/arrow-icon.svg"
            height={60}
            width={60}
            alt="acquire-expertise"
          />
        </div>
        <div className={styles.third}>
          <ul className={styles.iconWrap}>
            <li>
              <Image
                src="/cdn/static/web/New-UI/tick-icon.svg"
                height={40}
                width={40}
                alt="tick-expertise"
              />
            </li>
          </ul>
          <div className={styles.contentWrap}>
            <h5> Get Hired</h5>
            <p>
              Build confidence to ace major interviews by attending sessions and
              working on real-work projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxAnimation;
