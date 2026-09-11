import React from "react";
import Image from "next/image";
import styles from "../../../styles/DataScienceEvent.module.css";

const AboutContentC = ({ eventData }) => {
  return (
    <>
      <div className={styles.about} id="About">
        <div className={styles.aboutLeft}>
          <h6>{eventData.data.About.title}</h6>
          <p>{eventData.data.About.desc}</p>
        </div>
      </div>
      <div className={styles.aboutContent}>
        <div className={styles.left}>
          <Image
            src="/cdn/static/event/1_Project.svg"
            width="60"
            height="60"
          />
          <img
            src="/cdn/static/event/icons_1.svg"
            width="120"
            height="120"
            className={styles.Numbers}
          />
          <h6>{eventData.data.About.heading1}</h6>

          <p>{eventData.data.About.para1}</p>
        </div>
        <div className={styles.Middle}>
          <Image
            src="/cdn/static/event/icons_Job.svg"
            width="60"
            height="60"
          />
          <img
            src="/cdn/static/event/icons.svg 2_Count.png"
            width="120"
            height="120"
            className={styles.Numbers}
          />
          <h6>{eventData.data.About.heading2}</h6>
          <p>{eventData.data.About.para2}</p>
        </div>
        <div className={styles.Right}>
          <Image
            src="/cdn/static/event/icons_Skill_Upgrdation.svg"
            width="60"
            height="60"
          />
          <img
            src="/cdn/static/event/icons.svg 3_Count.png"
            width="120"
            height="120"
            className={styles.Numbers}
          />
          <h6>{eventData.data.About.heading3}</h6>
          <p>{eventData.data.About.para3}</p>
        </div>
      </div>
    </>
  );
};

export default AboutContentC;
