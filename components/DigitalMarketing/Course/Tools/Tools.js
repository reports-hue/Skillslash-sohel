import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Tools.module.css'; // Import the CSS module

const Tools = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.toolsdiv}>
      <h2><span>Tools</span> Covered</h2>
      {isMobile ? (
        <Image
          src="/cdn/digital-marketing/tools_DM_mbl.svg"
          alt="Tools Mobile"
          width={600}
          height={200}
          loading="lazy"
          className={styles.toolsImage}
        />
      ) : (
        <Image
          src="/cdn/digital-marketing/tools_DM.svg"
          alt="Tools Desktop"
          width={1000}
          height={300}
          loading="lazy"
          className={styles.toolsImage}
        />
      )}
      <div className={styles.andMore}>
        <p>and 100 more</p>
      </div>
    </div>
  );
}

export default Tools;
