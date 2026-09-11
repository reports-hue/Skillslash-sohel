import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/Navbar/Navbar"));
const TermsOfUse = dynamic(() => import("../components/TermsOfUse/TermsOfUse"));

const terms = () => {
  return (
    <>
      <Head>
        <title>Terms and Condition</title>
        <meta
          name="description"
          content="The terms and conditions governing use of the Skillslash website and courses."
        />
      </Head>
      <Navbar course={false} />
      <TermsOfUse />
    </>
  );
};

export default terms;
