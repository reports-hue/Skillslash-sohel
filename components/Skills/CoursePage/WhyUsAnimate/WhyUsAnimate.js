import React, { useRef, useState } from "react";
import FirstFeature from "./FirstFeature";
import SecondFeature from "./SecondFeature";
import ThirdFeature from "./ThreeFeature";
import FourthFeature from "./FourthFeature";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import Form from "../../Global/Form/Form";
import Popup from "../../Global/Popup/Popup";

const WhyUsAnimate = ({
  redirectDa,
  redirectDs,
  home,
  redirectFs,
  nomicrosoft,
  redirectDM,
  dmPage,
  changeHeading,
  redirectCertificate,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const imageSrc = [
    "/cdn/NewDatascience/Certificate-Of-Internship.svg",
    // Add other image URLs as needed
    "/cdn/NewDatascience/project-experience.svg",
    redirectDa
      ? "/cdn/NewDatascience/microsoft-data-analytics.svg"
      : "/cdn/NewDatascience/microsft-data-science.svg",
  ];
  const imageSrcselfpaced = [
    "/cdn/certificate/VISHANT-VERMAWed-Jan-31-2024-12-36-01-GMT-0000--Coordinated-Universal-Time--325722i0gu.svg",
    // Add other image URLs as needed
    "/cdn/certificate/VISHANT-VERMAWed-Jan-31-2024-12-36-01-GMT-0000--Coordinated-Universal-Time--325722i0gu.svg",
    redirectDa
      ? "/cdn/certificate/VISHANT-VERMAWed-Jan-31-2024-12-36-01-GMT-0000--Coordinated-Universal-Time--325722i0gu.svg"
      : "/cdn/certificate/VISHANT-VERMAWed-Jan-31-2024-12-36-01-GMT-0000--Coordinated-Universal-Time--325722i0gu.svg",
  ];
  const imageSrcDM = [
    "/cdn/Google-Ads-Display.svg",
    // Add other image URLs as needed
    "/cdn/meta.svg",
    redirectDM
      ? "/cdn/semrush-cer.svg"
      : "/cdn/meta.svg",
  ];

  const [popups, setPopups] = useState(false);
  const popupShow = (demoClass, changeText) => {
    setPopups(true);
  };
  return (
    <>
      {/* <div
      className="hidden max-sm:flex flex-col px-5 py-5 bg-[#111621] gap-5 mt-[40px]"
      ref={ref}
    >
      <h2 className="text-2xl font-bold text-white max-sm:text-3xl max-sm:mb-0 mt-[20px] max-[361px]:text-[24px]">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-[60%,38%] gap-8 max-sm:flex max-sm:flex-col">
        <div className="flex flex-col gap-8 relative mt-[20px] pb-[120px] ">
          <div className="flex flex-col relative z-10 gap-[50px] ml-2">
            <div>
              <FirstFeature />
            </div>
            <div>
              <SecondFeature />
            </div>
            {redirectFs ? (
              ""
            ) : (
              <div className="h-[160px]">
                <ThirdFeature />
              </div>
            )}
            <div>
              <FourthFeature />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div> */}
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="RightPopup">
          {changeHeading ? (
            <h5>Download Program Handbook</h5>
          ) : (
            <h5>
              Get a chance to understand this course in detail from our
              counsellors
            </h5>
          )}
          <p>Fill the below Details to get started</p>
          <Form
            popup={true}
            setTrigger={setPopups}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectDa={redirectDa}
            redirectDM={redirectDM}
            redirectCertificate={redirectCertificate}
          />
        </div>
      </Popup>
      <div className="mb-10">
     
        {(redirectDs || redirectDM || home) && (
          
          <div className="hidden max-sm:flex flex-col relative px-28 max-sm:px-5  max-[1281px]:px-24  items-start gap-10 pb-[10px]  pt-10 overflow-scroll">
             <h3 className="text-3xl mt-6 font-bold text-center">10+ Certificates</h3>
            <div className="flex flex-col gap-4 items-start">
              {nomicrosoft ? (
                <>
                  <h3 className="text-3xl  font-bold">
                    Course completion Certification
                  </h3>
                  
                  <div className="flex grid-cols-[70%,70%,70%] max-[321px]:grid-cols-[60%,60%,60%] gap-2 items-center">
                    <div className="bg-black shadow rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%]">
                      <div className="relative w-full h-[180px]  border-[1px] border-white">
                        <Image
                          src={imageSrcselfpaced[2]}
                          fill
                          alt="certificate image"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-bold text-[#f18350]">
                        skillslash Certificate
                      </h3>
                      <p className="text-white">
                        Enhance your resume and LinkedIn profile with the
                        certificate from globally recognized institute.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
   
                  <div className="grid grid-cols-[40%,50%,50%,50%] max-[321px]:grid-cols-[60%,60%,60%, 60%] gap-2 items-center">
                    {dmPage ? (
                      <>
                        <div className="bg-black shadow rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%]">
                          <div className="relative w-full h-[160px] border-[1px] border-white   ">
                            <Image
                              src={imageSrcDM[1]}
                              fill
                              alt="certificate image"
                              loading="lazy"
                            />
                          </div>
                          <h3 className="font-bold text-[#f18350]">
                           
                          </h3>
                          <p className="text-white">
                            Upgrade your resume and LinkedIn profile with out
                            Meta Certified Digital Marketing Course
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="bg-black shadow rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%]">
                          <div className="relative w-full h-[180px]  border-[1px] border-white">
                            <Image
                              src={imageSrc[2]}
                              fill
                              alt="certificate image"
                              loading="lazy"
                            />
                          </div>

                          <h3 className="font-bold text-[#f18350]">
                            Microsoft Certificate
                          </h3>
                          <p className="text-white">
                            Enhance your resume and LinkedIn profile with the
                            certificate from global leader in this technology.
                          </p>
                        </div>
                      </>
                    )}

                    {dmPage ? (
                      <>
                        <div className="bg-black shadow rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%]">
                          <div className="relative w-full h-[180px] border-[1px] border-white  ">
                            <Image
                              src={imageSrcDM[0]}
                              fill
                              alt="certificate image"
                              loading="lazy"
                            />
                          </div>
                          <h3 className="font-bold text-[#f18350]">
                       
                          </h3>
                          <p className="text-white">
                       Show recruiters your proficiency over googles ads with google ads certificates
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="bg-black shadow rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%]">
                          <div className="relative w-full h-[180px] border-[1px] border-white ">
                            <Image
                              src={imageSrc[1]}
                              fill
                              alt="certificate image"
                              loading="lazy"
                            />
                          </div>
                          <h3 className="font-bold text-[#f18350]">
                            Project Experience Certificate
                          </h3>
                          <p className="text-white">
                            Micro validation of your internship experience from
                            Skill-AI, showcase the hiring manager the list of
                            real-life projects you
                          </p>
                        </div>
                      </>
                    )}
                    {dmPage ? (
                      <>
                        <div className="bg-black shadow rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%]">
                          <div className="relative w-full h-[180px]  border-[1px] border-white ">
                            <Image
                              src={imageSrcDM[2]}
                              fill
                              alt="certificate image"
                              loading="lazy"
                            />
                          </div>
                          <h3 className="font-bold text-[#f18350]">
                            {" "}
                     
                          </h3>
                          <p className="text-white">
                          Display your capability in SEO to the hiring manager with the certificate from the best SEO tool

                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="bg-black shadow rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%]">
                          <div className="relative w-full h-[180px]  border-[1px] border-white">
                            <Image
                              src={imageSrc[1]}
                              fill
                              alt="certificate image"
                              loading="lazy"
                            />
                          </div>
                          <h3 className="font-bold text-[#f18350]">
                            {" "}
                            Internship Certificate
                          </h3>
                          <p className="text-white">
                            Showcase experience to recruiters with internship
                            certificate from Skill-AI. Stand out of the crowd
                            with experience.
                          </p>
                        </div>
                      </>
                    )}

                    <>
                      <div className="bg-black shadow d-flex justify-center items-center text-center rounded-lg px-7 py-4 flex flex-col gap-3 min-[481px]:w-[75%] h-[100%]">
                        <h2 className="text-white">
                          Download All 10+ Certificates{" "}
                        </h2>
                        <button onClick={() => popupShow()}>
                          Download <FaDownload />
                        </button>
                      </div>
                    </>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WhyUsAnimate;
