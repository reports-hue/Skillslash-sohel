import React from "react";
import styles from "../../../styles/DataScienceEvent.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import { TiTick } from "react-icons/ti";
const EventFeature = dynamic(() => import("../EventFeatures/EventFeature"));
import { BsDot } from "react-icons/bs";
const FeatureProfileA = ({ eventData }) => {
  return (
    <>
      <div className={styles.prgrmFeature} id="Feature">
        <EventFeature
          title={eventData.data.feature.title}
          h1={eventData.data.feature.h1}
          h2={eventData.data.feature.h2}
          h3={eventData.data.feature.h3}
          p1={eventData.data.feature.p1}
          p2={eventData.data.feature.p2}
          p3={eventData.data.feature.p3}
          img1={eventData.data.feature.img1}
          img2={eventData.data.feature.img2}
          img3={eventData.data.feature.img3}
          mImg1={eventData.data.feature.mImg1}
          mImg2={eventData.data.feature.mImg2}
          mImg3={eventData.data.feature.mImg3}
        />
      </div>
      <div className={styles.Profile}>
        <div className="bgWrap">
          <Image
            src="/cdn/static/event/Instructor_info_bg-09.svg"
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
            loading="lazy"
            alt="backImg"
          />
        </div>
        <div className={styles.prpWrap}>
          <div className={styles.profilePic}>
            <div className={styles.Pic}>
              <Image width="60" height="60" src={eventData.data.profile.pImg} />
            </div>
            <div className={styles.PrpLeft}>
              <p>{eventData.data.profile.desc}</p>
              <h6>
                {eventData.data.profile.pName}
                <span>
                  <a href={eventData.data.profile.link} target="_blank">
                    (Linkedin)
                  </a>
                </span>
              </h6>
            </div>
          </div>

          <div className={styles.PrpRight}>
            {eventData.data.profile.mIcon === "" ? (
              ""
            ) : (
              <Image
                width="40"
                height="40"
                src={eventData.data.profile.mIcon}
              />
            )}
          </div>
        </div>

        <div className={styles.infoWrap}>
          {eventData.data.profile.list1 === "" ? (
            ""
          ) : (
            <p>
              <BsDot className={styles.dots} />
              {eventData.data.profile.list1}
            </p>
          )}
          {eventData.data.profile.list2 === "" ? (
            ""
          ) : (
            <p>
              <BsDot className={styles.dots} />
              {eventData.data.profile.list2}
            </p>
          )}
        </div>
        <p>
          <TiTick className={styles.Tick} />
          {eventData.data.profile.list3}
        </p>
        <p>
          <TiTick className={styles.Tick} />
          {eventData.data.profile.list4}
        </p>
        <p>
          <TiTick className={styles.Tick} />
          {eventData.data.profile.list5}
        </p>
        {eventData.data.profile.workAt === "" ? (
          ""
        ) : (
          <>
            <h6 className={styles.PH}>{eventData.data.profile.workAt}</h6>
            <div className={styles.workImg}>
              <img
                width={eventData.data.profile.width1}
                height={eventData.data.profile.height1}
                src={eventData.data.profile.cIcon1}
                className={styles.ProfImg}
              />
              <img
                width={eventData.data.profile.width3}
                height={eventData.data.profile.height3}
                src={eventData.data.profile.cIcon2}
                className={styles.ProfImg}
              />
              <img
                width={eventData.data.profile.width}
                height={eventData.data.profile.height}
                src={eventData.data.profile.cIcon3}
                className={styles.ProfImg}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FeatureProfileA;
