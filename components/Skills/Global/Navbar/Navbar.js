import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MdOutlineArrowForward,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import dynamic from "next/dynamic";
const Popup = dynamic(() => import("../Popup/Popup"));
const Form = dynamic(() => import("../Form/Form"));
const MegaMenu = dynamic(() => import("../MegaMenu/MegaMenu"));
// import CountDownTimer from "../CountdownTimer/CountdownTimer";
const ContactForm = dynamic(() => import("../ContactusForm/ContactusForm"));

// const calculateTimeLeft = () => {
//   let year = new Date();
//   let difference = +new Date("2023-03-31 23:59") - +new Date();

//   let timeLeft = {};

//   if (difference > 0) {
//     timeLeft = {
//       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / 1000 / 60) % 60),
//       seconds: Math.floor((difference / 1000) % 60),
//     };
//   }

//   return timeLeft;
// };
const Navbar = ({
  dataScience,
  course,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectWeb,
  event,
}) => {
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState(false);
  const [popups, setPopups] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  });

  //timer code
  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // ...
  //timer useEffect
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // });
  const popupShow = () => {
    setPopups(true);
  };
  const showMenu = () => {
    setShow(!show);
  };
  const handleIcon = (data) => {
    setIcon(data);
  };

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          {/*<FaBars
            className={styles.ham}
            onClick={() => {
              showMenu();
              setIcon(false);
            }}*/}

          {!show ? (
            <FaBars
              className={styles.ham}
              onClick={() => {
                showMenu();
                setIcon(false);
              }}
            />
          ) : (
            <p
              className={styles.ham}
              style={{ fontSize: "45px", margin: "0" }}
              onClick={() => {
                showMenu();
                setIcon(false);
              }}
            >
              ⨯
            </p>
          )}

          <div className={show ? styles.mobileWrapper : styles.hide}>
            <div className={styles.mobileMenu}>
              <span onClick={showMenu}>
                <Link href="/event">Events</Link>
              </span>
              <span onClick={showMenu}>
              </span>

              <span onClick={showMenu}>
              </span>

              <span onClick={showMenu}>
                <Link href="/blog">Blogs</Link>
              </span>
            </div>
          </div>

          <Link href="/">
            <Image
              src="/cdn/static/web/New-UI/Skillslash-logo-new.svg"
              alt="Skillslash"
              quality={100}
              style={{ objectFit: "contain" }}
              width={180}
              height={60}
            />
          </Link>
          <button
            onMouseEnter={() => setIcon(true)}
            onMouseOver={() => setIcon(true)}
            onClick={() => {
              setIcon(!icon);
              setShow(false);
            }}
            className={styles.MegaBtn}
          >
            Our Courses
            {icon ? (
              <MdKeyboardArrowUp className={styles.bIcon} />
            ) : (
              <MdKeyboardArrowDown className={styles.bIcon} />
            )}
          </button>
          {icon ? (
            <div
              className="megaMenu"
              onMouseOver={() => setIcon(true)}
              onMouseLeave={() => setIcon(false)}
            >
              <MegaMenu handleIcon={handleIcon} />
            </div>
          ) : (
            ""
          )}
          <button onClick={popupShow} className={styles.mbtn}>
            Apply Now
          </button>
        </div>
        <div className={styles.right}>
          {event ? (
            <>
              <span>
                <Link href="#Feature">Program Features</Link>
              </span>

              <span>
                <Link href="#who">Who can join</Link>
              </span>
              <span>
                <Link href="#About">About us</Link>
              </span>
            </>
          ) : (
            <>
              {" "}
              <span>
                <Link href="/event">EVENTS</Link>
              </span>
              <span>
              </span>
              <span>
              </span>
              <span>
                <Link href="/blog">Blog</Link>
              </span>
            </>
          )}
        </div>
      </nav>
      {/* <main className={styles.TopBar}>
        Upto INR 30,000/- scholarship..... On selected courses for the 1st 2
        enrollments
      </main> */}
    </div>
  );
};

export default Navbar;
