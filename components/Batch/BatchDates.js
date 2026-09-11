import React, { useState, useEffect } from "react";
import styles from "./BatchDates.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

const BatchDates = ({
  batchDetails,
  dataScience,
  redirectDs,
  redirectBa,
  redirectBl,
  redirectDe,
  redirectFs,
  redirectWeb,
}) => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 641) {
      setMobile(true);
    }
  }, [mobile]);

  return (
    <div className={styles.BatchDates}>
      <h3 className={styles.MHeading}>
        Next coh<span>orts Dates</span>
      </h3>

      {batchDetails === "" ? (
        <p>Batch Date will be updated soon!</p>
      ) : (
        batchDetails.map((data, i) => {
          return (
            <div
              className={
                data.activeBatch
                  ? styles.batchDateWrapActive
                  : styles.batchDateWrap
              }
              key={i}
            >
              <div className={styles.dateWrap}>
                <div
                  className={data.activeBatch ? styles.dateActive : styles.date}
                >
                  <span className={styles.month}>{data.batchMonth}</span>
                  <p>{data.batchDate}</p>
                  <span className={styles.tag}>{data.batchStatus}</span>
                </div>
              </div>
              <div className={styles.batchDetailsWrap}>
                <div
                  className={
                    data.activeBatch
                      ? styles.batchDetails
                      : styles.batchDetailsI
                  }
                >
                  <h3>
                    {data.batchType}&nbsp;
                    {data.batchStartTime}-{data.batchEndTime}
                  </h3>
                  {data.activeBatch ? (
                    <p className={styles.desc}>{data.batchDesc} </p>
                  ) : (
                    <p className={styles.desc}>{data.batchDesc} </p>
                  )}

                  <div className={styles.batchDetailsMobile}>
                    <span className={styles.batchTypeMobile}>
                      <AiOutlineCalendar className={styles.spanIconS} />
                      <p className={styles.batchTypeName}>{data.batchWeek}</p>
                    </span>
                    <span className={styles.batchFilledMobile}>
                      <MdDoneAll className={styles.spanIcon} />
                      <p className={styles.status}>{data.batchMsg}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.batchInfo}>
                <div className={styles.batchStatus}>
                  <span
                    className={
                      data.activeBatch ? styles.activeBatch : styles.batchType
                    }
                  >
                    <AiOutlineCalendar
                      className={
                        data.activeBatch ? styles.spanIconA : styles.spanIcon
                      }
                    />

                    <p
                      className={
                        data.activeBatch
                          ? styles.batchTypeName
                          : styles.batchTypeNameI
                      }
                    >
                      {data.batchWeek}
                    </p>
                  </span>
                </div>
                <div className={styles.batchStatus}>
                  <span
                    className={
                      data.activeBatch ? styles.activeBatch : styles.batchFilled
                    }
                  >
                    <MdDoneAll
                      className={
                        data.activeBatch ? styles.spanIconA : styles.spanIcon
                      }
                    />
                    <p
                      className={
                        data.activeBatch ? styles.status : styles.statusI
                      }
                    >
                      {data.batchMsg}
                    </p>
                  </span>
                </div>
              </div>
              <div className={styles.enrollWrap}>
                <div className={styles.batchEnroll}></div>
              </div>
            </div>
          );
        })
      )}

      {/* <div className={styles.batchDateWrap}>
        <div className={styles.dateWrap}>
          <div className={styles.date}>
            <span className={styles.month}>AUG</span>
            <p>09</p>
            <span className={styles.tag}>Filled</span>
          </div>
        </div>
        <div className={styles.batchDetailsWrap}>
          <div className={styles.batchDetails}>
            <h3>Morning Batch, 08:00 to 10:00</h3>
            <p className={styles.desc}>
              Enrollment for this batch are no longer accepted
            </p>
            <div className={styles.batchDetailsMobile}>
              <span className={styles.batchTypeMobile}>
                <AiOutlineCalendar className={styles.spanIcon} />
                <p className={styles.batchTypeName}>
                  weekday batch (Mon - Fri)
                </p>
              </span>
              <span className={styles.batchFilledMobile}>
                <MdDoneAll className={styles.spanIcon} />
                <p className={styles.status}>All Seats are filled up</p>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.batchInfo}>
          <div className={styles.batchStatus}>
            <span className={styles.batchType}>
              <AiOutlineCalendar className={styles.spanIcon} />
              <p className={styles.batchTypeName}>weekday batch (Mon - Fri)</p>
            </span>
          </div>
          <div className={styles.batchStatus}>
            <span className={styles.batchFilled}>
              <MdDoneAll className={styles.spanIcon} />
              <p className={styles.status}>All Seats are filled up</p>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.batchDateWrapActive}>
        <div className={styles.dateWrap}>
          <div className={styles.dateActive}>
            <span className={styles.month}>AUG</span>
            <p>09</p>
            <span className={styles.tag}>New</span>
          </div>
        </div>
        <div className={styles.batchDetailsWrap}>
          <div className={styles.batchDetails}>
            <h3>Morning Batch, 08:00 to 10:00</h3>
            <p className={styles.desc}>
              Limited seats are available{" "}
              <span className={styles.red}> Hurry!</span>
            </p>
            <div className={styles.batchDetailsMobile}>
              <span className={styles.batchTypeMobile}>
                <AiOutlineCalendar className={styles.spanIcon} />
                <p className={styles.batchTypeName}>
                  weekday batch (Mon - Fri)
                </p>
              </span>
              <span className={styles.batchFilledMobile}>
                <MdDoneAll className={styles.spanIcon} />
                <p className={styles.status}>seats are partially filled</p>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.batchInfo}>
          <div className={styles.batchStatus}>
            <span>
              <AiOutlineCalendar className={styles.spanIconA} />
              <p className={styles.batchTypeName}>weekday batch (Mon - Fri)</p>
            </span>
          </div>
          <div className={styles.batchStatus}>
            <span className={styles.activeBatch}>
              <MdDoneAll className={styles.spanIconA} />
              <p className={styles.status}>Seats are partially filled</p>
            </span>
          </div>
        </div>
        <div className={styles.enrollWrap}>
          <div className={styles.batchEnroll}>
            <button className={styles.activeButton}>Enroll Now</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BatchDates;
