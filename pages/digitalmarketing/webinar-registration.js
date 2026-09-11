import React from "react";
import Form from "../../components/DigitalMarketing/webinar/Form";
import Navbar from "../../components/Navbar/Navbar";
import Image from "next/image";
import styles from "../../components/DigitalMarketing/webinar/webinar.module.css"
import Head from "next/head";

const webinar = () => {
  return (
    <div>
        <Head>
        <title>Skillslash- Webinar Registration</title>
        <meta name="robots" content="noindex,follow" />
        <meta
          name="description"
          content="Being the leading data science training provider, we give you the opportunity to work directly with industry experts on latest projects."
        />
      </Head>
      <Navbar course={false} homePage={true} redirectDM={true} />

      <div className={styles.webinar}>
        <div className={styles.left}>
          <Image
            src="/cdn/digital-marketing/insta_post_new.svg"
            width={800}
            height={400}
            alt="form"
            loading="lazy"
          />
        </div>

        <div className={styles.ryt}>
          {" "}
          <Form />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default webinar;
