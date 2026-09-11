import React from "react";
import style from "./OurEvents.module.css";
import Image from "next/legacy/image";

import Link from "next/link";

const OurEvents = () => {
  return (
    <div className={style.wrapper}>
      <div className="wrapperHeading">
        <hr />
        <h4>Our Events</h4>
        <hr />
      </div>

      <div className={style.wrapperBlock}>
        <div className={style.wrapperBlock1}>
          <Image
            src="/cdn/Home/event/MAANG1pic.svg"
            alt="Skillslash"
            layout="intrinsic"
            quality={100}
            style={{ objectFit: "contain" }}
            width={464}
            height={464}
          />
          <div className={style.bottomBtn}>
            <Link href="/">
              <div className={style.LearnMore}>
                <p>Event Ended</p>
              </div>
            </Link>
            {/* <p>Register</p> */}
          </div>
        </div>
        <div className={style.wrapperBlock2}>
          <Image
            src="/cdn/Home/event/AcingInterview2pic.svg"
            alt="Skillslash"
            layout="intrinsic"
            quality={100}
            style={{ objectFit: "contain" }}
            width={492}
            height={492}
          />
          <div className={style.bottomBtn}>
            <div className={style.LearnMore}>
              <Link href="/">
                <p>Event Ended</p>
              </Link>
            </div>

            {/* <p>Register</p> */}
          </div>
        </div>
        <div className={style.wrapperBlock3}>
          <Image
            layout="intrinsic"
            src="/cdn/Home/event/interview3pic.svg"
            alt="Skillslash"
            quality={100}
            style={{ objectFit: "contain" }}
            width={492}
            height={492}
          />
          <div className={style.bottomBtn}>
            <div className={style.LearnMore}>
              <Link href="/">
                <p>Event Ended</p>
              </Link>
            </div>

            {/* <p>Register</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurEvents;
