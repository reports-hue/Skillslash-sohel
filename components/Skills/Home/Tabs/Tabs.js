import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TabData from "./TabData";
import styles from "./Tabs.module.css";
import { BsCheck } from "react-icons/bs";
const Tabs = () => {
  const [viewAll, setViewAll] = useState(true);
  const [popular, setPopular] = useState(false);
  const [bundle, setBundle] = useState(false);
  const [single, setSingle] = useState(false);
  const [oneYear, setOneYear] = useState(false);
  const [nonTech, setNonTech] = useState(false);
  // const [manager, setManager] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;

    if (width < 801) {
      setMobile(true);
    }
    if (width > 801) {
      setMobile(false);
    }
  }, []);

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

                  setNonTech(false);
                  setPopular(false);
                  setBundle(false);
                  setSingle(false);
                }}
                className={viewAll ? styles.spanActive : styles.span}
              >
                <span>All</span>
              </span>
            ) : (
              <span
                key={TabData[0].id}
                id="0"
                onClick={() => {
                  setViewAll(true);
                  setOneYear(false);

                  setNonTech(false);
                  setPopular(false);
                  setBundle(false);
                  setSingle(false);
                }}
                className={viewAll ? styles.spanActive : styles.span}
              >
                <span>All</span>
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
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
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
            {mobile ? (
              <span
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setNonTech(false);
                  setPopular(true);
                  setBundle(false);
                  setSingle(false);
                }}
                className={popular ? styles.spanActive : styles.span}
              >
                <span>Popular</span>
              </span>
            ) : (
              <span
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setNonTech(false);
                  setPopular(true);
                  setBundle(false);
                  setSingle(false);
                }}
                className={popular ? styles.spanActive : styles.span}
              >
                <span>Popular</span>
              </span>
            )}
            {popular ? (
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
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);

                  setNonTech(false);
                  setPopular(false);
                  setBundle(false);
                  setSingle(true);
                }}
                className={single ? styles.spanActive : styles.span}
              >
                <span>Single</span>
              </span>
            ) : (
              <span
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setNonTech(false);
                  setPopular(false);
                  setBundle(false);
                  setSingle(true);
                }}
                className={single ? styles.spanActive : styles.span}
              >
                <span>Single</span>
              </span>
            )}
            {single ? (
              <div className={styles.gridWrap}>
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
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
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
            {mobile ? (
              <span
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setNonTech(false);
                  setPopular(false);
                  setBundle(true);
                  setSingle(false);
                }}
                className={bundle ? styles.spanActive : styles.span}
              >
                <span>Bundle</span>
              </span>
            ) : (
              <span
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
                  setNonTech(false);
                  setPopular(false);
                  setBundle(true);
                  setSingle(false);
                }}
                className={bundle ? styles.spanActive : styles.span}
              >
                <span>Bundle</span>
              </span>
            )}
            {bundle ? (
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

                  setNonTech(false);
                  setPopular(false);
                  setBundle(false);
                  setSingle(false);
                }}
                className={oneYear ? styles.spanActive : styles.span}
              >
                <span>Data Science and AI</span>
              </span>
            ) : (
              <span
                key={TabData[1].id}
                id="1"
                onClick={() => {
                  setOneYear(true);
                  setViewAll(false);

                  setNonTech(false);
                  setPopular(false);
                  setBundle(false);
                  setSingle(false);
                }}
                className={oneYear ? styles.spanActive : styles.span}
              >
                <span>Data Science and AI</span>
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
              </div>
            ) : (
              ""
            )}
            {mobile ? (
              <span
                key={TabData[2].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);

                  setNonTech(true);
                  setPopular(false);
                  setBundle(false);
                  setSingle(false);
                }}
                className={nonTech ? styles.spanActive : styles.span}
              >
                <span>Software Development</span>
              </span>
            ) : (
              <span
                key={TabData[2].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);

                  setNonTech(true);
                  setPopular(false);
                  setBundle(false);
                  setSingle(false);
                }}
                className={nonTech ? styles.spanActive : styles.span}
              >
                <span>Software Development</span>
              </span>
            )}

            {nonTech ? (
              <div className={styles.gridWrap}>
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
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
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
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
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
              </div>
            ) : (
              ""
            )}

            {nonTech ? (
              <div className={styles.gridWrap}>
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
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
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
            {bundle ? (
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
            {popular ? (
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
            {single ? (
              <div className={styles.gridWrap}>
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
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
                        <button className="border-[1px] border-[#646464] border-solid bg-transparent px-[9px] py-1 text-[#646464] font-normal text-xs">
                          View Details
                        </button>
                      </Link>
                      <Link href="https://courses.skillslash.com/learn/DSA---System-Design--FAANG-interviews-">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
