// pages/mumbai.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import RelatedInfo from "../components/SeoComponents/ReleteadInfo/RelatedInfo";
import KolkataData from "../Data/Cities/KolkataData";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";

const Kolkata = ({ data }) => {
  return (
    <div>
      <Head>
        <title>
        Top 9 Data Science Course Training Institutes in Kolkata
        </title>
        <meta
          name="description"
          content=" Discover the leading Data Science course Institutes in Kolkata. Choose from the best data science training in Kolkata and elevate your professional journey."
        />
        <meta
          name="keywords"
          content=" data science course in kolkata, data scientist course in kolkata, data science course in kolkata with placement, best data science course in kolkata, best data science training institute in kolkata, data science institute in kolkata, data science course in kolkata fees, data science course fees in kolkata, best institute for data science in kolkata, data science training in kolkata"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/data-science-course-training-kolkata"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Data science course in Kolkata",
            "brand": {
              "@type": "Brand",
              "name": "Skillslash"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "9.9",
              "bestRating": "10",
              "worstRating": "1",
              "ratingCount": "22880"
            },
          }),
          }}
        />

 
       

      </Head>

      <Navbar />

      <BlogHeader
      city="Kolkata"
      noImg ={true}
        title=" Data Science Course Training Institutes in "
              subTitle="Top 9"
        titleAuthor="Amit"
        authorPro="/cdn/city_Blog/ai_face.svg"
        linkedinId="https://www.linkedin.com/in/amit-ambi-axh08/"
        rytImg="/cdn/city_Blog/kolkata_right.svg"
        backgroundImg="/cdn/city_Blog/blog_bg_mumbai.svg"
        cityImg="/cdn/city_Blog/kolkata_palce.svg"
      />

      <BlogContent
        contentHtml={data.contentHtml}
        lastUpdated={data.lastUpdated}
        shareLink={data.shareLink}
        publishDate={data.publishDate}
        MumbaiData={KolkataData} // Adjusted prop name
      />

   
         <InternalLinking/>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // Since the data is already in a JS file, we can directly import it
  return {
    props: {
      data: KolkataData,
    },
  };
}

export default Kolkata;
