import { React, useState, useEffect } from "react";
import style from "./AutoPopUp.module.css";

import Image from "next/image";
const AutoPopUp = () => {
  const [autoPopup, setAutoPop] = useState(false);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAutoPop(true);
    }, 5000);

    return () => clearTimeout(timeOut);
  }, []);
  const closePopup = () => {
    setAutoPop(false);
  };

  return autoPopup ? (
    <div className={style.wrapper}>
      <iframe src="https://embed.lottiefiles.com/animation/74659"></iframe>
      <div className={style.content}>
        <button onClick={closePopup}>X</button>

        <div className={style.img}>
          <Image
            src="/cdn/static/web/New-UI/abhishek-bourai-24-05-2023-rounded.svg"
            width={60}
            height={60}
            alt="Abhishek"
          />
        </div>
        <div className={style.animate}>
          <h5>Congratulations Abhishek!!</h5>
          <p>
            On getting Placed in Wipro <br />
            as Data Scientist 🏅
          </p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AutoPopUp;
