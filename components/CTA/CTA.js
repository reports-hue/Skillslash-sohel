import React from "react";
import styles from "./Cta.module.css";
import Image from "next/image";

const CTA = ({ redirectDSA }) => {
  return (
    <div className={styles.CtaWrapper}>
      <div className={styles.firstCta}>
        <Image
          src="/cdn/NewDatascience/Header/Skillslash-New-Logo-white.svg"
          alt="Getting confused ask directly to a expert"
          style={{ objectFit: "contain" }}
          width={137}
          height={200}
          loading="lazy"
        />
      </div>
      <div className={styles.leftCta}>
        <h4 style={{ color: "white" }}>
          Lost in the Learning Maze? Let's Chat!
        </h4>
        <p className={styles.pTop}>
          Having difficulties? Connect with our counselor to discover more about
          this course.
        </p>
        <a href="/Contact-us">
          <button>
            <Image
              src="/cdn/NewDatascience/Header/chat-with-us.svg"
              alt=""
              width={30}
              height={30}
            />
            Chat With Us
          </button>
        </a>
      </div>
      <div className={styles.rightCta}>
        <div className={styles.imgwrap}>
          <Image
            src="/cdn/NewDatascience/call-icon.svg"
            alt="Getting confused ask directly to a expert"
            style={{ objectFit: "contain" }}
            width={235}
            height={250}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;
