import React from "react";
import styles from "../../styles/ThankYou.module.css";
import Head from "next/head";
import Image from "next/image";

const ThankYou = () => {
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
          <div></div>
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
