import React, { useState } from "react";
import styles from "./SeoAbout.module.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import { BiCheck } from "react-icons/bi";
import Image from "next/image";

function DataScienceSyllabus({
  seoAbout,
  popupHead,
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectWeb,
  redirectDSA,
  seoAboutHeading,
}) {
  const [state, setState] = useState(seoAbout);

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
            <h2 className={styles.heading}>{seoAboutHeading}</h2>
          </div>
        </div>
        <ul>
          {state.map((syllabusData, i) => {
            const { Module0 } = syllabusData;

            return (
              <li
                key={i}
                style={{
                  listStyle: "none",
                }}
                className={styles.FaqWrapper}
              >
                <div
                  onClick={() => {
                    let id = i;
                    handleChange(id);
                  }}
                  key={Module0.title}
                >
                  {Module0.open ? (
                    <div className={styles.ques} style={{ borderBottom: "0" }}>
                      <div className={styles.headWrap}>
                        <h3
                          style={{
                            paddingBottom: "25px",
                            paddingTop: "25px",
                            fontSize: "17px",
                            fontWeight: "400",
                          }}
                        >
                          {Module0.title}
                        </h3>
                      </div>
                      <span>
                        {Module0.open ? (
                          <MdKeyboardArrowUp className="icon" />
                        ) : (
                          <MdKeyboardArrowDown className="icon" />
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className={styles.ques}>
                      <div className={styles.headWrap}>
                        <h3>{Module0.title}</h3>
                        {Module0.project ? (
                          <div className={styles.logoImgWrap}>
                            {Module0.projectImgSrc.map((imgData) => {
                              return (
                                <div
                                  className={styles.imgWrap}
                                  key={imgData.id}
                                >
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
                      </div>
                      <span>
                        {Module0.open ? (
                          <MdKeyboardArrowUp className="icon" />
                        ) : (
                          <MdKeyboardArrowDown className="icon" />
                        )}
                      </span>
                    </div>
                  )}

                  {Module0.content.length === 0 ? (
                    ""
                  ) : (
                    <>
                      {Module0.open ? (
                        <div className={styles.ans}>
                          {/* <p>{Module0.desc}</p> */}
                          {Module0.content.map((content, i) => {
                            return (
                              <div key={content.chap.title}>
                                {content.chap.title === "" ? (
                                  ""
                                ) : (
                                  <h3>{content.chap.title}</h3>
                                )}

                                {content.chap.desc.map((desc, i) => {
                                  return (
                                    <div key={desc}>
                                      {desc === "" ? (
                                        ""
                                      ) : (
                                        <p key={desc} className={styles.points}>
                                          {/* {" "}
                                      <BiCheck className={styles.check} />{" "} */}
                                          {desc}
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default DataScienceSyllabus;
