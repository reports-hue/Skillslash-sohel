import Header from "../../components/Skills/CoursePage/Header/Header";
import DataScienceSyllabus from "../../components/Skills/CoursePage/SeoSyllabus/SeoSyllabus";
import Navbar from "../../components/Navbar/Navbar";
import ProjectSlider from "../../components/Skills/Global/Project/ProjectSlider";
import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";
import { getAllPostIds, getPostData } from "../../lib/dmnewpage";
import FAQ from "../../components/Skills/Global/FAQ/FAQ";
import WhyUsAnimate from "../../components/Skills/CoursePage/WhyUsAnimate/WhyUsAnimate";
import WhyUs from "../../components/WhyUs/WhyUs";
import VideoTestimonial from "../../components/VideoTestimonial/VideoTestimonial";
import Reviews from "../../components/Review/Reviews";
import DetailTable from "../../components/Skills/CoursePage/DetailTable/DetailTable";
import Learn from "../../components/Skills/CoursePage/Learn/Learn";
import Footer from "../../components/Footer/Footer";
import CTA from "../../components/CTA/CTA";
import BottomPrice from "../../components/Skills/BottomPrice/BottomPrice";
import SkillsContent from "../../components/Skills/CoursePage/SkillsContent/SkillsContent";
import PricingSection from "../../components/Skills/CoursePage/PricingSection/PricingSection";
import CareerSupport from "../../components/Skills/CoursePage/CareerSupport/CareerSupport";
import ToolsCovered from "../../components/Skills/CoursePage/ToolsCovered/ToolsCovered";
import PriceCompare from "../../components/Skills/CoursePage/PriceCompare/PriceCompare";
import NewChoose from "../../components/DigitalMarketing/Course/newChoose/NewChoose";
import Tools from "../../components/DigitalMarketing/Course/Tools/Tools";
import Emi from "../../components/Course/EMI/Emi";
import CourseHeader from "../../components/DigitalMarketing/Course/FirstSection/CourseHeader";
import CaseStudy from "../../components/DigitalMarketing/Course/CaseStudy/CaseStudy";
import Review from "../../components/DigitalMarketing/Reviews/Reviews";

