// pages/mumbai.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import BAHyderabadData from "../Data/Cities/hyderabad/BAHyderabadData";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";
import DSAData from "../Data/Cities/dataStrctures/DSAData";

const BAHyderabad = ({ data }) => {
  return (
    <div>
      <Head>
        <title>
        Top 9 Data Structure & Algorithm Courses Online
        </title>
        <meta
          name="description"
          content="Master Data Structures & Algorithms with these Top 9 Online Courses. Ideal for Beginners to Advanced Learners Aiming to Boost Coding and Problem-Solving Skills"
        />
        <meta
          name="keywords"
          content="best data structures and algorithms course, data structures course, data structures and algorithms course, best data structures and algorithms course, System Design Certification, data structures and algorithms "
        />
        <link
          rel="canonical"
          href="https://skillslash.com/dsa-system-design"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
           "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Best Data Structures and Algorithms Course",
      "brand": {
        "@type": "Brand",
        "name": "Skillslash"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "9.8",
        "bestRating": "10",
        "worstRating": "1",
        "ratingCount": "22858"
            },
          }),
          }}
        />
      </Head>

      <Navbar />

      <BlogHeader
        city="[2025]"
        title=" Data Structure & Algorithm Courses Online"
        subTitle="Top 9 "
        titleAuthor="Siddharth"
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
        MumbaiData={DSAData}
      />

      <InternalLinking />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      data:DSAData,
    },
  };
}

export default BAHyderabad;
