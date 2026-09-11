import React from "react";
import dynamic from "next/dynamic";
const CareerHeader = dynamic(() =>
  import("../components/Career/CareerHeader/CareerHeader")
);
const HowWeDo = dynamic(() => import("../components/Career/HowWeDo/HowWeDo"));
const JobOffer = dynamic(() => import("../components/Career/Job/JobOffer"));
const Footer = dynamic(() => import("../components/Footer/Footer"));
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";

const Career = () => {
  return (
    <div>
      <Head>
        <title>Careers at Skillslash - Open Roles &amp; How We Work</title>
        <meta
          name="description"
          content="Explore open roles at Skillslash, see how our team works, and find out what it takes to join the people behind our tech career guides and course comparisons."
        />
      </Head>
      <Navbar course={false} />
      <CareerHeader />

      <HowWeDo />
      <JobOffer />
      <Footer />
    </div>
  );
};

export default Career;
