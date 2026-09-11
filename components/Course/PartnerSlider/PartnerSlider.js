import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

import Image from "next/image";

const PartnerSlider = ({ swiperData, getHired }) => {
  const [mobile, setMobile] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(getHired ? 4 : 3);
  const [spaceBetween, setSpaceBetween] = useState(getHired ? 90 : 20);
  useEffect(() => {
    let width = window.innerWidth;

    if (width < 801) {
      setSlidesPerView(getHired ? 3 : 7);
      setSpaceBetween(20);
    }
    if (width < 481) {
      setSlidesPerView(getHired ? 2 : 3);
      setSpaceBetween(getHired ? 20 : 10);
      setMobile(true);
    }
    if (width < 961) {
      setSlidesPerView(3);
      setSpaceBetween(20);
    }
    if (width < 641) {
      setSlidesPerView(getHired ? 2 : 5);
      setSpaceBetween(20);
    }
  });
  return (
    <div>
      <Swiper
        spaceBetween={mobile ? 30 : spaceBetween}
        centeredSlides={true}
        slidesPerView={mobile ? 3 : slidesPerView}
        slidesPerGroup={getHired ? 2 : 1}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        style={{ width: "100%" }}
        grabCursor={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {swiperData.map((data) => {
          return (
            <SwiperSlide key={data.id}>
              <Image
                src={data.img}
                alt="payment partner"
                width={mobile ? data.mWidth : data.cWidth}
                height={mobile ? data.mHeight : data.cHeight}
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PartnerSlider;
