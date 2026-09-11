// pages/mumbai.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import RelatedInfo from "../components/SeoComponents/ReleteadInfo/RelatedInfo";
import BAHyderabadData from "../Data/Cities/hyderabad/BAHyderabadData";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";

const BAHyderabad = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Best 10 Business Analytics Course Institutes in Hyderabad</title>
        <meta
          name="description"
          content="Discover the top 10 business analytics courses in Hyderabad. Compare institutes, boost your skills, and advance your career with the best training options available."
        />
        <meta
          name="keywords"
          content="business analytics training, business analytics course, business analytics institute, business analytics certification, business analytics training in hyderabad, business analytics course in hyderabad"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/business-analytics-course-in-hyderabad"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Business analytics course in hyderabad",
            brand: {
              "@type": "Brand",
              name: "Skillslash",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "9.6",
              bestRating: "10",
              worstRating: "1",
              ratingCount: "22657",
            },
          }),
          }}
        />
      </Head>

      <Navbar />

      <BlogHeader
        city=" Hyderabad"
        title="Business Analytics Course Training Institutes"
        subTitle="Top 7 "
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
        MumbaiData={BAHyderabadData}
      />

      <InternalLinking />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      data: BAHyderabadData,
    },
  };
}

export default BAHyderabad;
