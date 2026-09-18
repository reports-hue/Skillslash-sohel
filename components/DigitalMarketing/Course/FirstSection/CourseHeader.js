import React from "react";
import Styles from "./courseHeader.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaYoutube, FaToggleOn } from "react-icons/fa";
import VideoPlaylist from "../../../Skills/Global/VideoPlaylist/VideoPlaylist";
import { MdOutlineToggleOff } from "react-icons/md";
import { IoToggleSharp } from "react-icons/io5";
import { PiToggleRightThin } from "react-icons/pi";

import Counter from "../Counter/Counter";

const CourseHeader = ({
  title,
  deskTopPara,
  spanTitleText,
  changeHeading,
  redirectDs,
  redirectFs,
  redirectDa,
  redirectDM,
  subtitle,
  GenImg,
  AdsDM,
  logoN,
  logoG,
  logoGN,
}) => {
  const [show, setShow] = useState(false);
  const showVideo = (data) => {
    setShow(data);
  };

  return (
    <>
      {show && (
        <VideoPlaylist
          setShow={showVideo}
          show={show}
          redirectDs={redirectDs}
          redirectFs={redirectFs}
          redirectDa={redirectDa}
          redirectDM={redirectDM}
        />
      )}
      <div className={Styles.main}>
        <div className={Styles.gridDiv}>
          <div className={Styles.leftdiv}>
            <div className={Styles.top}>
              <span> {deskTopPara}</span>
            </div>
            <div className={Styles.headline}>
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
              <div className={Styles.EleCourse}>
                <p>Powered by Gen-AI</p>
              </div>
              <div>{AdsDM ? <Counter AdsDM={AdsDM} /> : <></>}</div>
            </div>

            <ul className={Styles.listpoints}>
              <li className={Styles.togglelist}>
                <span>
                  {" "}
                  <IoToggleSharp className={Styles.listicon} />
                </span>
                <p>Assured Placement </p>
              </li>
              <li className={Styles.togglelist}>
                <IoToggleSharp className={Styles.listicon} />
                <p> Guaranteed Internship </p>
              </li>
              <li className={Styles.togglelist}>
                {" "}
                <IoToggleSharp className={Styles.listicon} />
                <p>200+ hrs of live sessions </p>
              </li>
              <li className={`${Styles.togglelist} ${Styles.togglelisthide}`}>
                <IoToggleSharp className={Styles.listicon} />
                <p>20+ Branded Case Studies</p>
              </li>
              <li className={`${Styles.togglelist} ${Styles.togglelisthide}`}>
                <IoToggleSharp className={Styles.listicon} />
                <p> 10+ Global Certificates</p>
              </li>
              <li className={`${Styles.togglelist} ${Styles.togglelisthide}`}>
                {" "}
                <IoToggleSharp className={Styles.listicon} />
                <p> 100+ Tools</p>
              </li>
            </ul>
            {/* <p className={Styles.para}>{spanTitleText}</p> */}
            <div className={Styles.buttondiv}>
              <button
                id="clck-free-counselling"
                onClick={() => showVideo(true)}
                className={Styles.btnDemo}
              >
                DEMO
                <FaYoutube className={Styles.IconYou} />
              </button>
            </div>
          </div>
        </div>
        {/* 
        <div className={Styles.icons}>
          <div className={Styles.icondivs}>
            <Image
              src="/cdn/digital-marketing/Ind_icon.svg"
              width={60}
              height={60}
              loading="lazy"
              alt="icons"
            />

            <p>Industry Certification</p>
          </div>

          <hr className={Styles.iconHr} />
          <div className={Styles.icondivs}>
            <Image
              src="/cdn/digital-marketing/carr_icon.svg"
              width={60}
              height={60}
              loading="lazy"
              alt="icons"
            />
            <p>Career Support</p>
          </div>
          <hr className={Styles.iconHr} />
          <div className={`${Styles.icondivs} ${Styles.center}`}>
            <Image
              src="/cdn/digital-marketing/live_icon.svg"
              width={60}
              height={60}
              loading="lazy"
              alt="icons"
            />
            <p>Live Doubt & Project Sessions</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CourseHeader;
