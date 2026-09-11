import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsArrowRightCircleFill } from "react-icons/bs";
import styles from "../../../styles/DataScienceEvent.module.css";
import { TiTick } from "react-icons/ti";

const WhyWhoB = ({ eventData }) => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;

    if (width < 481) {
      setMobile(true);
    }

    if (width > 481) {
      setMobile(false);
    }
  }, [mobile]);

  return (
    <>
      <div className={styles.WhyWrap}>
        <div className={styles.why}>
          <div className={styles.whyLeft}>
            <h6>{eventData.data.whyUs.title}</h6>
            <div className={styles.line}></div>
            <p>
              <TiTick className={styles.Tick} />
              {eventData.data.whyUs.l1}
            </p>
            <p>
              <TiTick className={styles.Tick} />
              {eventData.data.whyUs.l2}
            </p>
            <p>
              <TiTick className={styles.Tick} />
              {eventData.data.whyUs.l3}
            </p>

            <p>
              <TiTick className={styles.Tick} />
              {eventData.data.whyUs.l4}
            </p>
          </div>
          <div className={styles.whyRight}>
            <Image
              width="435"
              height="350"
              src="/cdn/static/event/Learning_Skillslash.svg"
            />
          </div>
        </div>
      </div>

      <div className={styles.Who} id="who">
        <div className={styles.whoLeft}>
          <h6>{eventData.data.whoCan.title}</h6>
          {mobile ? "" : <BsArrowRightCircleFill className={styles.gIcon} />}
        </div>
        <div className={styles.whoRight}>
          <div className={styles.wrapper}>
            <div className={styles.number}>
              <p className={styles.nIcon}>01.</p>
            </div>
            <div className={styles.nContent}>
              <h6>{eventData.data.whoCan.heading1}</h6>
              <p>{eventData.data.whoCan.para1}</p>
            </div>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.number}>
              <p className={styles.nIcon}>02.</p>
            </div>
            <div className={styles.nContent}>
              <h6>{eventData.data.whoCan.heading2}</h6>
              <p>{eventData.data.whoCan.para2}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyWhoB;
