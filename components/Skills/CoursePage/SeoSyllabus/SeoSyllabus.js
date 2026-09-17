import React, { useState } from "react";
import styles from "./SeoSyllabus.module.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { IoRemoveOutline } from "react-icons/io5";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import Tabs from "../../../DigitalMarketing/Course/Syllabus/Tab";

function DataScienceSyllabus({
  seoSyllabus,
  syllabusDesc,
  heading,
  hour,
  title,
  redirectDs,
  redirectFs,
  redirectDa,
  redirectDM,
  redirectgrowth,
  redirectsocialSeo,
  redirectPerforSocia,
  tabs,
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
            <h2 className="text-[#f18350]">{heading}</h2>
          </div>
        </div>
        <p>{syllabusDesc}</p>
        <ul>
          {state.map((syllabusData, i) => {
            const { Module0 } = syllabusData;

            return (
              <li className={styles.pointA} key={Module0.title}>
                <div className={styles.FaqWrapper} key={Module0.title}>
                  {/* {Module0.open ? ( */}

                  <div
                    className={styles.ques}
                    style={{ borderBottom: "0" }}
                    onClick={() => {
                      let id = i;
                      handleChange(id);
                    }}
                  >
                    <div className={styles.headWrap}>
                      <div>
                        <p className={styles.sTitle}>{Module0.title1}</p>
                        <h3 className="flex gap-1 items-center ">
                          <MdOutlineOnlinePrediction />
                          {Module0.hrs} +hrs lessons
                        </h3>
                      </div>
                    </div>
                    <span>
                      {Module0.open ? (
                        <MdKeyboardArrowUp className="icon" />
                      ) : (
                        <MdKeyboardArrowDown className="icon" />
                      )}
                    </span>
                  </div>
                  {Module0.content.length === 0 ? (
                    ""
                  ) : (
                    <div
                      className={styles.ans}
                      style={
                        Module0.open ? { padding: "10px" } : { padding: "0px" }
                      }
                    >
                      {Module0.open ? (
                        <div>
                          <p>{Module0.desc}</p>

                          {Module0.content.map((content, i) => {
                            return (
                              <div key={content.chap.title}>
                                <ul
                                  className={styles.syllabusHead}
                                  key={content.chap.title}
                                >
                                  <h4 className={styles.chapHead}>
                                    <MdOutlineOnlinePrediction className="text-2xl  text-[#cd201f]" />{" "}
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
                                            <IoRemoveOutline
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
        <h2 className="text-[#f18350]">Specialization</h2>
        <Tabs
        tabs={tabs}
        
        redirectgrowth={redirectgrowth}
        redirectsocialSeo={redirectsocialSeo}/>
      </div>
    </section>
  );
}

export default DataScienceSyllabus;
