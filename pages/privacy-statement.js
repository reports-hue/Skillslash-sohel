import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const PrivacyStatement = dynamic(() =>
  import("../components/PrivacyStatement/PrivacyStatement")
);

const terms = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Skillslash</title>
        <meta
          name="description"
          content="What data Skillslash collects, how it is used, and how to contact us about it."
        />
        <link rel="canonical" href="https://skillslash.com/privacy-statement" />
      </Head>
      <PrivacyStatement />
    </>
  );
};

export default terms;
