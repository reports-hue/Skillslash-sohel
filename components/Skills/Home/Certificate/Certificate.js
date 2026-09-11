import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import TabData from "./TabData";
import styles from "./Certificate.module.css";

import { MdOutlineLocalFireDepartment, MdDataSaverOff } from "react-icons/md";
import { BsLaptop, BsCheckCircle } from "react-icons/bs";

const Certificate = () => {
  const [viewAll, setViewAll] = useState(true);
  const [oneYear, setOneYear] = useState(false);
  const [nonTech, setNonTech] = useState(false);

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
      <div className={styles.MenuTabs}>
        <div className={styles.leftPanel}>
          <>
            {mobile ? (
              <span
                key={TabData[2].id}
                id="2"
                onClick={() => {
                  setOneYear(false);
                  setViewAll(false);
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
                <div className="flex h-full w-full relative">
                  <Image
                    src="/cdn/static/New_skillslash/Homepage/Certificate/Certificate-Of-Internship.svg"
                    fill
                    alt="Project certificate"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center h-full">
                  <p className="text-lg font-bold text-black">
                    A proof you are not a fresher in this technology
                  </p>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        All recruiters and hiring managers ask for experience
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Internship experience helps in cracking technical
                        interview rounds
                      </h3>
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
                }}
                className={oneYear ? styles.spanActive : styles.span}
              >
                <span>
                  <MdOutlineLocalFireDepartment
                    className={
                      oneYear ? styles.ActiveSpanIcon : styles.spanIcon
                    }
                  />
                  {TabData[1].title}
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
                  {TabData[1].title}
                </span>

                <IoIosArrowForward />
              </span>
            )}
            {oneYear ? (
              <div className={styles.gridWrap}>
                <div className="flex h-full w-full relative">
                  <Image
                    src="/cdn/static/New_skillslash/Homepage/Certificate/theorax-project-certificate.svg"
                    fill
                    alt="Project certificate"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center h-full">
                  <p className="text-lg font-bold text-black">
                    Proof you have worked on a real-life project
                  </p>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Multi-project experience shows your knowledge depth
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Fill the knowledge gap between theory and experience
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {mobile ? (
              <span
                key={TabData[0].id}
                id="0"
                onClick={() => {
                  setViewAll(true);
                  setOneYear(false);
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
                <div className="flex h-full w-full relative">
                  <Image
                    src="/cdn/static/web/New-UI/PROJECT-EXPERIENCE-CERTIFICATE--THEORAX.svg"
                    fill
                    alt="Project certificate"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center h-full">
                  <p className="text-lg">
                    A proof you are not a fresher in this technology
                  </p>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="font-bold">Learn From Industry Exports</h3>
                      <p className="text-sm text-[#646464]">
                        Comprehensive Self peaced courses created by with top
                        practitioners
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="font-bold">Learn From Industry Exports</h3>
                      <p className="text-sm text-[#646464]">
                        Comprehensive Self peaced courses created by with top
                        practitioners
                      </p>
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
                <div className="flex h-full w-full relative">
                  <Image
                    src="/cdn/static/New_skillslash/Homepage/Certificate/course-certificate.svg"
                    fill
                    alt="Project certificate"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center h-full">
                  <p className="text-lg font-bold text-black">
                    Enhance your qualifications, open up more career
                    opportunities
                  </p>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Specialized Knowledge
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Industry Compliance
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {oneYear ? (
              <div className={styles.gridWrap}>
                <div className="flex h-full w-full relative">
                  <Image
                    src="/cdn/static/New_skillslash/Homepage/Certificate/theorax-project-certificate.svg"
                    fill
                    alt="Project certificate"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center h-full">
                  <p className="text-lg font-bold text-black">
                    Proof you have worked on a real-life project
                  </p>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Multi-project experience shows your knowledge depth
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Fill the knowledge gap between theory and experience
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {nonTech ? (
              <div className={styles.gridWrap}>
                <div className="flex h-full w-full relative">
                  <Image
                    src="/cdn/static/New_skillslash/Homepage/Certificate/Certificate-Of-Internship.svg"
                    fill
                    alt="Project certificate"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center h-full">
                  <p className="text-lg font-bold text-black">
                    A proof you are not a fresher in this technology
                  </p>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        All recruiters and hiring managers ask for experience
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-[5%,94%] gap-2 items-start ml-2 w-full">
                    <BsCheckCircle className="text-[#4f419a] mt-1" />
                    <div>
                      <h3 className="text-[#646464] font-normal">
                        Internship experience helps in cracking technical
                        interview rounds
                      </h3>
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

export default Certificate;
