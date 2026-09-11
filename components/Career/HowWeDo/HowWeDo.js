import React from "react";
import style from "./HowWeDo.module.css";
import Image from "next/image";

const HowWeDo = () => {
  return (
    <div className={style.wrapper}>
      <h4>
        This is <span>how we do it</span>
      </h4>
      <div className={style.wrapperBox}>
        <div>
          <Image
            src="/cdn/static/web/New-UI/CareerMidSec.svg"
            alt="How we do it"
            quality={100}
            style={{ objectFit: "contain" }}
            width="350"
            height="398"
          />
        </div>
        <div>
          <Image
            src="/cdn/static/web/New-UI/how-we-do-it-2nd-img.svg"
            alt="How we do it"
            quality={100}
            style={{ objectFit: "contain" }}
            width="350"
            height="398"
          />
        </div>
        <div>
          <Image
            src="/cdn/static/web/New-UI/how-we-do-it-3rd-image.svg"
            alt="How we do it"
            quality={100}
            style={{ objectFit: "contain" }}
            width="350"
            height="398"
          />
        </div>
      </div>
    </div>
  );
};

export default HowWeDo;
