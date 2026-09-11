import React, { useEffect, useState } from "react";
import styles from "./FirstSection.module.css";

import Image from "next/image";
import TextAnimation from "../../Animation/TextAnimation";

const FirstSection = ({
  deskTopPara,
  title,
  homePage,
  spanTitleText,
  desc,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectDSA,
  redirectWeb,
  width,
  height,
  mainHeaderImg,
  mainAlt,
  backgroundImg,
  iconImg,
  usp1,
  usp2,
  usp3,
  usp4,
  usp1Span,
  usp2Span,
  usp3Span,
  usp4Span,
  seoPage,
  seoPara,
}) => {
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [popups, setPopups] = useState(false);
  const [changeHeading, setChangeHeading] = useState(false);
  const [changeRedirect, setChangeRedirect] = useState(false);
  const popupShow = (demoClass, changeText) => {
    setChangeHeading(demoClass);
    setChangeRedirect(changeText);

    setPopups(true);
  };

  useEffect(() => {
    let width = window.innerWidth;
    if (width > 642) {
      setTablet(false);
    }
    if (width < 642) {
      setTablet(true);
    }
    if (width < 481) {
      setMobile(true);
    }
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.bgImg}>
        <Image
          priority
          src={backgroundImg}
          fill={true}
          alt="background"
          sizes="(min-width: 1024px) 100vw, (max-width: 1024px) 100vw, (max-width: 641px) 0vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.left}>
        <div className={styles.paraWrap}>
          <p className={styles.pTop}>{deskTopPara}</p>
          <p className={styles.sidePara}>{spanTitleText}</p>
        </div>
        <h1 style={{ color: "black" }}>{title}</h1>
        {/* {seoPage ? (
          <div dangerouslySetInnerHTML={{ __html: seoPara }}></div>
        ) : (
          ""
        )} */}

        {redirectDs || redirectBa ? (
          <p className={styles.powered}>
            Powered by
            <Image
              src="/cdn/static/web/New-UI/microsoft-icon-logo-black.svg"
              height={20}
              width={90}
              priority
              alt="Microsoft-certification"
            />
          </p>
        ) : (
          <p>{desc}</p>
        )}

        <TextAnimation
          homePage={homePage}
          redirectDSA={redirectDSA}
          redirectFs={redirectFs}
          redirectWeb={redirectWeb}
        />

        <div className={styles.uspFeatures}>
          <div className={styles.left}>
            <div className={styles.uspFeatures1}>
              <div>
                <Image
                  src="/cdn/static/web/New-UI/liveTV.svg"
                  priority
                  alt="learn directly from live classes"
                  width={32}
                  height={34}
                />
              </div>
              <p>
                {usp1} <span>{usp1Span}</span>
              </p>
            </div>
            <div className={styles.uspFeatures2}>
              <div>
                <Image
                  src="/cdn/static/web/New-UI/certificate-icon-first.svg"
                  priority
                  alt=" Direct Company experience certificate"
                  width={34}
                  height={36}
                />
              </div>
              <p>
                {usp2} <span>{usp2Span}</span>
              </p>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.uspFeatures3}>
              <div>
                <Image
                  src="/cdn/static/web/New-UI/emi-icon.svg"
                  alt="get Program with low cost EMI"
                  priority
                  width="32"
                  height="32"
                />
              </div>
              <p>
                {usp3} <span>{usp3Span}</span>
              </p>
            </div>
            <div className={styles.uspFeatures4}>
              <div>
                <Image
                  src="/cdn/static/web/New-UI/like.svg"
                  alt="100% Interview Guarantee"
                  width="32"
                  priority
                  height="36"
                />
              </div>
              <p>
                {usp4} <span>{usp4Span}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imgWrapper}>
          <Image
            src={mainHeaderImg}
            alt={mainAlt}
            style={{ objectFit: "contain" }}
            width={width}
            priority
            height={height}
          />
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
