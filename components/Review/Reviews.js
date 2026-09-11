import dynamic from "next/dynamic";
import styles from "./Reviews.module.css";
import { dsReview, fsReview, webReview, homeReview } from "./ReviewData";
import { useEffect, useState } from "react";
const ReviewSwiper = dynamic(() => import("./ReviewSwiper"));

const Reviews = ({
  redirectDs,
  redirectDM,
  redirectFs,
  redirectWeb,
  redirectDe,
  redirectBa,
  redirectBl,
  redirectDSA,
  dataScience,
  home,
  event,
}) => {
  const [review, setReview] = useState(dsReview);
  useEffect(() => {
    redirectDs || redirectBa || redirectDe || dataScience ||  redirectDM
      ? setReview(dsReview)
      : "";
    home ? setReview(homeReview) : "";
    event ? setReview(fsReview) : "";
    redirectFs || redirectDSA ? setReview(fsReview) : "";
    redirectWeb ? setReview(webReview) : "";
  }, []);
  // const [video, setVideo] = useState(false);
  // const videoSHow = () => {
  //   setVideo(true);
  // };
  return (
    <>
      {/* <VideoPopup triggers={video} setTriggers={setVideo} ids="iT54dOHPQpU" /> */}

      <div className={styles.ReviewSlider}>
        <div className={styles.headings}>
          <h2>
            All <span>Reviews</span>
          </h2>
        </div>
        <ReviewSwiper event={event} review={review} />
      </div>
    </>
  );
};

export default Reviews;
