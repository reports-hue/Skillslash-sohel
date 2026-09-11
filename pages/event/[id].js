import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const EventDetails = dynamic(() =>
  import("../../components/Event/EventDetails/EventDetails")
);
const Reviews = dynamic(() => import("../../components/Review/Reviews"));
const Navbar = dynamic(() => import("../../components/Navbar/Navbar"));
import styles from "../../styles/DataScienceEvent.module.css";
import { getAllPostIds, getPostData } from "../../lib/event";
const AboutContentC = dynamic(() =>
  import("../../components/Event/AboutContentC/AboutContentC")
);
const WhyWhoB = dynamic(() => import("../../components/Event/WhyWhoB/WhyWhoB"));
const EventAboutus = dynamic(() =>
  import("../../components/Event/EventAboutus/EventAboutus")
);
const FeatureProfileA = dynamic(() =>
  import("../../components/Event/FeatureProfileA/FeatureProfileA")
);

const EventHeaderWrap = dynamic(() =>
  import("../../components/Event/EventHeaderWrap/EventHeaderWrap")
);

export default function DataScienceEvent({ eventData }) {
  let today = new Date();
  let eventDateInfo = new Date(eventData.data.mainData.eventEnd);
  let eventStart = new Date(eventData.data.mainData.eventStart);

  return (
    <div className={styles.container}>
      <Head>
        <title>{eventData.data.metaInfo.title}</title>
        <meta name="description" content={eventData.data.metaInfo.desc} />
        {/* These are registration pages for events that ran in 2022; they are
            kept reachable by direct link but should not compete in search. */}
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Navbar event={true} />
      <EventHeaderWrap
        eventData={eventData}
        today={today}
        eventStart={eventStart}
        eventDateInfo={eventDateInfo}
      />
      <div className={today >= eventDateInfo ? styles.Pages : styles.Page2}>
        <div className={styles.left}>
          <EventDetails
            img1={eventData.data.eventDetails.img1}
            img2={eventData.data.eventDetails.img2}
            img3={eventData.data.eventDetails.img3}
            firstH={eventData.data.eventDetails.firstH}
            firstP={eventData.data.eventDetails.firstP}
            secondH={eventData.data.eventDetails.secondH}
            secondP={eventData.data.eventDetails.secondP}
            thirdH={eventData.data.eventDetails.thirdH}
            thirdP={eventData.data.eventDetails.thirdP}
          />
          <EventAboutus eventData={eventData} />
          <FeatureProfileA eventData={eventData} />
          <WhyWhoB eventData={eventData} />
          <div className={styles.eReview} id="review">
            <Reviews event={today >= eventDateInfo} redirectFs={true} />
          </div>

          <AboutContentC eventData={eventData} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const eventData = getPostData(params.id);
  return {
    props: {
      eventData,
    },
  };
}
