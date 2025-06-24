import React, { useState, useEffect } from "react";
import styles from "./OfferPopup.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";

const CustomPopup = ({
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectDSA,
  redirectWeb,
}) => {
  const [open, setOpen] = useState(false);
  const [popups, setPopups] = useState(false);
  const [onetime, setOnetime] = useState(true);

  const handelOpen = () => {
    setOpen(false);
    setOnetime(false);
  };

  useEffect(() => {
    if (onetime)
      setTimeout(() => {
        setOpen(true);
      }, 3000);
    return;
  }, []);
  const popupShow = () => {
    setPopups(true);
  };
  return (
    <div className={open ? styles.OfferPopupCus : styles.hide}>
      <AiFillCloseCircle className={styles.Icon} onClick={handelOpen} />
      <div className={styles.Offer}>
        <h6 className="font-bold">Grab 50% Discount on All Our Bootcamp</h6>
        <p>
          <strong>Data Science & AI Bootcamp - Professionals:</strong>
          <s style={{ marginRight: "5px" }}> MRP ₹11,999</s>
          <s> 5,999</s> 3000
        </p>
        <p>
          <strong>Data Science & AI Bootcamp - College Students:</strong>
          <s style={{ marginRight: "5px" }}> MRP ₹9,999</s>
          <s>4,999 </s>2500
        </p>
        <p>
          <strong>Data Analytics- Non Tech Professionals:</strong>{" "}
          <s style={{ marginRight: "5px" }}>MRP ₹7,999 </s>
          <s>3,999 </s>2000
        </p>
        <p>
          <strong>DSA and System Design :</strong>
          <s style={{ marginRight: "5px" }}>MRP ₹7,999 </s>
          <s>3,999</s> 2000
        </p>
        <div className="flex gap-2">
          <Link
            href="https://wa.me/+91 ?text=ChatWithUs"
            style={{ marginTop: "20px" }}
          >
            <button>Get Discount</button>
          </Link>
          <Link
            href="https://wa.me/+91 ?text=ChatWithUs"
            style={{ marginTop: "20px" }}
          >
            <button>Watch Intro Video</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