const DataSciencePage = ({ DataScienceCourseData }) => {
  const [showNigeriaForm, setShowNigeriaForm] = useState(false);
  const [actualPrice, setActualPrice] = useState(
    DataScienceCourseData.data.header.actualPrice
  );
  const [offerPrice, setOfferPrice] = useState(
    DataScienceCourseData.data.header.offerPrice
  );
  const [link, setLink] = useState(
    DataScienceCourseData.data.header.indCheckout
  );

  return (
    <div>
      <Head>
        <title>{DataScienceCourseData.data.header.title}</title>
        <meta
          name="description"
          content={DataScienceCourseData.data.header.desc}
        />
        {/* Ad-campaign variants of this page carry a `canonical` pointing at
            the primary URL so they stay live for ad traffic without
            competing with it as duplicate content. */}
        <link
          rel="canonical"
          href={
            DataScienceCourseData.data.header.canonical ||
            `https://skillslash.com/liveclass/${DataScienceCourseData.id}`
          }
        />
      </Head>
      <Navbar
        link={DataScienceCourseData.data.header.link}
        redirectDs={DataScienceCourseData.data.header.dataScience}
        redirectDa={DataScienceCourseData.data.header.dataAnalytics}
        redirectFs={DataScienceCourseData.data.header.FullStack}
        redirectDM={DataScienceCourseData.data.header.digitalmarketing}
        noHam={DataScienceCourseData.data.header.digitalmarketing}
      />

      <CourseHeader
        title={DataScienceCourseData.data.header.title}
        dmPage={DataScienceCourseData.data.header.dmPage}
        spanTitleText={DataScienceCourseData.data.header.spanTitleText}
        redirectDM={DataScienceCourseData.data.header.digitalmarketing}
        subtitle={DataScienceCourseData.data.header.subtitle}
        GenImg={DataScienceCourseData.data.header.GenImg}
        AdsDM={DataScienceCourseData.data.header.AdsDM}
        logoN={DataScienceCourseData.data.header.logoN}
        logoG={DataScienceCourseData.data.header.logoG}
        logoGN ={DataScienceCourseData.data.header.logoGN}
      />
      <SkillsContent
        certification={DataScienceCourseData.data.header.certification}
        hrs={DataScienceCourseData.data.header.hour}
        redirectDs={DataScienceCourseData.data.header.dataScience}
        redirectFs={DataScienceCourseData.data.header.FullStack}
        redirectDa={DataScienceCourseData.data.header.dataAnalytics}
        redirectDM={DataScienceCourseData.data.header.digitalmarketing}
        nomicrosoft={DataScienceCourseData.data.header.nomicrosoft}
        dmPage={DataScienceCourseData.data.header.dmPage}
      />
      <PricingSection
        offerPrice={offerPrice}
        actualPrice={actualPrice}
        redirectDs={DataScienceCourseData.data.header.dataScience}
        redirectFs={DataScienceCourseData.data.header.FullStack}
        redirectDa={DataScienceCourseData.data.header.dataAnalytics}
        redirectDM={DataScienceCourseData.data.header.digitalmarketing}
        checkoutLink={DataScienceCourseData.data.header.indCheckout}
        dmPage={DataScienceCourseData.data.header.dmPage}
      />
      <NewChoose />
      <div id="certificate">
        <WhyUs
          redirectDs={DataScienceCourseData.data.header.dataScience}
          redirectDa={DataScienceCourseData.data.header.dataAnalytics}
          nomicrosoft={DataScienceCourseData.data.header.nomicrosoft}
          redirectDM={DataScienceCourseData.data.header.digitalmarketing}
          dmPage={DataScienceCourseData.data.header.dmPage}
          redirectCertificate={
            DataScienceCourseData.data.header.redirectCertificate
          }
        />
      </div>
      <div id="certificate">
        <WhyUsAnimate
          redirectDa={DataScienceCourseData.data.header.dataAnalytics}
          redirectDs={DataScienceCourseData.data.header.dataScience}
          redirectFs={DataScienceCourseData.data.header.FullStack}
          dmPage={DataScienceCourseData.data.header.dmPage}
          redirectDM={DataScienceCourseData.data.header.digitalmarketing}
          redirectCertificate={
            DataScienceCourseData.data.header.redirectCertificate
          }
        />
      </div>

      <Tools />
      <CaseStudy
        redirectDM={DataScienceCourseData.data.header.digitalmarketing}
        redirectCaseS={DataScienceCourseData.data.header.redirectgrowth}
      />
      <CareerSupport />

      <div id="modules">
        <DataScienceSyllabus
          NigeriaForm={showNigeriaForm}
          title={DataScienceCourseData.data.header.title}
          seoSyllabus={DataScienceCourseData.data.seoSyllabus}
          heading="Syllabus"
          hour={DataScienceCourseData.data.header.hour}
          redirectFs={DataScienceCourseData.data.header.FullStack}
          redirectDs={DataScienceCourseData.data.header.dataScience}
          redirectDa={DataScienceCourseData.data.header.dataAnalytics}
          redirectDM={DataScienceCourseData.data.header.digitalmarketing}
          redirectgrowth={DataScienceCourseData.data.header.redirectgrowth}
          redirectsocialSeo={DataScienceCourseData.data.header.redirectgrowth}
          redirectPerforSocia={DataScienceCourseData.data.header.redirectgrowth}
          redirectPSeo={DataScienceCourseData.data.header.redirectgrowth}
        />
      </div>

      <div id="fee">
        <Emi
          price={DataScienceCourseData.data.Fee.ProPrice}
          emi={DataScienceCourseData.data.Fee.emi}
          redirectDM={DataScienceCourseData.data.header.digitalmarketing}
        />
      </div>

      <Review />

      {DataScienceCourseData.data.header.FullStack ? (
        ""
      ) : (
        <VideoTestimonial
          dmPage={DataScienceCourseData.data.header.dmPage}
          redirectDa={DataScienceCourseData.data.header.dataAnalytics}
          redirectDs={DataScienceCourseData.data.header.dataScience}
          heading="What is it like to train with us?"
          spanText="our learners say it best."
        />
      )}

      <div id="faq">
        <FAQ
          heading="Frequently Asked Questions"
          FaqData={DataScienceCourseData.data.FaqDATA}
        />
      </div>
      <Footer />
      <BottomPrice
        checkoutLink={DataScienceCourseData.data.header.indCheckout}
        offerPrice={offerPrice}
        actualPrice={actualPrice}
        redirectDs={DataScienceCourseData.data.header.dataScience}
        redirectFs={DataScienceCourseData.data.header.FullStack}
        redirectDa={DataScienceCourseData.data.header.dataAnalytics}
        link={DataScienceCourseData.data.header.link}
        nomicrosoft={DataScienceCourseData.data.header.nomicrosoft}
        dmPage={DataScienceCourseData.data.header.dmPage}
        redirectDM={DataScienceCourseData.data.header.digitalmarketing}
        gst={DataScienceCourseData.data.header.gst}
      />
    </div>
  );
};

export default DataSciencePage;

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const DataScienceCourseData = getPostData(params.id);
  return {
    props: {
      DataScienceCourseData,
    },
  };
}
