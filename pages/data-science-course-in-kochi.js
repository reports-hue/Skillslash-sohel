// pages/Bangalore.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";
import KochiData from "../Data/Cities/kochi/DsKochiData";

const Kochi = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Best 10 Data Science Institutes in Kochi  </title>
        <meta
          name="description"
          content="Best Data science course in Kochi at budget-friendly prices at Skillslash. Enrol in our data science course with placement support"
        />
        <meta
          name="keywords"
          content="Data Science training, Data Science certification, Data Science course, Data Science institute, Data Science institute in Kochi, data science courses in Kochi, data science courses, data science course in Kochi, data scientist course, data scientist course in Kochi"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/data-science-course-in-kochi"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
        "ReviewSchema": {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "Data science course in Kochi",
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
        city="Kochi"
        title=" Data Science Course Training Institutes in "
        subTitle="Top 10"
        titleAuthor="Kochi"
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
        MumbaiData={KochiData}// Passing MumbaiData to BlogContent
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
      data: KochiData,
    },
  };
}

export default Kochi;
