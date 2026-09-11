import React, { useState, useEffect } from "react";
import styles from "./SeoCertificate.module.css";
import { BsCheckLg } from "react-icons/bs";
import Image from "next/image";

const Certificate = ({
  title,
  altR,
  altM,
  src,
  subheading,
  redirectFs,
  redirectDSA,
  redirectBa,
  redirectWeb,
  seoPage,
  MicrosoftPara,
  RealWorkPara,
  CertificationPara,
}) => {
  const [showCert, setShowCert] = useState({
    microsoft: true,
    realWork: false,
  });
  return (
    <section className={styles.Certifcate}>
      {redirectFs || redirectWeb || redirectDSA ? (
        <div className={styles.bottom}>
          <div className={styles.desc}>
            <h3>Real Work Experience Certificate</h3>
            {seoPage ? (
              <div
                dangerouslySetInnerHTML={{ __html: RealWorkPara }}
                className={styles.seoPara}
              ></div>
            ) : (
              <p className={styles.descPara}>
                Real work experience gives you the Real edge
              </p>
            )}
            <div className={styles.sections}>
              <p className={styles.point}>
                <BsCheckLg className={styles.check} /> Project certification
                from top MNCs to gain that edge
              </p>
              <p className={styles.point}>
                <BsCheckLg className={styles.check} />
                Practical experience to tackle real-world problems
              </p>
              <p className={styles.point}>
                <BsCheckLg className={styles.check} />
                Edge over all those with just course certifications
              </p>
              <p className={styles.point}>
                <BsCheckLg className={styles.check} /> Get recognized for new
                job opportunities
              </p>
            </div>
          </div>
          <div className={styles.btRight}>
            <div className={styles.imgWrap}>
              <Image
                className="shadow"
                src={src}
                alt={altR}
                quality={100}
                width={327}
                loading="lazy"
                height={451}
                title="Real Work Experience Certificate"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.DeskCert}>
          <div className={styles.topWrap}>
            <h2 className={styles.dualHead}>{subheading}</h2>
            {seoPage ? (
              <div
                dangerouslySetInnerHTML={{ __html: CertificationPara }}
                className={styles.seoPara}
                style={{ color: "#646464" }}
              ></div>
            ) : (
              ""
            )}
            {/* <h5>{title}</h5> */}
          </div>

          <div className={styles.certWrap}>
            <div className={styles.left}>
              <span
                className={showCert.microsoft ? styles.activeSpan : styles.span}
                onClick={() =>
                  setShowCert({
                    microsoft: true,
                    realWork: false,
                  })
                }
              >
                Microsoft Certification
              </span>
              <span
                className={showCert.realWork ? styles.activeSpan : styles.span}
                onClick={() =>
                  setShowCert({
                    microsoft: false,
                    realWork: true,
                  })
                }
              >
                Real Work Certificate
              </span>
            </div>
            {showCert.microsoft ? (
              <div className={styles.top}>
                <div className={styles.imgWrapper}>
                  <Image
                    className="shadow"
                    src={
                      redirectBa
                        ? "/cdn/static/web/New-UI/data-sample-certificate.svg"
                        : "/cdn/static/web/New-UI/Microsoft-certificate-data-science-without-border.svg"
                    }
                    alt={altM}
                    quality={100}
                    width={450}
                    priority={true}
                    height={300}
                    title="Microsoft Certification"
                  />
                </div>
                <div className={styles.btRight}>
                  <div className={styles.desc}>
                    <div className={styles.logo}>
                      <div>
                        <Image
                          src="/cdn/static/web/New-UI/Skillslash-new-white-new-logo.svg"
                          alt="Skillslash"
                          quality={100}
                          style={{ objectFit: "contain" }}
                          width={210}
                          height={40}
                        />
                      </div>
                      <span
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Image
                          src="/cdn/static/web/New-UI/microsoft-white-1.svg"
                          alt="Skillslash"
                          quality={100}
                          width={200}
                          height={43}
                        />
                      </span>
                    </div>
                    <div className={styles.headingImg}>
                      <h3>Microsoft Certification</h3>
                    </div>
                    {seoPage ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: MicrosoftPara }}
                        className={styles.seoPara}
                      ></div>
                    ) : (
                      <p>Be in demand with Microsoft certification</p>
                    )}

                    <div className={styles.sections}>
                      <p className={styles.point}>
                        <BsCheckLg className={styles.check} />
                        Be certified in Azure AI Fundamentals
                      </p>
                      <p className={styles.point}>
                        <BsCheckLg className={styles.check} />
                        Be ahead of those who don’t have one
                      </p>
                      <p className={styles.point}>
                        <BsCheckLg className={styles.check} /> Earn the
                        credibility of a true professional
                      </p>
                      <p className={styles.point}>
                        <BsCheckLg className={styles.check} /> Advance your
                        career and get hired faster
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {showCert.realWork ? (
              <div className={styles.top}>
                <div className={styles.btRight}>
                  <div className={styles.imgWrap}>
                    <Image
                      className="shadow"
                      src={src}
                      alt={altR}
                      quality={100}
                      width={327}
                      loading="lazy"
                      height={451}
                      title="Real Work Experience Certificate"
                    />
                  </div>
                </div>
                <div className={styles.desc}>
                  <h3>Real Work Experience Certificate</h3>
                  {seoPage ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: RealWorkPara }}
                      className={styles.seoPara}
                    ></div>
                  ) : (
                    <p className={styles.descPara}>
                      Real work experience gives you the Real edge
                    </p>
                  )}
                  <div className={styles.sections}>
                    <p className={styles.point}>
                      <BsCheckLg className={styles.check} /> Project
                      certification from top MNCs
                    </p>
                    <p className={styles.point}>
                      <BsCheckLg className={styles.check} />
                      Practical experience to tackle problems
                    </p>
                    <p className={styles.point}>
                      <BsCheckLg className={styles.check} />
                      Edge over all those with Course certifications
                    </p>
                    <p className={styles.point}>
                      <BsCheckLg className={styles.check} /> Get recognized for
                      new job opportunities
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;
