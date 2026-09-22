import React from "react";
import {
  LuBriefcase, LuMessageSquare, LuAward, LuTarget, LuSlidersHorizontal,
  LuUserCheck, LuGraduationCap, LuVideo, LuRepeat, LuSparkles,
} from "react-icons/lu";
import styles from "./BoxShape.module.css";

// The 4 box titles are free-text per page (Data/*.js / content/*.json) and
// don't mean the same thing in the same position on every page - e.g. Box1
// is "Real Work Experience" on the data science page but "Ace Developers
// Interviews" on the web dev page. A fixed icon-per-position mapping would
// be right on some pages and wrong on others (this is exactly how two of
// the four positions ended up reusing the same "work experience" icon
// image for two different concepts). Picking the icon from the title text
// itself keeps it correct regardless of which page renders this component.
const iconFor = (label = "") => {
  const text = label.toLowerCase();
  if (/interview/.test(text)) return LuMessageSquare;
  if (/certif|credential/.test(text)) return LuAward;
  if (/referral|placement|\bjob\b/.test(text)) return LuTarget;
  if (/custom|tailor|build your own|personali[sz]ed/.test(text)) return LuSlidersHorizontal;
  if (/eligib|professional|experience required/.test(text)) return LuUserCheck;
  if (/instructor|faang|mentor/.test(text)) return LuGraduationCap;
  if (/class|session|live/.test(text)) return LuVideo;
  if (/subscription|program/.test(text)) return LuRepeat;
  if (/work experience|hands-on|real-time project/.test(text)) return LuBriefcase;
  return LuSparkles;
};

const BoxShape = ({
  title,
  Box1h5,
  box1desc,
  Box2h5,
  box2desc,
  Box3h5,
  box3desc,
  Box4h5,
  box4desc,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectDSA,
  redirectBl,
  redirectWeb,
  dataScience,
  alt1,
  alt2,
  alt3,
  alt4,
  seoPage,
}) => {
  return (
    <div className={styles.boxWrapper}>
      {seoPage ? (
        ""
      ) : (
        <div className={styles.BoxDivNoForm}>
          <div className={styles.left}>
            <h2>{title}</h2>

            <div className={styles.boxWrap}>
              {[
                { heading: Box1h5, desc: box1desc },
                { heading: Box2h5, desc: box2desc },
                { heading: Box3h5, desc: box3desc },
                { heading: Box4h5, desc: box4desc },
              ].map(({ heading, desc }, index) => {
                const Icon = iconFor(heading);
                return (
                  <div className={styles.box} key={index}>
                    <div className={styles.iconBadge}>
                      <Icon aria-hidden="true" />
                    </div>
                    <div className={styles.contentWrapper}>
                      <h5>{heading}</h5>
                      <p>{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxShape;
