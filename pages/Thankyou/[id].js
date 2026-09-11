import React from "react";
import styles from "../../styles/ThankYou.module.css";
import Head from "next/head";
import Image from "next/image";
import { AiOutlineDownload } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import Link from "next/link";
import { getAllPostIds, getPostData } from "../../lib/Thankyou";

export default function ThankYou({ DataScienceCourseData }) {
  return (
    <>
      <div className={styles.main}>
        <Head>
          <title>{DataScienceCourseData.data.metaInfo.title}</title>
          <meta
            name="description"
            content={DataScienceCourseData.data.metaInfo.desc}
          />
          <meta name="robots" content="noindex,follow" />
        </Head>
        <section className={styles.mains}>
          <div className={styles.left}>
            <h4 className={styles.hptop}>
              <b>Thank you</b>

              {DataScienceCourseData.data.bold}
            </h4>
            <p className={styles.Ptop}>{DataScienceCourseData.data.para}</p>
            <div>
              <div className={styles.mainb}>
                <Link href={DataScienceCourseData.data.url}>
                  <button className={styles.Button}>Download Brochure</button>
                </Link>
                <div>
                  <Link href={DataScienceCourseData.data.back}>
                    <button className={styles.Button}>
                      <BsArrowLeftShort className="bIcons" />
                      Back To Course
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const DataScienceCourseData = getPostData(params.id);
  return {
    props: {
      DataScienceCourseData,
    },
  };
}
