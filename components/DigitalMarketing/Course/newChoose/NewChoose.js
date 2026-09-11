import React from "react";
import styles from "./Newhoose.module.css";
import Image from "next/image";

const boxesData = [
  {
    src: "/cdn/digital-marketing/four_dm.svg",
    alt: "box",
    description: "Own Digital Marketing Agency",
  },
  {
    src: "/cdn/digital-marketing/three_dm.svg",
    alt: "box",
    description: "Dedicated Learning Coordinator",
  },
  {
    src: "/cdn/digital-marketing/two_dm.svg",
    alt: "box",
    description: "Daily 1:1 Doubt clearing sessions",
  },
  {
    src: "/cdn/digital-marketing/one_dm.svg",
    alt: "box",
    description: "Strong Alumni & recruiter network",
  },
];

const NewChoose = () => {
  return (
    <>
      <div className={styles.headus}>
        <h2>
          {" "}
          <span>Why</span> Choose Us
        </h2>

        <div className={styles.mainbox}>
          {boxesData.map((box, index) => (
            <div key={index} className={styles.boxes}>
              <Image
                src={box.src}
                width={60}
                height={40}
                alt={box.alt}
                loading="lazy"
              />
              <p>{box.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewChoose;
