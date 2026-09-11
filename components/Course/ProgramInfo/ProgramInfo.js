import styles from "./ProgramInfo.module.css";
import React from "react";
import Image from "next/image";

const ProgramInfo = ({
  Emi,
  homePage,
  redirectWeb,
  redirectFs,
  redirectDSA,
}) => {
  return (
    <div className={styles.feature}>
      <div className={styles.container}>
        <div className={styles.left}>
          {homePage || redirectWeb || redirectFs || redirectDSA ? (
            <>
              {" "}
              <Image
                src="/cdn/Home/progamInfo/hike-icon-h.svg"
                width={40}
                height={40}
                alt="increase you salary by 170%"
              />
              <p>Industry Certification</p>
            </>
          ) : (
            <>
              {" "}
              <Image
                src="/cdn/static/web/New-UI/hike-icon.svg"
                width={40}
                height={40}
                alt="hike icon"
              />
              <p>Microsoft Certification</p>
            </>
          )}

          {/* <h5>{BatchDate}</h5> */}
        </div>
        <div className={styles.middle}>
          <Image
            src="/cdn/Home/progamInfo/live-classes.svg"
            width={40}
            height={40}
            alt="learn directly from live classes"
          />
          <p>Live Doubt & Project Sessions</p>
          {/* <h5>{BatchDuration}</h5> */}
        </div>
        <div className={styles.right}>
          {homePage ? (
            <>
              {" "}
              <Image
                src="/cdn/Home/progamInfo/Hiring-icon.svg"
                width={40}
                height={40}
                alt="hiring"
              />
              <p>Career Support</p>
            </>
          ) : (
            <>
              {" "}
              <Image
                src="/cdn/Home/progamInfo/emi-icon-desktop.svg"
                width={40}
                height={40}
                alt="hiring"
              />
              <p>EMI starting @ {Emi}</p>
            </>
          )}

          {/* <h5>{Placement}</h5> */}
        </div>
      </div>
    </div>
  );
};

export default ProgramInfo;
