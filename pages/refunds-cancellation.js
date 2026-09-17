import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const RefundsCancellation = dynamic(() =>
  import("../components/RefundsCancellation/RefundsCancellation")
);

const terms = () => {
  return (
    <>
      <Head>
        <title>Refund and Cancellation Policy | Skillslash</title>
        <meta
          name="description"
          content="Skillslash's refund and cancellation policy for course enrolments."
        />
        <link rel="canonical" href="https://skillslash.com/refunds-cancellation" />
      </Head>
      <RefundsCancellation />
    </>
  );
};

export default terms;
