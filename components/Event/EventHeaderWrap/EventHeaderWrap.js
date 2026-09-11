import React, { useEffect, useState } from "react";
import styles from "../../../styles/DataScienceEvent.module.css";
import Form from "../../Form/Form";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FiUserCheck } from "react-icons/fi";
import { BsArrowRightCircleFill } from "react-icons/bs";
const EventHeader = dynamic(() => import("../EventHeader/EventHeader"));

const EventHeaderWrap = ({ eventData, today, eventDateInfo, eventStart }) => {
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
    <div className={styles.Page}>
      <div className={styles.bgWrap}>
        {mobile ? (
          ""
        ) : (
          <Image
            src={eventData.data.header.backImg}
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
            priority={true}
            alt="backImg"
          />
        )}
      </div>
      <div className={styles.PageContent}>
        <div className={styles.bgWrap}>
          {mobile ? (
            <Image
              src={eventData.data.header.mBackImg}
              fill={true}
              style={{ objectFit: "cover" }}
              quality={100}
              alt="backImg"
              priority={true}
            />
          ) : (
            ""
          )}
        </div>
        <EventHeader
          desc1={eventData.data.header.desc1}
          imgSrc1={eventData.data.header.img1Src}
          title={eventData.data.header.title}
          reverseImg={eventData.data.header.reverseImg}
          titleText={eventData.data.header.titleText}
          titleSpan={eventData.data.header.titleSpan}
          spanStyle={eventData.data.header.spanStyle}
          desc={eventData.data.header.desc}
          eventDate={eventData.data.header.eventDate}
          eventTime={eventData.data.header.eventTime}
          imgSrc={eventData.data.header.imgSrc}
          dark={eventData.data.header.dark}
          tag={eventData.data.header.tag}
          lightNew={eventData.data.header.lightNew}
          profileImg={eventData.data.header.profileImg}
          profileImgH={eventData.data.header.profileImgH}
          profileImgW={eventData.data.header.profileImgW}
        />
      </div>
      {today > eventDateInfo ? (
        ""
      ) : (
        <div className={styles.right}>
          <div className={styles.form}>
            <div className={styles.header}>
              <h3>Register NOW!</h3>
              <p>
                <FiUserCheck className={styles.Icon} />
                {eventData.data.header.register}
              </p>
            </div>

            <Form
              event={true}
              EventTitle={eventData.data.mainData.title}
              redirectZoom={eventData.data.header.redirectZoom}
              link={eventData.data.header.link}
            />
          </div>
          {today === eventStart ? (
            <div className={styles.timer}>
              <a href={eventData.data.header.link}>
                <button>
                  Join Masterclass
                  <BsArrowRightCircleFill />
                </button>
              </a>
            </div>
          ) : (
            <div className={styles.timerS}>
              <button>
                Join Masterclass
                <BsArrowRightCircleFill />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventHeaderWrap;
