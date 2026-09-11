/* eslint-disable @next/next/no-img-element */
import React from "react";
import dynamic from "next/dynamic";
import styles from "./BoxShape.module.css";
const Form = dynamic(() => import("../../Form/Form"));

const BoxShape = ({
  title,
  Box1h5,
  box1desc,
  Box2h5,
  box2desc,
  Box3h5,
  box3desc,
  Box4h5,
  box4desc,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectDSA,
  redirectBl,
  redirectWeb,
  dataScience,
  alt1,
  alt2,
  alt3,
  alt4,
  seoPage,
}) => {
  return (
    <div className={styles.boxWrapper}>
      {seoPage ? (
        ""
      ) : (
        <div className={styles.BoxDiv}>
          <div className={styles.left}>
            <h2>{title}</h2>

            <div className={styles.boxWrap}>
              <div className={styles.box}>
                <div className={styles.ImgB}>
                  <img
                    src="/cdn/static/web/New-UI/work-experience-icon.svg"
                    alt={alt1}
                    className={styles.icon}
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
                <div className={styles.contentWrapper}>
                  <h5>{Box1h5}</h5>
                  <p>{box1desc}</p>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.ImgC}>
                  <img
                    src="/cdn/static/web/New-UI/professional-icon.svg"
                    alt={alt2}
                    className={styles.icon}
                    width="35"
                    height="35"
                    loading="lazy"
                  />
                </div>
                <div className={styles.contentWrapper}>
                  <h5>{Box2h5}</h5>
                  <p>{box2desc}</p>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.ImgC}>
                  <img
                    src="/cdn/static/web/New-UI/chat-inerview-icon.svg"
                    alt={alt3}
                    className={styles.icon}
                    width="35"
                    height="35"
                    loading="lazy"
                  />
                </div>
                <div className={styles.contentWrapper}>
                  <h5>{Box3h5}</h5>
                  <p>{box3desc}</p>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.ImgC}>
                  <img
                    src="/cdn/static/web/New-UI/work-experience-icon.svg"
                    alt={alt4}
                    className={styles.icon}
                    width="35"
                    height="35"
                    loading="lazy"
                  />
                </div>
                <div className={styles.contentWrapper}>
                  <h5>{Box4h5}</h5>
                  <p>{box4desc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.imgBack}>
              <div className={styles.formWrapper}>
                <div className={styles.formHeadWrap}>
                  <h5>
                    Land In Your Dream Job With <br />
                    <span>Real Work Experience</span>
                  </h5>
                </div>
                <Form
                  dataScience={dataScience}
                  redirectDs={redirectDs}
                  redirectFs={redirectFs}
                  redirectBa={redirectBa}
                  redirectBl={redirectBl}
                  redirectDe={redirectDe}
                  redirectDSA={redirectDSA}
                  redirectWeb={redirectWeb}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxShape;
