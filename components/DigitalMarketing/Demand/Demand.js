import React from 'react';
import Image from 'next/image';
import styles from './Demand.module.css'; // Import the CSS module
import { useState } from 'react';
import Link from 'next/link';
import Popup from '../../Skills/Global/Popup/Popup';
import Form from '../../Skills/Global/Form/Form';
const Demand = ({
  redirectDM,
  changeHeading ,
  redirectDs,
  redirectFs,
  redirectDa,
}) => {
  const [popups, setPopups] = useState(false);
  const popupShow = (demoClass, changeText) => {
    setPopups(true);
  };
  return (
    <>
           <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="RightPopup">
          {changeHeading ? (
            <h5>Download Program Handbook</h5>
          ) : (
            <h5>
              Get a chance to understand this course in detail from our
              counsellors
            </h5>
          )}
          <p>Fill the below Details to get started</p>
          <Form
            popup={true}
            setTrigger={setPopups}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectDa={redirectDa}
            redirectDM={redirectDM}
          />
        </div>
      </Popup>
      <div className={styles.DemandHead}>
         <div className={styles.backgroundImageWrapper}>
          <Image 
  src="/cdn/digital-marketing/demand_bg_1.svg"
  layout="responsive"
  width={10} // Set the width of your image
  height={10} // Set the height of your image
  objectFit="cover"
  alt="bg Demand" 
  loading="lazy"
/>

          </div>
        <div className={styles.headline}>   <h2  className={styles.h2}>Our In-demand Course</h2></div>
     
        <div className={styles.DemandMain}>
         
          <div className={styles.contentMainDiv}>
          <div className={styles.content}>
            <h2>Digital Marketing Master Course</h2>
           
            <div className={styles.top}>
              <span>with Gen AI </span>
              <Image
                src="/cdn/digital-marketing/Bard_Dm.svg"
                width={20}
                height={20}
                alt="Bard"
              />
            </div>
            
         
            <div className={styles.details}>
              <div className={styles.list}>
                <Image src="/cdn/digital-marketing/Time.svg" width={30} height={30} alt='icon'/>
                
                <p>6 months</p></div>
              <div className={styles.list}>
              <Image src="/cdn/digital-marketing/Class.svg" width={30} height={30} alt='icon'/>
                <p>Live Learning Mode</p></div>
              <div className={styles.list}>
              <Image src="/cdn/digital-marketing/Class.svg" width={30} height={30} alt='icon'/>
                <p>10+ Certificates</p></div>
              <div className={styles.list}>
              <Image src="/cdn/digital-marketing/Quality.svg" width={30} height={30} alt='icon'/>
                <p>Premium Career Support</p></div>

              <div className={styles.btn}>
                <Link href="/liveclass/digital-marketing-master-course">
                <button className={styles.btnleft}>View Course</button>
                </Link>
                <button  id="clck-free-counselling"
            onClick={() => popupShow()} className={styles.btnryt}>Brochure</button>
              </div>
            </div>
          </div>
          <div className={styles.supportImg}>
            <Image src="/cdn/digital-marketing/org_lady.svg"
            width={390}
            height={300}/>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demand;
