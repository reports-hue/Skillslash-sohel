// pages/Bangalore.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";
import ChennaiData from "../Data/Cities/chennai/chennaiData";

const Delhi = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Top 10 Data Science Course Training Institutes in Chennai</title>
        <meta
          name="description"
          content="Join our top 10 Data Science courses in Chennai. Master data analysis, python, machine learning, and AI with expert instructors. Start your data-driven career today!"
        />
        <meta
          name="keywords"
          content="Data Science training, Data Science certification, Data Science course, Data Science institute, Data Science institute in Chennai, data science courses in Chennai, data science courses, data science course in Chennai, data scientist course, data scientist course in Chennai"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/data-science-course-in-chennai"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
            ReviewSchema: {
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "Data science course in Chennai",
              brand: {
                "@type": "Brand",
                name: "Skillslash",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "9.9",
                bestRating: "10",
                worstRating: "1",
                ratingCount: "25987",
              },
            },
            ReviewSchema1: {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Skillslash - Data Science Project Based Learning Platform.",
              url: "https://skillslash.com",
              sameAs: [
                "https://www.facebook.com/SkillSlash-100623872122442",
                "https://twitter.com/skillslash",
                "https://www.linkedin.com/company/skillslash",
                "https://www.instagram.com/skillslash_Academy/",
                "https://www.youtube.com/c/Skillslash",
              ],
              logo: "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
              legalName: "Skillslash - Project Based Learning Platform.",
              address: [
                {
                  "@type": "PostalAddress",
                  addressCountry: "India",
                  addressLocality: "Bangalore",
                  addressRegion: "karnataka",
                  postalCode: "560102",
                  streetAddress: "HSR Layout",
                },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "(+91) ",
                  contactType: "Customer Service",
                  contactOption: "TollFree",
                  areaServed: "IN",
                },
              ],
            },
            ReviewSchema2: {
              "@context": "https://schema.org/",
              "@type": "WebPage",
              name: "Data Science Course in Chennai",
              speakable: {
                "@type": "SpeakableSpecification",
                xpath: [
                  "/html/head/title",
                  "/html/head/meta[@name='description']/@content",
                ],
              },
              url: "https://skillslash.com/data-science-course-in-chennai",
            },
            ReviewSchema3: {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Data Science Course in Chennai",
                  description:
                    "Get Data Science Training in Chennai by Industry led Data Scientist. Know the How to Get Job with Data science course in Chennai",
                  url: "https://skillslash.com/data-science-course-in-chennai-in-chennai",
                },
              ],
            },
            ReviewSchema4: {
              "@context": "https://schema.org",
              "@type": "EducationEvent",
              name: "Data Science Course in Chennai",
              description:
                "Get Data Science Training in Chennai by Industry led Data Scientist. Know the How to Get Job with Data science course in Chennai",
              performer: "Skillslash",
              organizer: {
                name: "Skillslash",
                url: "https://skillslash.com/",
              },
              image:
                "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
              eventAttendanceMode:
                "https://schema.org/OnlineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "VirtualLocation",
                url: "https://skillslash.com/data-science-course-in-chennai",
              },
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "65,000",
                highPrice: "120,000",
                url: "https://skillslash.com/data-science-course-in-chennai",
                availability: "https://schema.org/InStock",
                validFrom: "2023-08-9",
                price: "65,000",
                priceCurrency: "INR",
              },
              startDate: "2023-06-9",
              endDate: "2023-07-26",
              url: "https://skillslash.com/data-science-course-in-chennai",

              duration: "42",
            },

            ReviewSchema6: {
              "@context": "https://schema.org",
              "@type": "Course",
              name: "Data Science course in Chennai",
              description:
                "Our Microsoft Certified Data Science program in Chennai lasts for 8 months. Utilizing 18+ technologies, work on 15+ industry-based projects to learn data science.",
              provider: {
                "@type": "Organization",
                name: "Skillslash - Data Science Project Based Learning Platform.",
                sameAs: "https://www.skillslash.com",
              },
            },
            ReviewSchema5: {
              "@context": "https://schema.org/",
              "@type": "HowTo",
              name: "How to apply our data science course in Chennai?",
              description:
                "Follow these 3 simple steps in the admission process",
              image:
                "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
              totalTime: "PT5M",
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "INR",
                value: "3",
              },
              step: [
                {
                  "@type": "HowToStep",
                  text: "Fill Enquiry Form",
                  image:
                    "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
                  name: "Form Apply for your profile review by filling the form",
                  url: "https://skillslash.com/data-science-course-in-chennai/",
                },
                {
                  "@type": "HowToStep",
                  text: "Talk To Expert",
                  image:
                    "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
                  name: "Get your career counseling report from the expert",
                  url: "https://skillslash.com/data-science-course-in-chennai/",
                },
                {
                  "@type": "HowToStep",
                  text: "Get Started",
                  image:
                    "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
                  name: "Join the data science program by enrolling",
                  url: "https://skillslash.com/data-science-course-in-chennai/",
                },
              ],
            },
          }),
          }}
        />
      </Head>

      <Navbar />

      <BlogHeader
        city="Chennai"
        title=" Data Science Course Training Institutes in "
        subTitle="Top 10"
        titleAuthor="Chennai"
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
        MumbaiData={ChennaiData} // Passing MumbaiData to BlogContent
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
      data: ChennaiData,
    },
  };
}

export default Delhi;
