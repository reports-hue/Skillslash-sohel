import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/verifyCertificate.module.css";
import { GoVerified } from "react-icons/go";

const verify = () => {
  const [loading, setLoading] = useState(false);
  const [storeCertificate, setStoreCertificate] = useState(null);
  const [errorStoreCertificate, setErrorStoreCertificate] = useState("");
  const [query, setQuery] = useState({
    id: "",
  });

  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const getCertificate = await fetch("/api/v1/verifyCertificate", {
        method: "POST",
        body: JSON.stringify({ id: query.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (getCertificate.status === 200) {
        setErrorStoreCertificate("");
        const { certificate, msg } = await getCertificate.json();

        setStoreCertificate(certificate);
        setErrorStoreCertificate(msg);
        setQuery({
          id: "",
        });
      }
      if (getCertificate.status === 404) {
        setStoreCertificate("");

        const { certificate, msg } = await getCertificate.json();

        setStoreCertificate(certificate);
        setErrorStoreCertificate(msg);

        setQuery({
          id: "",
        });
      }
    } catch (error) {}
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Verify Your Skillslash Certificate</title>
        <meta
          name="description"
          content="Enter a certificate ID to verify a Skillslash course completion certificate."
        />
      </Head>
      <div className={styles.FormWrappers}>
        {/* h1, not h2: this is the page's main heading. Style is copied
            from the global h2/h4 rule so the visual result is unchanged. */}
        <h1
          style={{
            fontWeight: 700,
            fontSize: "37px",
            lineHeight: "43px",
            margin: 0,
            color: "#000000",
          }}
        >
          Verify Your Certificate
        </h1>
        <div className={styles.formContainer}>
          <form onSubmit={formSubmit}>
            <div className={styles.formWrapper}>
              <input
                type="text"
                name="id"
                className={styles.NameInput}
                required
                placeholder="Enter Your Certificate Id*"
                value={query.id}
                onChange={handleParam()}
              />
            </div>

            {loading ? (
              <div className="center">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
            ) : (
              <button type="submit" className={styles.button}>
                Verify
                <GoVerified />
              </button>
            )}
          </form>
        </div>
      </div>
      {errorStoreCertificate === "" ? (
        ""
      ) : errorStoreCertificate === "Certificate Found" ? (
        <div className={styles.pdfWrapper}>
          <iframe
            src="https://embed.lottiefiles.com/animation/50465"
            frameBorder={0}
          ></iframe>
          {/* <embed
            src={`${storeCertificate.downloadFile}#toolbar=0`}
            frameBorder={0}
            allowFullScreen
            width={1122}
            height={793}
            className={styles.emb}
          />

          <iframe
            src={storeCertificate.downloadFile}
            frameBorder={0}
            className={styles.mobileFrame}
          ></iframe> */}

          <h2>Your certificate is verified!</h2>
          {storeCertificate === null ? (
            ""
          ) : (
            // <button>
            //   <a href={storeCertificate.downloadFile}>Download certificate</a>
            // </button>
            ""
            
          )}
        </div>
      ) : (
        ""
      )}
      {errorStoreCertificate === "" ? (
        ""
      ) : errorStoreCertificate === "Certificate Not Found" ? (
        <div className={styles.pdfWrapperS}>
          <iframe
            src="https://embed.lottiefiles.com/animation/62152"
            frameBorder={0}
          ></iframe>

          <h2>Your Certificate Id is Invalid!</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default verify;
