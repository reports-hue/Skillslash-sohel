import React, { useEffect } from "react";
import styles from "../../../styles/ThankYou.module.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineDownload } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

const ThankYou = () => {
  useEffect(() => {
    const handleBack = () => {
      window.history.go(-1);
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);
  return (
    <div className={styles.main}>
      <Head>
        <title>Thank you</title>
        <meta
          name="description"
          content="Thanks for your interest in Skillslash. We have shared the details over email."
        />
        <meta name="robots" content="noindex,follow" />
      </Head>
      <section className={styles.mains}>
        <div className={styles.left}>
          <h4 className={styles.hptop}>
            <b>Thank you</b>
            <br />
            for showing interest in the program
          </h4>
          <p className={styles.Ptop}>
            We have shared the program brochure with you over an email. Have a
            great day !
          </p>
          <div className={styles.mainb}>
            <div>
              <button
                className={styles.Button}
                onClick={() => window.history.go(-1)}
              >
                <BsArrowLeftShort className="bIcons" />
                Back To Course
              </button>
            </div>
            <div>
              <Link
                href="https://drive.google.com/file/d/1ips_LqXKD1fGWKzaHUIBaLoRh2foFVJV/view?usp=drive_link"
                passHref
              >
                <button className={styles.Button}>
                  <AiOutlineDownload className="bIcons" />
                  Download Placement Report
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Image
            src="/cdn/static/web/thank-you.svg"
            alt="data-science-course"
            quality={100}
            width="500"
            height="550"
          />
        </div>
      </section>
    </div>
  );
};

export default ThankYou;
