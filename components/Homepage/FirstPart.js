import dynamic from "next/dynamic";
import HomeFirstSection from "../FirstSection/HomeFirstSection";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import WhyUs from "../WhyUs/WhyUs";

import Slider from "../Animation/Slider/Slider";

import Demand from "../DigitalMarketing/Demand/Demand";
import WhyChooseUs from "../DigitalMarketing/WhyChooseUs/DmChoose";

const ProgramInfo = dynamic(() => import("../Course/ProgramInfo/ProgramInfo"));
// const BoxAnimation = dynamic(() => import("../BoxAnimation/BoxAnimation"));

const FirstPart = ({ homePage,redirectDM }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  return (
    <>
      <HomeFirstSection
        deskTopPara="Gen AI Exclusive Course"
        mTopPara=""

        title="Be a Global Leader in Digital Marketing"
        spanTitleText=""
        homePage={homePage}
        desc="Get real work experience and certifications. Learn from industry experts and get placed in top product companies!"
        backgroundImg="/cdn/Home/header/header-home-page-skillslash.svg"
        usp1=" Live Interactive "
        usp2=" Company "
        usp3=" Microsoft"
        usp4=" 100% Interview"
        usp1Span="Classroom"
        usp2Span="Exp Certifications"
        usp3Span="Certification"
        usp4Span="Guarantee"
        width="405"
        height="404"
        btnTitle="Explore Courses"

      />

<Slider />
      <Demand redirectDM={redirectDM}/>
      <WhyChooseUs/>

      {/* <ProgramInfo homePage={homePage} /> */}
    
      {/* <CoursePath /> */}
      {/* <CourseSlider /> */}
      {/* <div ref={ref}>
        <WhyUs scrollYProgress={scrollYProgress} home={true} />
      </div> */}
      {/* <WhyUsAnimate home={true} /> */}
      {/* <BoxAnimation /> */}
    </>
  );
};

export default FirstPart;
