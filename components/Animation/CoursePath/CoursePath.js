import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { BiSolidVideos } from "react-icons/bi";
import { MdQuestionMark } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
function YourComponent() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 600) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const [datasciencePrice, setdatasciencePrice] = useState("₹19,999"); // Default actual price
  const [datascienceactualPrice, setdatascienceactualPrice] =
    useState("₹11,999");
  const [dataanalyticsPrice, setdataanalyticsPrice] = useState("₹14,999"); // Default actual price
  const [dataanalyticsactualPrice, setdataanalyticsactualPrice] =
    useState("₹7,999");

  const [DSAPrice, setDSAPrice] = useState("₹14,999"); // Default actual price
  const [DSAactualPrice, setDSAactualPrice] = useState("₹7,999");
  const [link, setLink] = useState("");
  const [showNigeriaForm, setShowNigeriaForm] = useState(false);

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 600) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  // const [datasciencePrice, setdatasciencePrice] = useState("$150"); // Default actual price
  // const [offerPrice, setOfferPrice] = useState(11999);
  // const [link, setLink] = useState("");
  // const [showNigeriaForm, setShowNigeriaForm] = useState(false);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://ipinfo.io/json?token=0fac06a7890a4e"
  //       );
  //       if (response.status === 429) {
  //         throw new Error("Rate limit exceeded. Too many requests.");
  //       }
  //       if (!response.ok) {
  //         throw new Error(
  //           `Failed to fetch location: ${response.status} ${response.statusText}`
  //         );
  //       }
  //       const data = await response.json();
  //       console.log("API Response:", data);
  //       const { country } = data;

  //       if (country === "NG") {
  //         setShowNigeriaForm(true);
  //         setdatasciencePrice("₦ 200,000");
  //         setdatascienceactualPrice("₦ 400,000");

  //         // dataanalyticsPrice

  //         setdataanalyticsPrice("₦ 150,000");
  //         setdataanalyticsactualPrice("₦300,000");

  //         setDSAPrice("₦ 150,000");
  //         setDSAactualPrice("₦ 300,000 ");
  //         setLink(DataScienceCourseData.data.header.ngCheckout);
  //         console.log("User is in Nigeria. Prices updated.");
  //       } else if (country === "IN") {
  //         setShowNigeriaForm(false);
  //         setdatasciencePrice("₹6,999");
  //         setdatascienceactualPrice("₹11,999");
  //         // dataanalyticsPrice

  //         setdataanalyticsPrice("₹4,999");
  //         setdataanalyticsactualPrice("₹7,999");
  //         setDSAPrice("₹4,999");
  //         setDSAactualPrice("₹7,999");

  //         setLink(DataScienceCourseData.data.header.indCheckout);
  //         console.log("User is in India. Prices updated.");
  //       } else {
  //         // Default to USA
  //         setShowNigeriaForm(false);
  //         setdatasciencePrice("$150");
  //         setOfferPrice(11999);
  //         setLink(DataScienceCourseData.data.header.usaCheckout);
  //         console.log("User is in default location (USA). Prices updated.");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchLocation();
  // }, [link]);
  return (
    <div
      className="h-[1800px] max-sm:h-[2320px] max-[376px]:h-[2500px] px-28 py-10 bg-[#fff7f3] flex flex-col max-sm:px-5 max-sm:py-5"
      ref={ref}
    >
      <h2 className="text-[#FDDACE] text-8xl max-sm:text-3xl font-bold uppercase text-left ml-7 max-sm:ml-0 max-sm:text-center">
        our bootcamp
      </h2>
      <div className="w-full h-full relative max-w-[1000px] flex flex-col">
        <motion.svg
          className="absolute w-max h-max z-0 left-10 top-0 max-sm:hidden"
          preserveAspectRatio="xMidYMax meet"
        >
          <motion.path
            id="backgroundPath"
            fill="none"
            d="M 30 -30 V 100  M 20 100 H 190"
            stroke="black"
            strokeDasharray="5 5"
            strokeWidth="2"
            className="z-0"
            // style={{ pathLength: scrollYProgress }}
          />
          <motion.path
            id="animatedPath"
            fill="none"
            pathLength={30000}
            d="M 30 -30 V 100 H 990 V 400"
            stroke="#f18350"
            strokeWidth="2"
            className="z-10"
            style={{ pathLength: scrollYProgress }}
          />
          <rect
            x="10"
            y="75"
            width="40"
            height="40"
            stroke="#f18350"
            strokeWidth="1"
            rx="4"
            fill="white"
          />
        </motion.svg>
        <div className="bg-white shadow rounded-2xl px-14 pt-14 max-sm:pt-[180px] pb-14 max-sm:pb-10 z-40 relative ml-48 max-sm:ml-0 mt-10 max-sm:mt-16 w-[85%] max-sm:w-[100%]">
          {/* <div className="absolute bg-[#EEEBFF] top-10 max-sm:top-[160px] left-0 font-medium px-4 py-1 rounded-r-2xl">
            For Professionals
          </div> */}
          <div className="flex flex-col gap-4">
            <div className="px-3 py-2 bg-[#EEEBFF] rounded w-[31%] max-sm:w-[70%]">
              <Image
                src="/cdn/Home/coursesection/powered-by-microsoft-home.svg"
                alt="PoweredByMicrosoft"
                width={mobile ? 180 : 230}
                height={mobile ? 19 : 24}
              />
            </div>
            <h3 className="text-4xl max-sm:text-2xl font-bold text-[#f18350] w-[70%] max-sm:w-[100%]">
              Data Science & AI Bootcamp
            </h3>
            <p className="text-black font-medium ">Why this bootcamp?</p>
            <div className="flex gap-8 max-sm:flex-col max-sm:gap-3">
              <div className="flex flex-col gap-7 max-sm:gap-3">
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <BiSolidVideos className="text-[#343434]" />
                  </span>
                  228+ hrs videos Lessons
                </p>
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <MdQuestionMark className="text-[#343434]" />
                  </span>
                  Live Doubt clearing session
                </p>
              </div>
              <div className="flex flex-col gap-7 max-sm:gap-3">
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <FaChalkboardTeacher className="text-[#343434]" />
                  </span>
                  20 Live instructor-led projects
                </p>
                <p className="flex gap-3 items-center text-sm">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <PiCertificate className="text-[#343434]" />
                  </span>
                  Triple Certification
                </p>
              </div>
            </div>
            <div className="flex max-sm:flex-col gap-5 max-sm:gap-3 items-center max-sm:items-start">
              <div>
                <p className="font-semibold flex gap-4 items-center text-[#f18350] text-2xl mt-4 max-sm:mt-3">
                  {datasciencePrice}{" "}
                  {/* <span className=" text-[#4D4D4D] line-through text-lg max-sm:text-[16px] max-sm:font-">
                    {datascienceactualPrice}
                  </span> */}
                </p>
              </div>
              <Link href="/selfpaced/data-science-&-aI-bootcamp">
                <button className="bg-[#f18350] px-3 py-1 mt-4 max-sm:mt-0 max-sm:w-full max-sm:justify-center max-sm:py-2">
                  Explore Bootcamp
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute right-[-150px] top-[50px] max-sm:left-[10px] max-sm:top-[-60px] max-sm:right-[10px] max-sm:flex max-sm:items-center max-sm:justify-center ">
            <Image
              src="/cdn/Home/coursesection/data-science-header.svg"
              alt="data-science-course"
              height={294}
              width={mobile ? 290 : 416}
            />
          </div>
        </div>
        <motion.svg
          className="absolute w-max h-[500px] z-0  top-[23.4%] right-[-17%] max-sm:hidden"
          preserveAspectRatio="xMidYMax meet"
        >
          <motion.path
            id="backgroundPath"
            fill="none"
            d="M 275 -30 V 250 M 275 250  H 140"
            stroke="black"
            strokeDasharray="5 5"
            strokeWidth="2"
            className="z-0"
            // style={{ pathLength: scrollYProgress }}
          />
          <motion.path
            id="animatedPath"
            fill="none"
            pathLength={30000}
            d="M 275 -30 V 250 H 140"
            stroke="#f18350"
            strokeWidth="2"
            className="z-10"
            style={{ pathLength: scrollYProgress }}
          />
          <rect
            x="85%"
            y="230"
            width="40"
            height="40"
            stroke="#f18350"
            strokeWidth="1"
            rx="4"
            fill="white"
          />
        </motion.svg>
        <div className="bg-white shadow rounded-2xl px-14 pt-14 max-sm:pt-[180px] pb-14 max-sm:pb-10 z-40 relative ml-56 max-sm:ml-0 mt-32  w-[85%] flex items-end justify-end max-sm:justify-start max-sm:w-[100%]">
          {/* <div className="absolute bg-[#EEEBFF] top-10 max-sm:top-[160px] right-0 font-medium px-4 py-1 rounded-l-2xl">
            For Non-Tech Professionals
          </div> */}
          <div className="flex flex-col gap-4">
            <div className="px-3 py-2 bg-[#EEEBFF] rounded w-[47%] max-sm:w-[80%]">
              <Image
                src="/cdn/Home/coursesection/powered-by-microsoft-home.svg"
                alt="PoweredByMicrosoft"
                width={mobile ? 180 : 230}
                height={mobile ? 19 : 24}
              />
            </div>
            <h3 className="text-4xl font-bold text-[#f18350]  max-sm:text-2xl ">
              Data Analytics Bootcamp
            </h3>
            <p className="text-black font-medium ">Why this bootcamp?</p>
            <div className="flex gap-8 max-sm:flex-col max-sm:gap-3">
              <div className="flex flex-col gap-7 max-sm:gap-3">
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <BiSolidVideos className="text-[#343434]" />
                  </span>
                  206+ hrs videos Lessons
                </p>
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <MdQuestionMark className="text-[#343434]" />
                  </span>
                  Live Doubt clearing session
                </p>
              </div>
              <div className="flex flex-col gap-7 max-sm:gap-3">
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <FaChalkboardTeacher className="text-[#343434]" />
                  </span>
                  20 Live instructor-led projects
                </p>
                <p className="flex gap-3 items-center text-sm">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <PiCertificate className="text-[#343434]" />
                  </span>
                  Triple Certification
                </p>
              </div>
            </div>
            <div className="flex max-sm:flex-col gap-5 max-sm:gap-3 items-center max-sm:items-start">
              <div>
                <p className="font-semibold flex gap-4 items-center text-[#f18350] text-2xl mt-4 max-sm:mt-3">
                  {dataanalyticsPrice}
                  {/* <span className=" text-[#4D4D4D] line-through text-lg max-sm:text-[16px] max-sm:font-">
                    {dataanalyticsactualPrice}
                  </span> */}
                </p>
              </div>
              <Link href="/selfpaced/data-analytics-bootcamp">
                <button className="bg-[#f18350] px-3 py-1 mt-4 max-sm:mt-0 max-sm:w-full max-sm:justify-center max-sm:py-2">
                  Explore Bootcamp
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute left-[-165px] top-[52px] max-sm:left-[10px] max-sm:top-[-60px] max-sm:right-[10px] max-sm:flex max-sm:items-center max-sm:justify-center">
            <Image
              src="/cdn/Home/coursesection/data-analytics-header.svg"
              alt="data-analytics-course"
              height={294}
              width={mobile ? 290 : 416}
            />
          </div>
        </div>
        <motion.svg
          className="absolute w-max h-[470px] z-0 left-20 top-[56%] max-sm:hidden"
          preserveAspectRatio="xMidYMax meet"
        >
          <motion.path
            id="backgroundPath"
            fill="none"
            d="M 25 0 V 230 M 25 230 H 170"
            stroke="black"
            strokeDasharray="5 5"
            strokeWidth="2"
            className="z-0"
            // style={{ pathLength: scrollYProgress }}
          />
          <motion.path
            id="animatedPath"
            fill="none"
            d="M 25 -30 V 230 H 170"
            stroke="#f18350"
            strokeWidth="2"
            className="z-10"
            style={{ pathLength: scrollYProgress }}
          />
          <rect
            x="5"
            y="210"
            width="40"
            height="40"
            stroke="#f18350"
            strokeWidth="1"
            rx="4"
            fill="white"
          />
        </motion.svg>
        <Image
          src="/cdn/Home/coursesection/data-analytics-non-tech-pro.svg"
          width="40"
          height="40"
          className="z-10 absolute left-[85px] top-[69%] max-sm:hidden"
          alt="data analytics"
        />
        <Image
          src="/cdn/Home/coursesection/data-science-for-clg-icon.svg"
          width="40"
          height="40"
          className="z-10 absolute top-[37.8%] right-[-16.7%] max-sm:hidden"
          alt="data analytics"
        />
        <Image
          src="/cdn/Home/coursesection/job-icon.svg"
          width="40"
          height="40"
          className="z-10 absolute left-[49px] top-[75px] max-sm:hidden"
          alt="data analytics"
        />

        <div className="bg-white shadow rounded-2xl px-14 pt-14 max-sm:pt-[180px] pb-14 max-sm:pb-10 z-40 relative ml-48 max-sm:ml-0 mt-32 max-sm:mt-32 w-[85%] max-sm:w-[100%]">
          {/* <div className="absolute bg-[#EEEBFF] top-10  max-sm:top-[160px] left-0 font-medium px-4 py-1 rounded-r-2xl">
            For Programmers
          </div> */}

          <div className="flex flex-col gap-4">
            <div className="w-[45%] max-sm:w-[100%] bg-[#f3f1ff] py-3 px-3 rounded top-[10px]">
              <Image
                src="/cdn/Home/coursesection/FAANG-Software-Developer-as-Trainers.svg"
                alt="FAANG trainers"
                width={300}
                height={31}
              />
            </div>
            <h3 className="text-4xl max-sm:text-2xl font-bold text-[#f18350] w-[70%] max-sm:w-[100%] ">
              DSA & System Design Bootcamp
            </h3>
            <p className="text-black font-medium ">Why this bootcamp?</p>
            <div className="flex gap-8 max-sm:flex-col max-sm:gap-3">
              <div className="flex flex-col gap-7 max-sm:gap-3">
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <BiSolidVideos className="text-[#343434]" />
                  </span>
                  83+ hrs self-pased videos
                </p>
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <MdQuestionMark className="text-[#343434]" />
                  </span>
                  Live Doubt clearing session
                </p>
              </div>
              <div className="flex flex-col gap-7 max-sm:gap-3">
                <p className="flex gap-3 items-center text-sm ">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <FaChalkboardTeacher className="text-[#343434]" />
                  </span>
                  12 Live instructor-led projects
                </p>
                <p className="flex gap-3 items-center text-sm">
                  <span className="bg-[#eff1ff] px-1 py-1 rounded-sm">
                    <PiCertificate className="text-[#343434]" />
                  </span>
                  FAANG trainers
                </p>
              </div>
            </div>
            <div className="flex max-sm:flex-col gap-5 max-sm:gap-3 items-center max-sm:items-start">
              <div>
                <p className="font-semibold flex gap-4 items-center text-[#f18350] text-2xl mt-4 max-sm:mt-3">
                  {DSAPrice}
                  {/* <span className=" text-[#4D4D4D] line-through text-lg max-sm:text-[16px] max-sm:font-">
                    {DSAactualPrice}
                  </span> */}
                </p>
              </div>
              <Link href="/selfpaced/dsa-system-design-bootcamp">
                <button className="bg-[#f18350] px-3 py-1 mt-4 max-sm:mt-0 max-sm:w-full max-sm:justify-center max-sm:py-2">
                  Explore Bootcamp
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute right-[-150px] top-[75px] max-sm:left-[10px] max-sm:top-[-60px] max-sm:right-[10px] max-sm:flex max-sm:items-center max-sm:justify-center">
            <Image
              src="/cdn/Home/coursesection/dsa-header.svg"
              alt="data-science-course"
              height={294}
              width={mobile ? 290 : 416}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourComponent;
