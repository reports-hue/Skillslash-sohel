import React, { useEffect } from 'react';
import styles from './WhyChooseUs.module.css';
import Image from 'next/image';

const DmChoose = () => {

  useEffect(() => {
    const boxes = document.querySelectorAll(`.${styles.box}`);

    const handleMouseMove = (e) => {
      const box = e.currentTarget;
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 200;
      const centerY = rect.height / 200;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (e) => {
      e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    boxes.forEach(box => {
      box.addEventListener('mousemove', handleMouseMove);
      box.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      boxes.forEach(box => {
        box.removeEventListener('mousemove', handleMouseMove);
        box.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className={styles.mainus}>
      <h2>Why Choose Us</h2>

      <div className={styles.boxgroup}>
        <div className={styles.box}>
          <h4>10+</h4>
          <p>Brand <br /> certificate</p>
        </div>

        <div className={styles.box}>
          <h4>30+</h4>
          <p>Brand Case<br /> Studies</p>
        </div>

        <div className={styles.box}>
          <h4>100%</h4>
          <p>Placement<br /> Assistance</p>
        </div>

        <div className={styles.box}>
          <h4>1:1</h4>
          <p>Doubt clearing<br /> Sessions</p>
        </div>
      </div>

      <div className={styles.maindownbox}>
        <div className={styles.downbox}>
          <div className={styles.content}>
            <p className={styles.pup}>guaranteed <span className={styles.span}>Internship</span></p>
          </div>
          <div className={styles.rytdiv}>
            <Image src="/cdn/digital-marketing/black-white-man.svg" alt='choose' width={280} height={300} loading='lazy' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DmChoose;
