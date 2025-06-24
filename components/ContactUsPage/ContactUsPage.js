import React from "react";
import dynamic from "next/dynamic";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import Image from "next/image";
import ContactForm from "../ContactusForm/ContactusForm";
import styles from "../../styles/contact-us.module.css";
import { HiBuildingOffice2 } from "react-icons/hi2";

const ContactUsPage = () => {
  return (
    <>
      <div className={styles.Contact}>
        <div className={styles.contactHead}>
          <div className={styles.formSection}>
            <div className={styles.leftFromSection}>
              <h1>Leave your query and we’ll reach out to you</h1>
              <div className={styles.formW}>
                <ContactForm />
              </div>
            </div>
            <div className={styles.rightFromSection}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/support-image.jpg"
                width="542"
                height="371"
                alt="contact-us"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.topInfo}>
        <p className="pTop">contact us</p>
        <h4>Get in touch with us</h4>
        <div className={styles.infoWrap}>
          <div className={styles.info}>
            <div className={styles.infoLeftSide}>
              <AiOutlineHome className={styles.HomeIcon} />
            </div>
            <div className={styles.infoRightSide}>
              <h5>Visit us</h5>
              <p>Skillslash, HSR Sector 6, 560102</p>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.infoLeftSide}>
              <AiOutlineMail className={styles.MailIcon} />{" "}
            </div>
            <a href="mailto:info@skilllsash.com">
              <div className={styles.infoRightSide}>
                <h5>Email</h5>
                <p>info@skillsash.com</p>
              </div>
            </a>
          </div>
          <div className={styles.info}>
            <div className={styles.infoLeftSide}>
              <BiPhoneCall className={styles.PhoneIcon} />
            </div>
            <a href="tel: " target="_blank">
              <div className={styles.infoRightSide}>
                <h5>Phone</h5>
                <p> </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.ourOffice}>
        <h6>Our Offices</h6>
        <div className={styles.officeLocation}>
          <div className={styles.LocationBox}>
            <div className={styles.top}>
              <HiBuildingOffice2 />
            </div>
            <div className={styles.bottom}>
              <h5>Bangalore (HQ)</h5>
              <p>
                No.255 2nd floor Skillslash above Airtel office ,17th cross
                road, HSR Layout Sector 6 Bangalore, Karnataka -560102
              </p>
              <a
                href="https://www.google.com/maps/place/Skillslash/@12.934427,77.694266,13z/data=!4m5!3m4!1s0x0:0x454e4c9c26cfc3f8!8m2!3d12.9344271!4d77.6942656?hl=en"
                target="_blank"
              >
                <p className={styles.IconPara}>
                  <MdOutlineLocationOn /> Get direction
                </p>
              </a>
            </div>
          </div>
          <div className={styles.LocationBox}>
            <div className={styles.top}>
              <HiBuildingOffice2 />
            </div>
            <div className={styles.bottom}>
              <h5>Mumbai</h5>
              <p>
                Skillslash Pvt Ltd, Level 2, B, Andheri Kurla Road, Wing, Times
                Square, Unit 1, Andheri East Mumbai, Maharashtra 400059
              </p>
              <a
                href="https://www.google.com/maps/place/Skillslash/@19.106737,72.882517,13z/data=!4m5!3m4!1s0x0:0x7c5440708ff6a610!8m2!3d19.1067368!4d72.8825239?hl=en"
                target="_blank"
              >
                <p className={styles.IconPara}>
                  <MdOutlineLocationOn /> Get direction
                </p>
              </a>
            </div>
          </div>
          <div className={styles.LocationBox}>
            <div className={styles.top}>
              <HiBuildingOffice2 />
            </div>
            <div className={styles.bottom}>
              <h5>Hyderabad</h5>
              <p>
                Skillslash Pvt Ltd, Level 2, iLabs Centre, Oval Building, Plot
                no.18, Inorbit Mall Rd, HITEC City Hyderabad, Telangana 500081
              </p>
              <a
                href="https://www.google.com/maps/place/Skillslash/@17.4324482,78.3872514,15z/data=!4m5!3m4!1s0x0:0x1022d0491cb5a1a3!8m2!3d17.4324642!4d78.3872631"
                target="_blank"
              >
                <p className={styles.IconPara}>
                  <MdOutlineLocationOn /> Get direction
                </p>
              </a>
            </div>
          </div>
          <div className={styles.LocationBox}>
            <div className={styles.top}>
              <HiBuildingOffice2 />
            </div>
            <div className={styles.bottom}>
              <h5>Austin</h5>
              <p>
                Skillslash Pvt Ltd, Chase Park 7600 Chevy Chase Drive Suite 300,
                Texas, Austin
              </p>
              <a
                href="https://www.google.com/maps/place/Skillslash/@17.4324482,78.3872514,15z/data=!4m5!3m4!1s0x0:0x1022d0491cb5a1a3!8m2!3d17.4324642!4d78.3872631"
                target="_blank"
              >
                <p className={styles.IconPara}>
                  <MdOutlineLocationOn /> Get direction
                </p>
              </a>
            </div>
          </div>
          <div className={styles.LocationBox}>
            <div className={styles.top}>
              <HiBuildingOffice2 />
            </div>
            <div className={styles.bottom}>
              <h5>Gurugram</h5>
              <p>
                Skillslash Pvt Ltd, 10th floor, Tower-B Unitech Cyber Park,
                Gurugram, Haryana 122003
              </p>
              <a
                href="https://www.google.com/maps/place/Skillslash/@17.4324482,78.3872514,15z/data=!4m5!3m4!1s0x0:0x1022d0491cb5a1a3!8m2!3d17.4324642!4d78.3872631"
                target="_blank"
              >
                <p className={styles.IconPara}>
                  <MdOutlineLocationOn /> Get direction
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
