import React, { useState } from "react";
import styles from "./SeoSyllabus.module.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import Link from "next/link";
import { AiOutlineTool } from "react-icons/ai";
import { BiCheck, BiTimeFive } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import Image from "next/image";

function DataScienceSyllabus({
  seoSyllabus,
  syllabusDesc,
  popupHead,
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectWeb,
  redirectDSA,
  heading,
}) {
  const [state, setState] = useState(seoSyllabus);

  const handleChange = (index) => {
    setState(
      state.map((faq, i) => {
        if (i === index) {
          faq.Module0.open = !faq.Module0.open;
        } else {
          faq.Module0.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <section className={styles.Syllabus}>
      <div className={styles.syllabusLeft}>
        <div className={styles.Syllabusbutton}>
          <div>
            <h2>{heading}</h2>
          </div>
        </div>
        <p>{syllabusDesc}</p>
        <ul>
          {state.map((syllabusData, i) => {
            const { Module0 } = syllabusData;

            return (
              <li className={styles.pointA} key={Module0.title}>
                <BsDot className={styles.dot} />
                <span className={styles.line}></span>
                <div className={styles.FaqWrapper} key={Module0.title}>
                  {/* {Module0.open ? ( */}

                  <div className={styles.ques} style={{ borderBottom: "0" }}>
                    <div className={styles.headWrap}>
                      <h3>{Module0.title}</h3>

                      <p className={styles.sTitle}>{Module0.title1}</p>
                      <p className={styles.sDesc}>{Module0.descS}</p>

                      {Module0.project ? (
                        <div className={styles.logoImgWrap}>
                          {Module0.projectImgSrc.map((imgData) => {
                            return (
                              <div className={styles.imgWrap} key={imgData.id}>
                                <Image
                                  src={imgData.src}
                                  width={imgData.width}
                                  height={imgData.height}
                                  alt="Project by skillslash"
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}

                      {/* {Module0.project
                      ? Module0.projectImgSrc.map((imgData) => {
                          return (
                            <div className={styles.imgWrap}>
                              <Image
                                key={imgData.id}
                                src={imgData.src}
                                width={imgData.width}
                                height={imgData.height}
                                alt="Project by skillslash"
                              />
                            </div>
                          );
                        })
                      : ""} */}
                    </div>
                  </div>
                  {Module0.content.length === 0 ? (
                    ""
                  ) : (
                    <div className={styles.ans}>
                      <div
                        className={styles.innerAns}
                        onClick={() => {
                          let id = i;
                          handleChange(id);
                        }}
                      >
                        <p className={styles.accorDHead}>Course Content</p>
                        <span>
                          {Module0.open ? (
                            <MdKeyboardArrowUp className="icon" />
                          ) : (
                            <MdKeyboardArrowDown className="icon" />
                          )}
                        </span>
                      </div>
                      {Module0.open ? (
                        <div>
                          {Module0.project ? (
                            <div>
                              <h5 className={styles.projectHead}>
                                Project You Will Work On
                              </h5>
                              <div className={styles.projectView}>
                                {Module0.projectInfo.map((imgData) => {
                                  return (
                                    <div
                                      className={styles.projectSyllabus}
                                      key={imgData.id}
                                    >
                                      <p>{imgData.title}</p>
                                      <Image
                                        src={imgData.src}
                                        width={imgData.width}
                                        height={imgData.height}
                                        alt="Project by skillslash"
                                      />
                                      <Link href="#project">
                                        <button>View Details</button>
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <p>{Module0.desc}</p>

                          {Module0.content.map((content, i) => {
                            return (
                              <div key={content.chap.title}>
                                <ul className={styles.syllabusHead}>
                                  <h4 className={styles.chapHead}>
                                    {content.chap.title}
                                  </h4>
                                  {content.chap.desc.map((desc, i) => {
                                    return (
                                      <div key={desc}>
                                        {desc === "" ? (
                                          ""
                                        ) : (
                                          <li key={i} className={styles.points}>
                                            {" "}
                                            <BiCheck
                                              className={styles.check}
                                            />{" "}
                                            {desc}
                                          </li>
                                        )}
                                      </div>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <div className={styles.syllabusRight}>
          <h5 className={styles.rightHeading}>
            Data Science Course <span>Curriculum</span>
          </h5>
          <p className={styles.rightDesc}>
            Data Science and AI courses Syllabus are curated by leading
            faculties and industry leaders.
          </p>
          <div className={styles.feature}>
            <BiTimeFive className={styles.clockIcon} />
            <div className={styles.fContent}>
              <p className={styles.fHeading}>228+</p>
              <span>Lessons</span>
            </div>
          </div>

          <div className={styles.feature}>
            <AiOutlineTool className={styles.settingIcon} />
            <div className={styles.fContent}>
              <p className={styles.fHeading}>15+ </p>
              <span>Tools and Project</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataScienceSyllabus;
