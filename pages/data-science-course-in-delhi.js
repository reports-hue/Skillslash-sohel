// pages/Bangalore.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";
import DelhiData from "../Data/Cities/delhi/delhiDsData";

const Delhi = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Best 10 Data Science Institutes in Delhi</title>
        <meta
          name="description"
          content="Find the top 10 Data Science courses in Delhi. Master data concepts, machine learning, and AI with expert-led training classes. Enroll now for a successful career!"
        />
        <meta
          name="keywords"
          content="Data Science training, Data Science certification, Data Science course, Data Science institute, Data Science institute in Delhi, data science courses in Delhi, data science courses, data science course in Delhi, data scientist course, data scientist course in Delhi"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/data-science-course-in-delhi"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
         "ReviewSchema": {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Data science course in Delhi | Data Scientist Course - Skillslash",
      "brand": {
        "@type": "Brand",
        "name": "Skillslash"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "9.9",
        "bestRating": "10",
        "worstRating": "1",
        "ratingCount": "25987"
      }
    }
          }),
          }}
        />
      </Head>

      <Navbar />

      <BlogHeader
        city="Delhi"
        title=" Data Science Course Training Institutes in "
        subTitle="Top 10"
        titleAuthor="Delhi"
        authorPro="/cdn/city_Blog/ai_face.svg"
        linkedinId="https://www.linkedin.com/in/amit-ambi-axh08/"
        rytImg="/cdn/city_Blog/mumbai_top_10_comp.svg"
        backgroundImg="/cdn/city_Blog/blog_bg_mumbai.svg"
        cityImg="/cdn/city_Blog/mumbai_place.svg"
      />

      <BlogContent
        contentHtml={data.contentHtml}
        lastUpdated={data.lastUpdated}
        shareLink={data.shareLink}
        publishDate={data.publishDate}
        MumbaiData={DelhiData} // Passing MumbaiData to BlogContent
      />

      <InternalLinking />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // Since the data is already in a JS file, we can directly import it
  return {
    props: {
      data: DelhiData,
    },
  };
}

export default Delhi;
