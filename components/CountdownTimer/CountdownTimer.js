import styles from "./datetime.module.css";
import DateTimeDisplay from "./DateTimeDisplay";

const ExpiredNotice = () => {
  return (
    <div className={styles.expiredNotice}>
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};
const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={styles.showCounter}>
      <div className={styles.countdownLink}>
        <DateTimeDisplay isDanger={days <= 3} type="Days" value={days} />
        <p className={styles.dot}>:</p>
        <DateTimeDisplay isDanger={false} type="Hrs" value={hours} />
        <p className={styles.dot}>:</p>
        <DateTimeDisplay isDanger={false} type="Min" value={minutes} />
        <p className={styles.dot}>:</p>
        <DateTimeDisplay isDanger={false} type="Sec" value={seconds} />
      </div>
    </div>
  );
};

const CountDownTimer = ({ targetDate }) => {
  return (
    <ShowCounter
      days={targetDate.days}
      hours={targetDate.hours}
      minutes={targetDate.minutes}
      seconds={targetDate.seconds}
    />
  );
};

export default CountDownTimer;
