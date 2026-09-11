import React from "react";
import dynamic from "next/dynamic";
import VideoTestimonial from "../VideoTestimonial/VideoTestimonial";
import Reviews from "../DigitalMarketing/Reviews/Reviews";
import Rating from "../VideoTestimonial/Rating";
import { ratingData } from "../../components/VideoTestimonial/ratingData";

const Footer = dynamic(() => import("../Footer/Footer"));

// const Newsletter = dynamic(() => import("../Newsletter/Newsletter"));
const OurEvents = dynamic(() => import("../OurEvents/OurEvents"));

const SecondPart = ({ homePage }) => {
  return (
    <>
      {/* <div className={styles.advantage}>
        <Hiring />
      </div> */}
        <Rating ratingData={ratingData} />

<Reviews/>
      
      {/* <OurEvents /> */}
      <VideoTestimonial
        heading="What is it like to train with us?
"
        spanText="Our learners say it best"
      />

      {/* <Newsletter /> */}
      <Footer />
    </>
  );
};

export default SecondPart;
