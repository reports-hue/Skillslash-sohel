

import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import RelatedInfo from "../components/SeoComponents/ReleteadInfo/RelatedInfo";
import ChandigarhData from "../Data/Cities/ChandigarhData";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";

const Chandigarh = ({ data }) => {
  return (
    <div>
      <Head>
        <title>
        Top 10 Data Science Course Training Institutes in Chandigarh
        </title>
        <meta
          name="description"
          content=" Looking for the best Data Science courses in Chandigarh? Check out the listed top data science training institutes in Chandigarh to boost your tech skills."
        />
        <meta
          name="keywords"
          content="data science course in chandigarh, best institute for data science in chandigarh, data science institute in chandigarh, data science in chandigarh, data science chandigarh"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/data-science-course-in-chandigarh"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
        "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Data science course in Chandigarh",
      "brand": {
        "@type": "Brand",
        "name": "Skillslash"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "9.8",
        "bestRating": "10",
        "worstRating": "1",
        "ratingCount": "23742"
      }
          }),
          }}
        />

 
       

      </Head>

      <Navbar />
      <BlogHeader
      city="Chandigarh"
      noImg ={true}
        title=" Data Science Course Training Institutes in "
              subTitle="Top 10"
        titleAuthor="Amit"
        authorPro="/cdn/city_Blog/ai_face.svg"
        linkedinId="https://www.linkedin.com/in/amit-ambi-axh08/"
        rytImg="/cdn/city_Blog/chandigarh_right.svg"
        backgroundImg="/cdn/city_Blog/blog_bg_mumbai.svg"
        cityImg="/cdn/city_Blog/chandigarh_city.svg"
      />

      <BlogContent
        contentHtml={data.contentHtml}
        lastUpdated={data.lastUpdated}
        shareLink={data.shareLink}
        publishDate={data.publishDate}
        MumbaiData={ChandigarhData} // Adjusted prop name
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
      data: ChandigarhData,
    },
  };
}

export default Chandigarh;
