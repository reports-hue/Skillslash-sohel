import React from "react";
import style from "./CareerHeader.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

const CareerHeader = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 641) {
      setMobile(true);
    }
  });
  return (
    <div className={style.wrapper}>
      {mobile ? (
        ""
      ) : (
        <div className={style.imageWrapper}>
          <Image
            src="/cdn/static/web/New-UI/CareerHeader.svg"
            priority={true}
            alt="Skillslash Build your Career Header Image"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className={style.contentWrapper}>
        <h1>Build Careers For People Across The Globe</h1>
        <div className={style.paraWrap}>
          <p>
            Our mission is to make our learners achieve their desired
            outcomes.Skillslash has impacted 1 million+ registered learners in
            50+ countries across the world. If that sounds good to you, we will
            be more than happy to have you on board with us and together we can
            achieve greater success.
          </p>
        </div>
        <button>Explore Open Positions</button>
      </div>
    </div>
  );
};

export default CareerHeader;
