import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/Navbar/Navbar"));
const PrivacyStatement = dynamic(() =>
  import("../components/PrivacyStatement/PrivacyStatement")
);

const terms = () => {
  return (
    <>
      <Head>
        <title>Privacy statement</title>
        <meta
          name="description"
          content="Skillslash's privacy statement: what data we collect, how it is used, and how to contact us about it."
        />
      </Head>
      <Navbar course={false} />
      <PrivacyStatement />
    </>
  );
};

export default terms;
