import React, { useState, useEffect, useRef } from "react";
import styles from "./SecondNavbar.module.css";
import { FiDownload } from "react-icons/fi";
import dynamic from "next/dynamic";
const MegaMenu = dynamic(() => import("../MegaMenu/MegaMenu"));
// import CountDownTimer from "../CountdownTimer/CountdownTimer";
const ContactForm = dynamic(() => import("../ContactusForm/ContactusForm"));

const SecondNavbar = ({
  course,
  getHired,
  cta,
  faq,
  batchDate,
  fee,
  dataScience,
  review,
  project,
  syllabus,
  certificate,
  benefits,
  trainer,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectWeb,
}) => {
  const [secondNavbar, setSecondNavbar] = useState(false);
  const [activeState, setActiveState] = useState({
    alumni: false,
    trainer: false,
    benefits: false,
    certificate: false,
    syllabus: false,
    project: false,
    review: false,
    fee: false,
    batchDate: false,
    faq: false,
  });

  const [changeHeading, setChangeHeading] = useState(false);
  const [changeText, setChangeText] = useState(false);

  const first = useRef();
  const second = useRef();
  const third = useRef();
  const parent = useRef();

  const handleScrollToElement = (ref) => {
    window.scrollTo({
      top: ref.offsetTop - 80,
      left: 0,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   const scrollHandler = () => {
  //     if (activeState.certificate) {
  //       parent.current.style.transform = `translateX(${-100}%)`;
  //     }
  //     if (activeState.syllabus) {
  //       console.log(parent.current.getBoundingClientRect());
  //       parent.current.style.transform = `translateX(${-150}px)`;
  //     }
  //     if (activeState.project) {
  //       console.log(parent.current.getBoundingClientRect());
  //       parent.current.style.transform = `translateX(${-170}px)`;
  //     }
  //   };
  //   scrollHandler();
  // }, [activeState]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY >= 0 && window.scrollY <= window.innerHeight / 2) {
        setSecondNavbar(false);
      } else if (
        getHired.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        trainer.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: true,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: false,
          review: false,
          fee: false,
          batchDate: false,
          faq: false,
        });
        // For the about section
      } else if (
        trainer.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        benefits.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: true,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: false,
          review: false,
          fee: false,
          batchDate: false,
          faq: false,
        });
      } else if (
        benefits.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        certificate.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: true,
          certificate: false,
          syllabus: false,
          project: false,
          review: false,
          fee: false,
          batchDate: false,
          faq: false,
        });
      } else if (
        certificate.current.offsetTop - window.scrollY <
          window.innerHeight / 2 &&
        syllabus.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: true,
          syllabus: false,
          project: false,
          review: false,
          fee: false,
          batchDate: false,
          faq: false,
        });
      } else if (
        syllabus.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        project.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: true,
          project: false,
          review: false,
          fee: false,
          batchDate: false,
          faq: false,
        });
      } else if (
        project.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        review.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: true,
          review: false,
          fee: false,
          batchDate: false,
          faq: false,
        });
      } else if (
        review.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        fee.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: false,
          review: true,
          fee: false,
          batchDate: false,
          faq: false,
        });
      } else if (
        fee.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        batchDate.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: false,
          review: false,
          fee: true,
          batchDate: false,
          faq: false,
        });
      } else if (
        batchDate.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        faq.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: false,
          review: false,
          fee: false,
          batchDate: true,
          faq: false,
        });
      } else if (
        faq.current.offsetTop - window.scrollY < window.innerHeight / 2 &&
        cta.current.offsetTop - window.scrollY >= window.innerHeight / 2
      ) {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: false,
          review: false,
          fee: false,
          batchDate: false,
          faq: true,
        });
      } else {
        setSecondNavbar(true);
        setActiveState({
          ...activeState,
          alumni: false,
          trainer: false,
          benefits: false,
          certificate: false,
          syllabus: false,
          project: false,
          review: false,
          fee: false,
          batchDate: false,
          faq: false,
        });
        // Etc...
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [activeState]);
  return secondNavbar ? (
    <div>

      <div className={styles.navWrap}>
        <nav>
          <div className={styles.left} ref={parent}>
            <div
              className={activeState.trainer ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(trainer.current)}
              ref={second}
            >
              <p> Trainer</p>
            </div>
            <div
              className={activeState.alumni ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(getHired.current)}
              ref={first}
            >
              <p> Alumni</p>
            </div>
            <div
              className={activeState.benefits ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(benefits.current)}
              ref={third}
            >
              <p> Benefits</p>
            </div>
            {redirectFs ? (
              ""
            ) : (
              <div
                className={
                  activeState.certificate ? styles.activeDiv : styles.div
                }
                onClick={() => handleScrollToElement(certificate.current)}
              >
                <p> Certificate</p>
              </div>
            )}

            <div
              className={activeState.syllabus ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(syllabus.current)}
            >
              <p> Syllabus</p>
            </div>
            <div
              className={activeState.project ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(project.current)}
            >
              <p> Projects</p>
            </div>
            <div
              className={activeState.review ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(review.current)}
            >
              <p> Reviews</p>
            </div>
            <div
              className={activeState.fee ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(fee.current)}
            >
              <p> Fee</p>
            </div>
            <div
              className={activeState.batchDate ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(batchDate.current)}
            >
              <p> Batch Date</p>
            </div>
            <div
              className={activeState.faq ? styles.activeDiv : styles.div}
              onClick={() => handleScrollToElement(faq.current)}
            >
              <p> Faq</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  ) : (
    ""
  );
};

export default SecondNavbar;
