import React from 'react';
import styles from './Tools.module.css'; // Import the CSS module

// The "Tools Covered" graphic used to be tools_DM.svg / tools_DM_mbl.svg -
// both turned out to be generic auto-generated placeholder art (a plain
// gradient circle with two letters, literally labeled "tools DM mbl" as
// its own SVG content), not real tool-logo artwork, and rendered at a
// disproportionate, oversized size as a result. Dropped rather than kept
// and resized, since no CSS fix makes placeholder content honest.
const Tools = () => {
  return (
    <div className={styles.toolsdiv}>
      <h2><span>Tools</span> Covered</h2>
      <div className={styles.andMore}>
        <p>and 100 more</p>
      </div>
    </div>
  );
}

export default Tools;
