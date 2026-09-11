import React, { useState, useEffect } from "react";
import styles from "./Fee.module.css";
import Image from "next/image";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
// const PartnerSlider = dynamic(() => import("../PartnerSlider/PartnerSlider"));
// import { pPartner } from "../PartnerSlider/PartnerSliderData";
import { FiArrowRight } from "react-icons/fi";
const Popup = dynamic(() => import("../../Popup/Popup"));
const Form = dynamic(() => import("../../Skills/Global/Form/Form"));

const Fee = ({
  changeFee,
  desc,
  desc1,
  BasicPrice,
  BasicDesc,
  ProPrice,
  ProDesc,
  redirectWeb,
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectDM
}) => {
  const [popups, setPopups] = useState(false);
  const [mobile, setMobile] = useState(false);
  // const [slidesPerView, setSlidesPerView] = useState(3);
  // const [spaceBetween, setSpaceBetween] = useState(20);

  const popupShow = () => {
    setPopups(true);
  };
  useEffect(() => {
    let width = window.innerWidth;

    // if (width < 801) {
    //   setSlidesPerView(7);
    //   setSpaceBetween(20);
    // }
    // if (width < 641) {
    //   setSlidesPerView(5);
    //   setSpaceBetween(20);
    // }
    if (width < 481) {
      // setSlidesPerView(3);
      // setSpaceBetween(10);
      setMobile(true);
    }
  });

  return (
    <div className={styles.FeeS}>
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
            redirectDa={redirectDs}
            redirectDM={redirectDM}
          />
        </div>
      </Popup>

      <div className={styles.fourthS}>
        {/* <p className="pTop"> Finance</p> */}
        <h4>Program Fees</h4>
        <div className={styles.feeWrapperTop}>
          <p className="pBotS">{desc}</p>

          <h3>Payment Partners</h3>
          <div className={styles.bottom}>
            {/* <PartnerSlider swiperData={pPartner} /> */}
          </div>
        </div>
      </div>
      <div className={styles.priceTableData}>
        <div className={styles.fourth1}>
          {/* <p className="pTop"> Finance</p> */}
          <h4>Program Fees</h4>
          <div className={styles.feeWrapperTop}>
            <p className="pBotS">{desc}</p>

            <h3>Payment Partners</h3>
            <div className={styles.bottom}>
              <div className={styles.bottom}>
                <Image
                  src="/cdn/static/web/liquiloans.svg"
                  alt="liqiLoans"
                  width="90"
                  height="40"
                />

                <Image
                  src="/cdn/static/web/propelld.svg"
                  alt="propelld"
                  width="90"
                  height="40"
                />

                <Image
                  src="/cdn/static/web/zest-logo.svg"
                  alt="Zest"
                  width="80"
                  height="24"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.first}>
          <span className={styles.Price}>Program Features</span>
          <span className={styles.PFeatures}>Job Assistance</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>Live Class Subscription</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>LMS Subscription</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>Job Referrals</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>Industry Projects</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>Capstone Projects</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>Domain Training</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>
            Project Certification from Companies
          </span>

          {dataScience || redirectDs ? (
            <>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>Adv AI + DSA</span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>Microsoft Certification</span>
            </>
          ) : (
            ""
          )}
          {redirectBa ? (
            <>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>Project Management</span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>Microsoft Certification</span>
            </>
          ) : (
            ""
          )}

          <span className={styles.PFeatures}>
            <FiArrowRight className={styles.Arrow} />
          </span>
        </div>
        <div className={styles.fourth}>
          <div className={styles.firstDivInn}>
            <span className={styles.sub}>
              {dataScience || redirectDs || redirectBa ? "Pro" : "Basic"}
            </span>
            <span className={styles.Price}>{BasicPrice}</span>
            <span className={styles.desc}>{BasicDesc}</span>
            <span className={styles.PFeatures}>
              <AiOutlineCloseCircle className={styles.cross} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>1 Year</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>2 Year</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <AiOutlineCloseCircle className={styles.cross} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>7+</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>1</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <AiOutlineCloseCircle className={styles.cross} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <AiOutlineCloseCircle className={styles.cross} />
            </span>
            <hr className={styles.priceLine} />
            {dataScience || redirectDs || redirectBa ? (
              <>
                <span className={styles.PFeatures}>
                  <AiOutlineCloseCircle className={styles.cross} />
                </span>
                <hr className={styles.priceLine} />
                <span className={styles.PFeatures}>
                  <AiOutlineCloseCircle className={styles.cross} />
                </span>
              </>
            ) : (
              ""
            )}
          </div>

          <span className={styles.PFeatures}>
            <button className={styles.button} onClick={popupShow}>
              Enrol Now
            </button>
          </span>
        </div>
        <div className={styles.fourth}>
          <span className={styles.sub}>
            {dataScience || redirectDs || redirectBa ? "Pro Max" : "Pro"}
          </span>
          <span className={styles.Price}>{ProPrice}</span>
          <span className={styles.desc}>{ProDesc}</span>
          <span className={styles.PFeatures}>
            <MdCheckCircle className={styles.check} />
          </span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>4 Year</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>Lifetime</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>Unlimited</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>15+</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>3</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>2</span>
          <hr className={styles.priceLine} />
          <span className={styles.PFeatures}>6 Months</span>
          <hr className={styles.priceLine} />
          {dataScience || redirectDs || redirectBa ? (
            <>
              <span className={styles.PFeatures}>
                <MdCheckCircle className={styles.check} />
              </span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>
                <MdCheckCircle className={styles.check} />
              </span>
            </>
          ) : (
            ""
          )}
          <span className={styles.PFeatures}>
            <button className={styles.button} onClick={popupShow}>
              Enrol Now
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Fee;
