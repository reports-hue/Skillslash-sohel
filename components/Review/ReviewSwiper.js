import styles from "./Reviews.module.css";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsFillStarFill } from "react-icons/bs";
import { FaStarHalf } from "react-icons/fa";
// Import Swiper styles
import { FcGoogle } from "react-icons/fc";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, FreeMode } from "swiper";
import Image from "next/image";
const ReviewPopup = dynamic(() => import("../ReviewPopup/ReviewPopup"));

const ReviewSwiper = ({ event, review }) => {
  // const [mobile, setMobile] = useState(false);

  const [PImg, setPImg] = useState();
  const [pName, setPName] = useState();
  const [pDesc, setPDesc] = useState();

  const [readMore, setReadMore] = useState({
    open: false,
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  // useEffect(() => {
  //   const swiper = new Swiper(".swiper-container", {
  //     // Your Swiper configuration options go here
  //     // Example: direction: 'horizontal', loop: true, etc.
  //   });

  //   swiper.on("slideChange", function () {
  //     const middleSlideIndex = Math.floor(swiper.slides.length / 2);

  //     // Remove the active class from all slides
  //     swiper.slides.removeClass("mmOpacity");

  //     // Add the custom active class to the middle slide
  //     swiper.slides.eq(middleSlideIndex).addClass("mmOpacity");
  //   });
  // }, []);
  // useEffect(() => {
  //   // let width = window.innerWidth;
  //   // if (width < 481) {
  //   //   setSlidePerView(1.4);
  //   //   setMobile(true);
  //   // }
  //   // if (width < 1281) {
  //   //   setSpaceBetween(20);
  //   //   setSlidePerView(3.4);
  //   // }
  //   // if (width > 1281) {
  //   //   setSpaceBetween(60);
  //   // }
  //   // if (width < 801) {
  //   //   setSpaceBetween(10);
  //   //   setSlidePerView(2.5);
  //   // }
  //   // if (width < 641) {
  //   //   setSpaceBetween(10);
  //   //   setSlidePerView(1.6);
  //   // }
  //   // if (event) {
  //   //   setSlidePerView(3);
  //   //   setSpaceBetween(30);
  //   // }
  //   // if (event === false) {
  //   //   setSlidePerView(2);
  //   //   setSpaceBetween(30);
  //   // }
  // }, []);
  const [popups, setPopups] = useState(false);
  const popupShow = () => {
    setPopups(true);
  };
  return mounted ? (
    <>
      <ReviewPopup
        trigger={popups}
        setTrigger={setPopups}
        title={pName}
        desc={pDesc}
        imgSrc={PImg}
      />
      <Swiper
        slidesPerView={3.7}
        spaceBetween={20}
        freeMode={true}
        initialSlide="2"
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        breakpoints={{
          1281: { slidesPerView: 3, spaceBetween: 40 },
          801: { slidesPerView: 2.5, spaceBetween: 30 },
          641: { slidesPerView: 1.6, spaceBetween: 10 },
          481: { slidesPerView: 1, spaceBetween: 10 },
          200: { slidesPerView: 1, spaceBetween: 10 },
        }}
        loop={true}
        style={{ "--swiper-theme-color": "#4f419a" }}
        loopFillGroupWithBlank={true}
        grabCursor={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {review.map((data) => {
          return (
            <SwiperSlide
              key={data.id}
              className={styles.ReviewBox}
              onClick={() => {
                setPImg(data.img);
                setPDesc(data.desc);
                setPName(data.name);
                popupShow();
              }}
            >
              <Image
                src="/cdn/NewDatascience/review-bg.svg"
                fill
                alt="review bg"
                className="z-[-1]"
              />
              <div className={styles.nameWrap}>
                <Image
                  src={data.img}
                  width="50"
                  height="50"
                  alt={data.alt}
                  loading="lazy"
                />
                <div className="flex flex-col items-start ">
                  <h3>{data.name}</h3>
                  <div className={styles.rating}>
                    {data.rating === "low" ? (
                      <>
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                      </>
                    ) : (
                      ""
                    )}
                    {data.rating === "medium" ? (
                      <>
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <FaStarHalf className={styles.star} />
                      </>
                    ) : (
                      ""
                    )}
                    {data.rating === "high" ? (
                      <>
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                        <BsFillStarFill className={styles.star} />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <p>
                {data.para}

                <span
                  onClick={() => {
                    setPImg(data.img);
                    setPDesc(data.desc);
                    setPName(data.name);
                    popupShow();
                  }}
                  className={styles.readMore}
                >
                  {readMore.open ? " Read Less" : " Read More"}
                </span>
              </p>
              <div className={styles.profileWrapper}>
                <FcGoogle className="text-4xl" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  ) : (
    ""
  );
};

export default ReviewSwiper;
