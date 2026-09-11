import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import styles from "../styles/ytOffer.module.css";
import ContactForm from "../components/ContactusForm/ContactusForm";
import Footer from "../components/Footer/Footer";

const ytOffer = () => {
  return (
    <div>
      <Head>
        <title>Register for the Offer - Skillslash</title>
        <meta
          name="description"
          content="Fill the form to register and claim this offer from Skillslash."
        />
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Navbar course={false} />
      <div className={styles.divWrap}>
        <div className={styles.formWrapDiv}>
          <h1 className={styles.heading}>Fill the form to Register</h1>
          <ContactForm coupon={true} />
        </div>
        <div className={styles.rightWrap}>
          <div className="bgWrap">
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/cdn/static/web/yt-offfer-page.svg"
              alt="yt-offer"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ytOffer;
