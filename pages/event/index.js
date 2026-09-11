import React from "react";
import Head from "next/head";
import styles from "../../styles/DataScienceEvent.module.css";
import { getSortedPostsData } from "../../lib/event";
import { sortByDateEvent } from "../../utils";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../components/Navbar/Navbar"));
const Footer = dynamic(() => import("../../components/Footer/Footer"));
const EventTab = dynamic(() =>
  import("../../components/Event/EventTab/EventTab")
);

export default function index({ eventData }) {
  return (
    <div>
      <Head>
        <title>Past Webinars, Workshops &amp; Masterclasses - Skillslash</title>
        <meta
          name="description"
          content="Archive of Skillslash webinars, workshops and masterclasses. Every listed session has already run - the recordings and topics are kept here for reference."
        />
        <meta name="robots" content="noindex,follow" />

      </Head>
      <Navbar course={false} />

      <div className={styles.event}>
        <h1>Past events on Skillslash</h1>
        <div className={styles.eventTab}>
          <EventTab data={eventData} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const eventData = getSortedPostsData();
  return {
    props: {
      eventData: eventData.sort(sortByDateEvent),
    },
  };
}
