import React from "react";
import styles from "./Slider.module.css";
import Image from "next/image";
const Slider = ({NoTitle}) => {
  const firstSlide = [
    {
      src: "/cdn/Home/slider/Makemmytrip.svg",
      width: 234,
      height: 85,
      id: 1,
    },
    {
      src: "/cdn/Home/slider/Juspay.svg",
      width: 237,
      height: 85,
      id: 2,
    },
    {
      src: "/cdn/Home/slider/IBM.svg",
      width: 151,
      height: 85,
      id: 3,
    },
    {
      src: "/cdn/Home/slider/Google.svg",
      width: 172,
      height: 85,
      id: 4,
    },
    {
      src: "/cdn/Home/slider/Flipkart.svg",
      width: 206,
      height: 85,
      id: 5,
    },
    {
      src: "/cdn/Home/slider/facebool.svg",
      width: 262,
      height: 85,
      id: 6,
    },
    {
      src: "/cdn/Home/slider/Dell.svg",
      width: 186,
      height: 85,
      id: 7,
    },
    {
      src: "/cdn/Home/slider/curefit.svg",
      width: 166,
      height: 85,
      id: 8,
    },
  ];
  const secondSlide = [
    {
      src: "/cdn/Home/slider/cred.svg",
      width: 176,
      height: 85,
      id: 1,
    },
    {
      src: "/cdn/Home/slider/amazon.svg",
      width: 183,
      height: 85,
      id: 2,
    },
    {
      src: "/cdn/Home/slider/paytm.svg",
      width: 182,
      height: 85,
      id: 3,
    },
    {
      src: "/cdn/Home/slider/qualcomm.svg",
      width: 264,
      height: 85,
      id: 4,
    },
    {
      src: "/cdn/Home/slider/samsung.svg",
      width: 171,
      height: 85,
      id: 5,
    },
    {
      src: "/cdn/Home/slider/twitter.svg",
      width: 271,
      height: 85,
      id: 6,
    },
    {
      src: "/cdn/Home/slider/zoho.svg",
      width: 171,
      height: 85,
      id: 7,
    },
    {
      src: "/cdn/Home/slider/apple.svg",
      width: 171,
      height: 85,
      id: 8,
    },
  ];
  return (
<div className="px-28 py-10 max-sm:px-5 max-sm:w-full w-[1200px] m-auto mx-auto">
      {NoTitle ? (<></>):(<> <h2 className="text-3xl font-semibold text-center mb-3 max-sm:text-xl">
        Our Students at top tech companies
      </h2></>)}
     
      <div className="relative overflow-hidden">
        <div
          className="absolute h-full w-[30%] z-10"
          style={{
            background: "rgb(255,255,255)",
            background:
              "linear-gradient(90deg, rgba(255,255,255,1) 33%, rgba(255,255,255,0) 100%)",
          }}
        ></div>
        <div
          className="absolute h-full w-[30%] z-10 right-0"
          style={{
            background: "rgb(255,255,255)",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 67%)",
          }}
        ></div>
        <div className={styles.Marquee}>
          <div className={styles.MarqueeGroup}>
            {firstSlide.map((el, index) => (
              <div key={index}>
                <Image src={el.src} height={el.height} width={el.width} />
              </div>
            ))}
          </div>
          <div className={styles.MarqueeGroup}>
            {firstSlide.map((el, index) => (
              <div key={index}>
                <Image src={el.src} height={el.height} width={el.width} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.Marquee}>
          <div className={styles.MarqueeGroup2}>
            {secondSlide.map((el, index) => (
              <div key={index}>
                <Image src={el.src} height={el.height} width={el.width} />
              </div>
            ))}
          </div>
          <div className={styles.MarqueeGroup2}>
            {secondSlide.map((el, index) => (
              <div key={index}>
                <Image src={el.src} height={el.height} width={el.width} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
