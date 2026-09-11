import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { Pagination, FreeMode } from "swiper";

const CourseSlider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  return mounted ? (
    <div className="px-28 max-sm:px-5 max-sm:py-5 py-10 flex flex-col gap-4">
      <h3 className="text-4xl max-sm:text-2xl font-bold">Our Courses</h3>
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
          1281: { slidesPerView: 2.1, spaceBetween: 20 },
          801: { slidesPerView: 2.5, spaceBetween: 10 },
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
        <SwiperSlide className="h-[300px] mb-[55px]">
          <Link href="https://courses.skillslash.com/learn/Machine-Learning-with-Applied-Statistics">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded pt-2 pl-[2px]">
                  <Image
                    src="/cdn/Home/coursesection/ml-icon.svg"
                    alt="data science course"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] text-left max-sm:text-[16px] max-sm:font-semibold">
                  Machine Learning with Applied Statistics
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>6+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/Machine-Learning-with-Applied-Statistics">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://courses.skillslash.com/learn/NLP-for-Data-Science">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded pt-1 flex justify-center items-center">
                  <Image
                    src="/cdn/Home/coursesection/NLP-icon.svg"
                    alt="data science course"
                    width={65}
                    height={65}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] w-[60%] text-left max-sm:text-[16px] max-sm:font-semibold">
                  Natural Language Processing
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>9+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/NLP-for-Data-Science">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://courses.skillslash.com/learn/PYTHON-BOOTCAMP">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded pt-1 flex justify-center items-center">
                  <Image
                    src="/cdn/Home/coursesection/python-icon.svg"
                    alt="data science course"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] text-left max-sm:text-[16px] max-sm:font-semibold">
                  Python for Data Science
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>9+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/PYTHON-BOOTCAMP">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://courses.skillslash.com/learn/Tableau-Quiz">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded pt-1 flex justify-center items-center">
                  <Image
                    src="/cdn/Home/coursesection/tableau.svg"
                    alt="data science course"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] text-left max-sm:text-[16px] max-sm:font-semibold">
                  Tableau
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>9+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/Tableau-Quiz">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://courses.skillslash.com/learn/SQL-Course">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded pt-1 flex justify-center items-center">
                  <Image
                    src="/cdn/Home/coursesection/sql-icon.svg"
                    alt="data science course"
                    width={55}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] text-left max-sm:text-[16px] max-sm:font-semibold">
                  SQL
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>16+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/SQL-Course">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://courses.skillslash.com/learn/PowerBI-Quiz">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded pt-1 flex justify-center items-center">
                  <Image
                    src="/cdn/Home/coursesection/powerBI-icon-1.svg"
                    alt="data science course"
                    width={105}
                    height={70}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] text-left max-sm:text-[16px] max-sm:font-semibold">
                  PowerBI
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>5+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/PowerBI-Quiz">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://courses.skillslash.com/learn/Computer-Vision-Course">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded flex justify-center items-center">
                  <Image
                    src="/cdn/Home/coursesection/computer-vision.svg"
                    alt="data science course"
                    width={60}
                    height={60}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] text-left max-sm:text-[16px] max-sm:font-semibold">
                  Computer Vision
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>5+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/Computer-Vision-Course">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://courses.skillslash.com/learn/Deep-Learning-quiz">
            <div className="shadow rounded-lg bg-[#ede9ff] ">
              <div className="flex items-center gap-4 px-8 max-sm:px-3 max-sm:py-4 py-7">
                <div className="h-[80px] w-[90px] bg-white rounded pt-1 flex justify-center items-center">
                  <Image
                    src="/cdn/Home/coursesection/deep-learning-icon.svg"
                    alt="data science course"
                    width={70}
                    height={70}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold leading-[36px] text-[25px] text-left max-sm:text-[16px] max-sm:font-semibold">
                  Deep Learning
                </h3>
              </div>
              <div className="bg-white flex px-6 max-sm:px-3 py-4 max-sm:py-3 rounded-b-lg gap-4 max-sm:gap-2 text-sm max-sm:text-[11px] items-center justify-between">
                <span>6+ hrs of lessons</span>
                <span>Live Doubt Classes</span>
                <span>Live Projects</span>
                <Link href="https://courses.skillslash.com/learn/Deep-Learning-quiz">
                  <button className="text-xs px-4 py-2">Start Learning</button>
                </Link>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
      {/* <div className="grid grid-cols-[45%,45%,45%,45%] max-sm:grid-cols-[92%,92%,92%,92%] gap-8 max-sm:gap-5 overflow-scroll pb-4 pl-2">
      </div> */}
    </div>
  ) : (
    ""
  );
};

export default CourseSlider;
