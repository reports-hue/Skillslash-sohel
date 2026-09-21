import React from "react";
import styles from "./Newhoose.module.css";
import { LuBuilding2, LuUserCheck, LuMessageCircle, LuUsers } from "react-icons/lu";

// Each card used to show an <Image> pointed at a "four_dm.svg"/"three_dm.svg"/
// etc. file under /cdn/digital-marketing/ - every one of those turned out to
// be an auto-generated placeholder (a flat rectangle with the filename as
// its own text label, not real icon artwork), same as every other asset in
// that directory. Real icons instead of fake ones standing in for them.
const boxesData = [
  { Icon: LuBuilding2, description: "Own Digital Marketing Agency" },
  { Icon: LuUserCheck, description: "Dedicated Learning Coordinator" },
  { Icon: LuMessageCircle, description: "Daily 1:1 Doubt clearing sessions" },
  { Icon: LuUsers, description: "Strong Alumni & recruiter network" },
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
          {boxesData.map(({ Icon, description }, index) => (
            <div key={index} className={styles.boxes}>
              <span className={styles.boxIconWrap}>
                <Icon className={styles.boxIcon} aria-hidden="true" />
              </span>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewChoose;
