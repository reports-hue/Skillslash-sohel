import React, { useEffect, useState } from "react";
import styles from "./JobOffer.module.css";
import { jobData } from "./JobOfferData";
import { FaRegUser, FaBriefcase, FaRupeeSign } from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
const JobOffer = () => {
  const [jobType, setJobType] = useState({
    jobType: "",
  });
  const [jobDetails, setJobDetails] = useState(jobData);
  const [viewJob, setViewJob] = useState(jobData);
  useEffect(() => {
    if (jobType.jobType === "Designer") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "Designer";
        })
      );
    }
    if (jobType.jobType === "Writer") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "Writer";
        })
      );
    }
    if (jobType.jobType === "SEO") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "SEO";
        })
      );
    }
    if (jobType.jobType === "Other") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "Other";
        })
      );
    }
    if (jobType.jobType === "Developer") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "Developer";
        })
      );
    }
    if (jobType.jobType === "Digital Marketing") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "Digital Marketing";
        })
      );
    }
    if (jobType.jobType === "Accountant") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "Accountant";
        })
      );
    }
    if (jobType.jobType === "Sales") {
      setViewJob(
        jobDetails.filter((jobData) => {
          return jobData.category === "Sales";
        })
      );
    }
  }, [jobType.jobType]);

  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJobType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let JobCategoryArray = jobData.map((job) => {
    return job.category;
  });

  let JobCategory = Array.from(new Set(JobCategoryArray));

  return (
    <div className={styles.jobWrapper}>
      <h4>
        Opport<span>unities at Skill</span>slash
      </h4>
      <div className={styles.jobDetailWrap}>
        <div className={styles.jobFilter}>
          <div className={styles.headWrap}>
            <h5>Job Categories</h5>{" "}
            <p
              onClick={() => {
                setJobType({ jobType: "viewAll" });
                setJobDetails(jobData);
              }}
            >
              Reset
            </p>
          </div>

          {JobCategory.map((data) => {
            return (
              <div className={styles.inputWrap} key={data}>
                <input
                  type="radio"
                  id={`jobType-${data}`}
                  name="jobType"
                  value={data}
                  onChange={handleParam()}
                />
                <label htmlFor={`jobType-${data}`}>{data}</label>
              </div>
            );
          })}
          <div className={styles.inputWrap}>
            <input
              type="radio"
              id="jobType-viewAll"
              name="jobType"
              value="viewAll"
              onChange={handleParam()}
            />
            <label>View All</label>
          </div>
        </div>
        <div className={styles.jobDetails}>
          {jobType.jobType === "viewAll"
            ? jobDetails.map((data) => {
                const {
                  id,
                  title,
                  open,
                  location,
                  exp,
                  category,
                  salary,
                  img,
                  applied,
                } = data;

                return (
                  <div className={styles.jdWrapper} key={id}>
                    <div className={styles.header}>
                      <div className={styles.logo}>
                        <Image
                          src={img}
                          width={40}
                          height={40}
                          alt="JOb-logo"
                        />
                      </div>
                      <div className={styles.title}>
                        <h2>{title}</h2>
                        <p className={open ? styles.open : styles.close}>
                          {open ? "Open" : "Close"}
                        </p>
                      </div>
                    </div>
                    <div className={styles.content}>
                      <p className={styles.location}>
                        <MdLocationOn className="bIcon" />
                        {location}
                      </p>
                      <span>
                        <p className={styles.jobP}>
                          <FaBriefcase className={styles.bIcon} />
                          {exp}+
                        </p>
                        <p>
                          <FaRupeeSign className={styles.bIcon} />
                          {salary}
                        </p>
                      </span>
                    </div>
                    <div className={styles.footer}>
                      <Link href="mailto:hr@skillslash.com">
                        <div className={styles.button}>
                          <MdEmail className={styles.bIcons} />
                          Mail your CV
                        </div>
                      </Link>
                      <p>
                        <FaRegUser className={styles.bIcon} />
                        {applied} Applicants
                      </p>
                    </div>
                  </div>
                );
              })
            : viewJob.map((data) => {
                const {
                  id,
                  title,
                  open,
                  location,
                  exp,
                  category,
                  salary,
                  img,
                  applied,
                } = data;

                return (
                  <div className={styles.jdWrapper} key={id}>
                    <div className={styles.header}>
                      <div className={styles.logo}>
                        <Image
                          src={img}
                          width={40}
                          height={40}
                          alt="JOb-logo"
                        />
                      </div>
                      <div className={styles.title}>
                        <h2>{title}</h2>
                        <p className={open ? styles.open : styles.close}>
                          {open ? "Open" : "Close"}
                        </p>
                      </div>
                    </div>
                    <div className={styles.content}>
                      <p className={styles.location}>
                        <MdLocationOn className="bIcon" />
                        {location}
                      </p>
                      <span>
                        <p className={styles.jobP}>
                          <FaBriefcase className={styles.bIcon} />
                          {exp}+
                        </p>
                        <p>
                          <FaRupeeSign className={styles.bIcon} />
                          {salary}
                        </p>
                      </span>
                    </div>
                    <div className={styles.footer}>
                      <Link href="mailto:hr@skillslash.com">
                        <div className={styles.button}>
                          <MdEmail className={styles.bIcons} />
                          Mail your CV
                        </div>
                      </Link>
                      <p>
                        <FaRegUser className={styles.bIcon} />
                        {applied} Applicants
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default JobOffer;
