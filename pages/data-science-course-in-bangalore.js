// pages/Bangalore.js

import React from "react";
import { toJsonLdGraph } from "../lib/jsonLdGraph";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import BlogHeader from "../components/CityBlog/BlogHeader/BlogHeader";
import BlogContent from "../components/CityBlog/BlogContent/BlogConent";
import BangaloreData from "../Data/Cities/bangalore/DSBangaloreData";
import Footer from "../components/Footer/Footer";
import InternalLinking from "../components/InternalLinking/InternalLinking";

const Mumbai = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Top 10 Data Science Course Institutes in Bangalore </title>
        <meta
          name="description"
          content="Explore the top 10 data science institutes in Bangalore. Boost your career with expert training and hands-on projects. Enroll now to master data science skills"
        />
        <meta
          name="keywords"
          content="Data Science training, Data Science certification, Data Science course, Data Science institute, Data Science institute in Bangalore, data science courses in Bangalore, data science courses, data science course in bangalore, data scientist course, data scientist course in bangalore"
        />
        <link
          rel="canonical"
          href="https://skillslash.com/data-science-course-in-bangalore"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLdGraph({
            ReviewSchema: {
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "Data Science Course in Bangalore with Certification ",
              brand: {
                "@type": "Brand",
                name: "Skillslash",
              },
              offers: {
                "@type": "AggregateOffer",
                url: "https://skillslash.com/data-science-course-in-bangalore",
                priceCurrency: "INR",
                lowPrice: "65,000",
                highPrice: "109,999",
                offerCount: "1",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "9.9",
                bestRating: "10",
                worstRating: "1",
                ratingCount: "25987",
              },
            },
            ReviewSchema6: {
              "@context": "https://schema.org",
              "@type": "Course",
              name: "Data Science course in Bangalore",
              description:
                "Our Microsoft Certified Data Science program in Bangalore lasts for 8 months. Utilizing 18+ technologies, work on 15+ industry-based projects to learn data science.",
              provider: {
                "@type": "Organization",
                name: "Skillslash - Data Science Project Based Learning Platform.",
                sameAs: "https://www.skillslash.com",
              },
            },
            ReviewSchema5: {
              "@context": "https://schema.org/",
              "@type": "HowTo",
              name: "How to apply our data science course in Bangalore?",
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
                  url: "https://skillslash.com/data-science-course-in-bangalore/",
                },
                {
                  "@type": "HowToStep",
                  text: "Talk To Expert",
                  image:
                    "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
                  name: "Get your career counseling report from the expert",
                  url: "https://skillslash.com/data-science-course-in-bangalore/",
                },
                {
                  "@type": "HowToStep",
                  text: "Get Started",
                  image:
                    "/cdn/static/web/New-UI/Skillslash-logo-new.svg",
                  name: "Join the data science program by enrolling",
                  url: "https://skillslash.com/data-science-course-in-bangalore/",
                },
              ],
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
              name: "Data Science Course in Bangalore",
              speakable: {
                "@type": "SpeakableSpecification",
                xpath: [
                  "/html/head/title",
                  "/html/head/meta[@name='description']/@content",
                ],
              },
              url: "https://skillslash.com/data-science-course-in-bangalore",
            },
            ReviewSchema3: {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Data Science Course in Bangalore with Certification",
                  description:
                    "Enrich Your Career by Learning Data Science Course in Bangalore directly by Industry mentors in Live classes. Get Job ready With Microsoft Data science Certification",
                  url: "https://skillslash.com/data-science-course-in-bangalore",
                },
              ],
            },
            ReviewSchema4: {
              "@context": "https://schema.org",
              "@type": "EducationEvent",
              name: "Data Science Course in Bangalore with Certification",
              description:
                "Enrich Your Career by Learning Data Science Course directly by Industry mentors in Live classes. Get Job ready With Microsoft Data science Certification",
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
                url: "https://skillslash.com/data-science-course-in-bangalore",
              },
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "65,000",
                highPrice: "120,000",
                url: "https://skillslash.com/data-science-course-in-bangalore",
                availability: "https://schema.org/InStock",
                validFrom: "2023-08-9",
                price: "65,000",
                priceCurrency: "INR",
              },
              startDate: "2023-06-9",
              endDate: "2023-07-26",
              url: "https://skillslash.com/data-science-course-in-bangalore",

              duration: "42",
            },
          }),
          }}
        />
      </Head>

      <Navbar />

      <BlogHeader
        city="Bangalore"
        title=" Data Science Course Training Institutes in "
        subTitle="Top 10"
        titleAuthor="Bangalore"
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
        MumbaiData={BangaloreData} // Passing MumbaiData to BlogContent
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
      data: BangaloreData,
    },
  };
}

export default Mumbai;
