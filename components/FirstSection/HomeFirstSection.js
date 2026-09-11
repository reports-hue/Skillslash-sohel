import React from "react";
import Styles from "./Home.module.css";
import Image from "next/image";
import Form from "../Skills/Global/Form/Form";
import Popup from "../Skills/Global/Popup/Popup";
import { useState } from "react";
import Link from "next/link";

const HomeFirstSection = ({
  title,
  deskTopPara,
  spanTitleText,
  homePage,
  dmPage,
  changeHeading,
  redirectDs,
  redirectFs,
  redirectDa,
  redirectDM,
  gst,
}) => {
  const [popups, setPopups] = useState(false);
  const popupShow = (demoClass, changeText) => {
    setPopups(true);
  };
  const GenImg =
    "/cdn/digital-marketing/Bard_Dm.svg";
  return (
    <>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="RightPopup">
          {changeHeading ? (
            <h5>Download Program Handbook</h5>
          ) : (
            <h5>
              Get a chance to understand this course in detail from our
              counsellors
            </h5>
          )}
          <p>Fill the below Details to get started</p>
          <Form
            popup={true}
            setTrigger={setPopups}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectDa={redirectDa}
            redirectDM={redirectDM}
          />
        </div>
      </Popup>
      <div className={Styles.main}>
        <div className={Styles.gridDiv}>
          <div className={Styles.leftdiv}>
            <div className={Styles.top}>
              <span> {deskTopPara}</span>
              {homePage ? (
                <>
                  {" "}
                  <Image src={GenImg} width={30} height={20} alt="Bard" />
                </>
              ) : (
                <></>
              )}
            </div>

            <h1>{title}</h1>
            {dmPage ? (
              <>
                <div className={Styles.EleCourse}>
                  <p>With Gen AI</p>
                  <Image src={GenImg} width={30} height={20} alt="Bard" />
                </div>

                <p className={Styles.para}>{spanTitleText}</p>
              </>
            ) : (
              <div className={Styles.Desc}>
                <p>Students | Professionals | Entrepreneurs</p>
              </div>
            )}
            {dmPage ? (
              <>
                {" "}
                <button
                  id="clck-free-counselling"
                  onClick={() => popupShow()}
                  className={Styles.btn}
                >
                  Apply for Counselling
                </button>
              </>
            ) : (
              <>
                {" "}
                <Link href="/liveclass/digital-marketing-master-course">
                <button className={Styles.btn}>Explore course</button>
                </Link>
              </>
            )}
          </div>
          {homePage ? (
            <>
              {" "}
              <div className={Styles.rytdiv}>
                <Image
                  src="/cdn/digital-marketing/first_right.svg"
                  width={500}
                  height={800}
                  quality={100}
                  alt="Skillslash-Digital Marketing"
                />
              </div>
              <Link href="/liveclass/digital-marketing-master-course">
                <button className={Styles.btnmbl}>Explore course</button>
              </Link>
            </>
          ) : (
            <>
              <div className={Styles.formDiv}>
                <h2 className={Styles.formhead}>
                  <p>Free Counselling</p> with Experts
                </h2>

                <Form
                  redirectDs={redirectDs}
                  redirectFs={redirectFs}
                  redirectDa={redirectDa}
                  redirectDM={redirectDM}
                />
              </div>
            </>
          )}
        </div>

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
        </div>
      </div>
    </>
  );
};

export default HomeFirstSection;
