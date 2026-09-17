import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const TermsOfUse = dynamic(() => import("../components/TermsOfUse/TermsOfUse"));

const terms = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Skillslash</title>
        <meta
          name="description"
          content="The terms and conditions governing use of the Skillslash website and services."
        />
        <link rel="canonical" href="https://skillslash.com/terms-of-use" />
      </Head>
      <TermsOfUse />
    </>
  );
};

export default terms;
