import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import TabData from "./TabData";
import styles from "../Skills/Home/Tabs/Tabs.module.css";

import { MdOutlineLocalFireDepartment, MdDataSaverOff } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";

import { BsCheck } from "react-icons/bs";
const Tabs = () => {
  const [viewAll, setViewAll] = useState(true);
  const [oneYear, setOneYear] = useState(false);
  const [nonTech, setNonTech] = useState(false);
  const [manager, setManager] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;

    if (width < 801) {
      setMobile(true);
    }
    if (width > 801) {
      setMobile(false);
    }
  });

  return (
    <div className={styles.wrapper}>
      <h2 className="text-4xl font-medium max-sm:text-2xl">
        Explore Our Courses
      </h2>
      <div className={styles.MenuTabs}>
        <div className={styles.leftPanel}>
          <>
            {mobile ? (
              <span
                key={TabData[0].id}
                id="0"
                onClick={() => {
                  setViewAll(true);
                  setOneYear(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={viewAll ? styles.spanActive : styles.span}
              >
                <span>
                  <MdOutlineLocalFireDepartment
                    className={
                      viewAll ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[0].title}
                </span>

                <IoIosArrowDown />
              </span>
            ) : (
              <span
                key={TabData[0].id}
                id="0"
                onClick={() => {
                  setViewAll(true);
                  setOneYear(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={viewAll ? styles.spanActive : styles.span}
              >
                <span>
                  <MdOutlineLocalFireDepartment
                    className={
                      viewAll ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[0].title}
                </span>
                <IoIosArrowForward />
              </span>
            )}

            {viewAll ? (
              <div className={styles.gridWrap}>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 228+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header-final-year.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Final Year Student
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 246+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-analytics-image.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Analytics- Non Tech Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 206+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {mobile ? (
              <span
                key={TabData[1].id}
                id="1"
                onClick={() => {
                  setOneYear(true);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={oneYear ? styles.spanActive : styles.span}
              >
                <span>
                  <MdOutlineLocalFireDepartment
                    className={
                      oneYear ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  Self Peaced
                </span>
                <IoIosArrowDown />
              </span>
            ) : (
              <span
                key={TabData[1].id}
                id="1"
                onClick={() => {
                  setOneYear(true);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(false);
                }}
                className={oneYear ? styles.spanActive : styles.span}
              >
                <span>
                  <MdDataSaverOff
                    className={
                      oneYear ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  Self Peaced
                </span>

                <IoIosArrowForward />
              </span>
            )}
            {oneYear ? (
              <div className={styles.gridWrap}>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 228+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header-final-year.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Final Year Student
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 246+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-analytics-image.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Analytics- Non Tech Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 206+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Dsa-system-design-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      DSA + System Design (FAANG interviews)
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 320+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="/selfpaced/dsa-system-design.json">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="/selfpaced/dsa-system-design.json">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/ml-with-statitics-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Machine Learning with Applied Statistics
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 6+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Machine-Learning-with-Applied-Statistics">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Machine-Learning-with-Applied-Statistics">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/NLP-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Natural Language Processing</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 9+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/NLP-for-Data-Science">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/NLP-for-Data-Science">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/SQL-header-immage.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">SQL</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 16+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/SQL-Course">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/SQL-Course">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/python-header-image.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Python For Data Science</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 64+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/PYTHON-BOOTCAMP">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/PYTHON-BOOTCAMP">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Power-BI-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Power BI</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 5+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/PowerBI-Quiz">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/PowerBI-Quiz">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/computer-vision-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Computer Vision</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 5+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Computer-Vision-Course">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Computer-Vision-Course">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Deep-learnings-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Deep Learning</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 6+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Deep-Learning-quiz">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Deep-Learning-quiz">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Tableau-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">TABLEAU</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 160+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Tableau-Quiz">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Tableau-Quiz">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* {mobile ? (
              <span
                key={TabData[2].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(true);
                }}
                className={nonTech ? styles.spanActive : styles.span}
              >
                <span>
                  <BsLaptop
                    className={
                      nonTech ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[2].title}
                </span>
                <IoIosArrowDown />
              </span>
            ) : (
              <span
                key={TabData[2].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setManager(false);
                  setNonTech(true);
                }}
                className={nonTech ? styles.spanActive : styles.span}
              >
                <span>
                  <BsLaptop
                    className={
                      nonTech ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[2].title}
                </span>

                <IoIosArrowForward />
              </span>
            )}

            {nonTech ? (
              <div className={styles.gridWrap}>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/web/New-UI/fCourse.svg"
                      alt="full stack course"
                      width={406}
                      height={253}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4>Full Stack Developer Course With Certification</h4>
                    <div className={styles.lines}></div>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      10 Months
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      5+ Industry Projects
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      EMI @INR 7916/month
                    </span>
                    <div className={styles.line}></div>
                    <Link href="/full-stack-developer-course">
                      <button className={styles.gridBtn}>View Program</button>
                    </Link>
                  </div>
                </div>

                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/web/New-UI/fsCourse.svg"
                      alt="web development course"
                      width={406}
                      height={199}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4>Web Development Course With Certification</h4>
                    <div className={styles.lines}></div>
                    <span>
                      <BsCheck className={styles.gridIcon} />7 Months
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      15+ Industry Projects
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      EMI @INR 3,500/month
                    </span>
                    <div className={styles.line}></div>
                    <Link href="/web-development-course">
                      <button className={styles.gridBtn}>View Program</button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )} */}
          </>
        </div>
        {mobile ? (
          ""
        ) : (
          <div className={styles.middlePanel}>
            {viewAll ? (
              <div className={styles.gridWrap}>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 228+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header-final-year.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Final Year Student
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 246+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-analytics-image.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Analytics- Non Tech Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 206+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {oneYear ? (
              <div className={styles.gridWrap}>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 228+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-Science-And-Ai-header-final-year.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Science & AI Bootcamp - Final Year Student
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 246+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Science---AI-Bootcamp---Final-Year-Student">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Data-analytics-image.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Data Analytics- Non Tech Professionals
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 206+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Data-Analytics--Non-Tech-Professionals">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Dsa-system-design-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      DSA + System Design (FAANG interviews)
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 320+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="/selfpaced/dsa-system-design.json">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="/selfpaced/dsa-system-design.json">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/ml-with-statitics-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">
                      Machine Learning with Applied Statistics
                    </h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 6+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Machine-Learning-with-Applied-Statistics">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Machine-Learning-with-Applied-Statistics">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/NLP-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Natural Language Processing</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 9+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/NLP-for-Data-Science">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/NLP-for-Data-Science">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/SQL-header-immage.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">SQL</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 16+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/SQL-Course">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/SQL-Course">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/python-header-image.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Python For Data Science</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 64+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/PYTHON-BOOTCAMP">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/PYTHON-BOOTCAMP">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Power-BI-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Power BI</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 5+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/PowerBI-Quiz">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/PowerBI-Quiz">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/computer-vision-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Computer Vision</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 5+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Computer-Vision-Course">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Computer-Vision-Course">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Deep-learnings-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">Deep Learning</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 6+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Deep-Learning-quiz">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Deep-Learning-quiz">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/New_skillslash/Homepage/Course-Header/Tableau-header.svg"
                      alt="data science course"
                      width={232}
                      height={250}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4 className="mb-1">TABLEAU</h4>
                    <div>
                      <span>
                        <BsCheck className={styles.gridIcon} /> 160+ hrs
                        self-paced videos
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Quizzes and assignments
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        1:1 Doubt clearing session
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />2 Live
                        instructor-led projects
                      </span>
                      <span>
                        <BsCheck className={styles.gridIcon} />
                        Triple Certification
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Link href="https://courses.skillslash.com/learn/Tableau-Quiz">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/Tableau-Quiz">
                        <button className={styles.gridBtn}>
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* 
            {nonTech ? (
              <div className={styles.gridWrap}>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/web/New-UI/fCourse.svg"
                      alt="full stack course"
                      width={406}
                      height={253}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4>Full Stack Developer Course With Certification</h4>
                    <div className={styles.lines}></div>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      10 Months
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      5+ Industry Projects
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      EMI @INR 7916/month
                    </span>
                    <div className={styles.line}></div>
                    <Link href="/full-stack-developer-course">
                      <button className={styles.gridBtn}>View Program</button>
                    </Link>
                  </div>
                </div>

                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/web/New-UI/fsCourse.svg"
                      alt="web development course"
                      width={406}
                      height={199}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4>Web Development Course With Certification</h4>
                    <div className={styles.lines}></div>
                    <span>
                      <BsCheck className={styles.gridIcon} />7 Months
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      15+ Industry Projects
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      EMI @INR 3,500/month
                    </span>
                    <div className={styles.line}></div>
                    <Link href="/web-development-course">
                      <button className={styles.gridBtn}>View Program</button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {manager ? (
              <div className={styles.gridWrap}>
                <div className={styles.gridBox}>
                  <div className={styles.gridImg}>
                    <Image
                      src="/cdn/static/web/New-UI/fsCourse.svg"
                      alt="web development course"
                      width={406}
                      height={199}
                      className={styles.gridBanner}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.gridInnerBox}>
                    <h4>Web Development Course With Certification</h4>
                    <div className={styles.lines}></div>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      10 Months
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      5+ Industry Projects
                    </span>
                    <span>
                      <BsCheck className={styles.gridIcon} />
                      EMI @INR 4916/month
                    </span>
                    <div className={styles.line}></div>
                    <Link href="/full-stack-developer-course">
                      <button className={styles.gridBtn}>View Program</button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
