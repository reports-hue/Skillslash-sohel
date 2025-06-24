import React from "react";
import styles from "./Footer.module.css";
import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { MdMail, MdCall } from "react-icons/md";
import { FaAndroid } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {
  DataScienceData,
  FullStackCity,
  WebCity,
  BusinessCity,
} from "../InternalLinking/FooterCitiesData";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.firstFooter}>
        <div className={styles.iconWrapper}>
          <a
            href="/"
            style={{ cursor: "pointer" }}
            aria-label="Go to the Home Page of skillslash"
          >
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/Skillslash-Logo-(white).webp"
              alt="Skillslash"
              quality={100}
              style={{ objectFit: "contain" }}
              width={210}
              height={60}
              loading="lazy"
            />
          </a>
          <p className={styles.desc}>
            Skillslash is an online training company, with the vision to help
            the talented aspirants and working professionals to stride ahead in
            their career. We offer radical courses in the areas like Software
            Development, Analytics, Data Science.
          </p>
          <h5>Follow us!</h5>
          <div className={styles.sIcon}>
            <a
              href="https://www.facebook.com/SkillSlash-100623872122442"
              target="_blank"
              aria-label="Go to the facebook page of skillslash"
            >
              <FaMeta className={styles.FIcon} />
            </a>
            <a
              href="https://www.instagram.com/skillslash_Academy/"
              target="_blank"
              aria-label="Go to the Instagram of skillslash"
            >
              <FaInstagram className={styles.FIcon} />
            </a>
            <a
              href="https://www.youtube.com/c/Skillslash"
              target="_blank"
              aria-label="Go to the Youtube of skillslash"
            >
              <FaYoutube className={styles.FIcon} />
            </a>
            <a
              href="https://twitter.com/skillslash"
              target="_blank"
              aria-label="Go to the Twitter Page of skillslash"
            >
              <FaXTwitter className={styles.FIcon} />
            </a>
            <a
              href="https://www.linkedin.com/company/skillslash"
              target="_blank"
              aria-label="Go to the Linkedin Page of skillslash"
            >
              <FaLinkedinIn className={styles.FIcon} />
            </a>
          </div>
          <a href="mailto:info@skillslash.com" aria-label="mail your queries">
            <p>
              <MdMail className="FIcon" />
              info@skillslash.com
            </p>
          </a>
          <a href="tel:+91 " aria-label="call skillslash">
            <p>
              <MdCall className="FIcon" />
            </p>
          </a>

          <p className="mt-2">For Support call On this Number</p>
          <div className="flex flex-col gap-2">
            <a href="tel:+918867307615" className="text-white">
              +918867307615
            </a>
            <a href="tel:+918105904632" className="text-white">
              +918105904632
            </a>
          </div>
        </div>
        <div className={styles.fPages}>
          <h5>Pages</h5>
          <Link href="/event">
            <p>Events</p>
          </Link>
          <Link href="/About">
            <p>About</p>
          </Link>

          <Link href="/Contact-us">
            <p>Contact</p>
          </Link>
          <h5>Join us</h5>
          <Link href="/Career">
            <p>Career</p>
          </Link>
          <p>Become an Instructor</p>
        </div>
        <div className={styles.FJoin}>
          <h5>Courses</h5>
          <div className={styles.linksWrap}>
            <Link href="/advanced-data-science-and-ai-course-with-real-work-experience">
              <span>Advanced Data Science and AI Course </span>
            </Link>
            <Link href="/business-analytics-course">
              <span>Business Analytics online Training </span>
            </Link>
            <Link href="/full-stack-developer-course">
              <span>Full Stack Developer course with certification</span>
            </Link>
            <Link href="/web-development-course">
              <span>Web Development Course With Certification</span>
            </Link>
          </div>
          <div className={styles.terms}>
            <h5>Terms & condition</h5>
            <Link href="/terms-of-use">
              <span>Terms of Use</span>
            </Link>
            <Link href="/privacy-statement">
              <span>Privacy Policy</span>
            </Link>
            <Link href="/refunds-cancellation">
              <span>Refund Policy</span>
            </Link>
          </div>
        </div>
        <div className={styles.FApp}>
          <h5>Download Our App</h5>
          <p>
            <FaAndroid />
            Get the android app
          </p>
          <h5>Find Us Here</h5>
          <span>
            No.255 2nd floor Skillslash above Airtel office ,17th cross road,
            HSR Layout Sector 6 Bangalore, Karnataka -560102
          </span>
        </div>
      </div>
      <hr />
      <div className={styles.secondFooter}>
        <h5>Our Office are located at</h5>
        <div className={styles.officeWrapper}>
          <div>
            <h5>Bengaluru</h5>
            <p>
              No.255 2nd floor Skillslash above Airtel office ,17th cross road,
              HSR Layout Sector 6 Bangalore, Karnataka -560102
            </p>
          </div>
          <div>
            <h5>Mumbai</h5>
            <p>
              Skillslash Pvt Ltd, Level 2, B, Andheri Kurla Road, Wing, Times
              Square, Unit 1, Andheri East Mumbai, Maharashtra 400059
            </p>
          </div>
          <div>
            <h5>Hyderabad</h5>
            <p>
              Skillslash Pvt Ltd, Level 2, iLabs Centre, Oval Building, Plot
              no.18, Inorbit Mall Rd, HITEC City Hyderabad, 500081
            </p>
          </div>
          <div>
            <h5>Gurugram</h5>
            <p>
              Skillslash Pvt Ltd, 10th floor, Tower-B Unitech Cyber Park, Sector
              39 Gurugram, Haryana 122003
            </p>
          </div>
        </div>
      </div>
      <hr />
      {/* <div className={styles.thirdFooter}>
        <h5>Data Science Course In Other Cities</h5>
        <div className={styles.top}>
          {DataScienceData.map((data) => {
            const { id, city, link } = data;
            return (
              <Link href={link} key={id}>
                <span>{city}&nbsp;&nbsp;|</span>
              </Link>
            );
          })}
        </div>
        <hr />
      </div>
      <div className={styles.thirdFooter}>
        <h5>Full Stack Course In Other Cities</h5>
        <div className={styles.top}>
          {FullStackCity.map((data) => {
            const { id, city, link } = data;
            return (
              <Link href={link} key={id}>
                <span>{city}&nbsp;&nbsp;|</span>
              </Link>
            );
          })}
        </div>
        <hr />
      </div>
      <div className={styles.thirdFooter}>
        <h5>Web Development Course In Other Cities</h5>
        <div className={styles.top}>
          {WebCity.map((data) => {
            const { id, city, link } = data;
            return (
              <Link href={link} key={id}>
                <span>{city}&nbsp;&nbsp;|</span>
              </Link>
            );
          })}
        </div>
        <hr />
      </div>
      <div className={styles.thirdFooter}>
        <h5>Business Analytics Course In Other Cities</h5>
        <div className={styles.top}>
          {BusinessCity.map((data) => {
            const { id, city, link } = data;
            return (
              <Link href={link} key={id}>
                <span>{city}&nbsp;&nbsp;|</span>
              </Link>
            );
          })}
        </div>
      </div> */}

      <p className={styles.rights}>
        © 2019-2023 – Skillslash. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
