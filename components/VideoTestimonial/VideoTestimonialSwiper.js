import styles from "./VideoTestimonial.module.css";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsFillPlayFill } from "react-icons/bs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, FreeMode, Autoplay } from "swiper";
import Image from "next/image";
import VideoPopup from "../VideoPopup/VideoPopup";

const VideoTestimonialSwiper = ({ event, review }) => {
  const [mobile, setMobile] = useState(false);
  const [spaceBetween, setSpaceBetween] = useState(40);
  const [slidePerView, setSlidePerView] = useState(2.2);
  const [vId, setVId] = useState("");

  useEffect(() => {
    if (event) {
      setSlidePerView(3);
      setSpaceBetween(30);
    }
    if (event === false) {
      setSlidePerView(2);
      setSpaceBetween(30);
    }
  }, [mobile]);
  const [video, setVideo] = useState(false);

  const videoShow = (id) => {
    setVideo(true);
    setVId(id);
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  return mounted ? (
    <>
      <VideoPopup triggers={video} setTriggers={setVideo} ids={vId} />
      <Swiper
        slidesPerView={event ? slidePerView : 2.2}
        spaceBetween={event ? spaceBetween : 40}
        freeMode={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        breakpoints={{
          1281: { slidesPerView: 2.1, spaceBetween: 40 },
          1024: { slidesPerView: 2.2, spaceBetween: 40 },
          961: { slidesPerView: 1.8, spaceBetween: 20 },
          801: { slidesPerView: 2.3, spaceBetween: 40 },
          641: { slidesPerView: 2.1, spaceBetween: 10 },
          481: { slidesPerView: 1.6, spaceBetween: 10 },
          100: { slidesPerView: 1.2, spaceBetween: 10 },
        }}
        loop={true}
        style={{ "--swiper-theme-color": "#4f419a" }}
        loopFillGroupWithBlank={true}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
      >
        {review.map((data) => {
          return (
            <SwiperSlide key={data.id} id="1" className={styles.ReviewBox}>
              <div className={styles.profileWrapper}>
                <Image
                  src={data.img}
                  alt={data.alt}
                  loading="lazy"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <BsFillPlayFill
                  className={styles.playIcon}
                  onClick={() => videoShow(data.link)}
                />
              </div>

              <div className={styles.nameWrap}>
                <p className={styles.quote}>"{data.para}"</p>
                <h3>{data.name}</h3>
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

export default VideoTestimonialSwiper;
