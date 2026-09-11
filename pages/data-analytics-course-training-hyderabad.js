// pages/Bangalore.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";
import HyderbadData from "../Data/Cities/hyderabad/DaHyderabadData";

const DAHyderabad = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Top 10 Data Analytics Course Training Institutes in Hyderabad</title>
        <meta
          name="description"
          content="Skillslash is on of the Best Data Analytics Course Training Institute in Hyderabad with 100% Placement.Enroll in our Data Analytics training course ."
        />
        <meta
          name="keywords"
          content="Data Analytics training institute in hyderabad, Data Analytics training, Data Analytics course in hyderabad, Data Analytics training institute,Data Analytics course,Data Analytics training,online Data Analytics"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/data-analytics-course-training-hyderabad"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
         "ReviewSchema": {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Data Analytics course in Hyderabad",
      "brand": {
        "@type": "Brand",
        "name": "Skillslash"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "9.9",
        "bestRating": "10",
        "worstRating": "1",
        "ratingCount": "22989"
      }
    }
          }),
          }}
        />
      </Head>

      <Navbar />

      <BlogHeader
        city="Hyderabad"
        title=" Data Analytics Course Training Institutes in "
        subTitle="Top 10"
        titleAuthor="Hyderabad"
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
        MumbaiData={HyderbadData} // Passing MumbaiData to BlogContent
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
      data: HyderbadData,
    },
  };
}

export default DAHyderabad;
