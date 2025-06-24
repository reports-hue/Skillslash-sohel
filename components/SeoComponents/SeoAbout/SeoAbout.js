import React, { useState } from "react";
import styles from "./SeoAbout.module.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCall } from "react-icons/md";
import Link from "next/link";
import Form from "../../../components/Skills/Global/Form/Form";
import { BiCheck } from "react-icons/bi";
import Image from "next/image";
import Popup from "../../Popup/Popup";

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
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
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
      <Popup
        trigger={popups}
        setTrigger={setPopups}
        className="popupModal"
        downloadBrochure
      >
        <div className="leftPopup">
          <div
            className="whiteP"
            style={{ width: "350px", height: "400px" }}
          ></div>
        </div>
        <div className="RightPopup">
          <h5>{popupHead}</h5>
          <p>Please enter the following details to initiate your download</p>
          <Form
            setTrigger={setPopups}
            downloadBrochure
            dataScience={dataScience}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectBa={redirectBa}
            redirectBl={redirectBl}
            redirectDe={redirectDe}
            redirectWeb={redirectWeb}
            redirectDSA={redirectDSA}
          />
        </div>
      </Popup>
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
      {/* Right-side Form Part */}
      <div className={styles.syllabusRight}>
        <div className={styles.syllabusRight}>
          <div className={styles.PProgrammain}>
            <div className={styles.PProgram}>
              <div>
                <div className={styles.tollNo}>
                  <p>Contact Us</p>
                  <div className={styles.contactNo}>
                    <h4>
                      <a href="tel:+91 ">+91 </a>{" "}
                    </h4>
                    <a href="tel:+91 ">
                      <MdCall className={styles.callIcon} />
                    </a>
                  </div>
                  <p>( Toll Free )</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.PProgrammain} style={{ marginTop: "20px" }}>
            <div className={styles.PProgram}>
              <p className={styles.req}>Request More Information</p>
            </div>
            <div className={styles.PProgramInner}>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataScienceSyllabus;
