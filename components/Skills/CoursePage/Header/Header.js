import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { MdOutlineAccessAlarms } from "react-icons/md";
import Link from "next/link";
import Popup from "../../Global/Popup/Popup";
import Form from "../../Global/Form/Form";
import { FaYoutube } from "react-icons/fa";
import {
  MdOutlineVideocam,
  MdLiveTv,
  MdOutlineWorkHistory,
  MdLockOpen,
} from "react-icons/md";
import ButtonWaveAnimation from "../../../ButtonWaveAnimation/WaveAnimation";
import { PiCertificateBold, PiMedal } from "react-icons/pi";
import VideoPlaylist from "../../Global/VideoPlaylist/VideoPlaylist";
import TabData from "../../Global/VideoPlaylist/VideoData";
import { ratingData } from "../../../../components/VideoTestimonial/ratingData";

// Mirrors VideoPlaylist's own "which category plays first" logic (same
// redirectDs/redirectFs/redirectDa priority, same default) so the hero
// thumbnail is a real frame from the video that actually opens when it's
// clicked, instead of a generic illustration unrelated to the video.
function demoVideoId(redirectDs, redirectFs, redirectDa) {
  if (redirectDs) return TabData[2].desc[0].link;
  if (redirectFs) return TabData[1].desc[0].link;
  return TabData[0].desc[0].link;
}

const Header = ({
  title,
  desc,
  imgSrc,
  hrs,
  certification,
  offerPrice,
  actualPrice,
  discount,
  link,
  checkoutLink,
  changeHeading,
  redirectDs,
  redirectFs,
  redirectDa,
  newDataScience,
  nomicrosoft,
  dmPage,
  titletwo,
  redirectDM,
  // The site's legacy course-selling pages (pages/[id].js,
  // pages/selfpaced/[id].js) were repurposed as informational content -
  // still live, still linkable, but no longer meant to sell a course. This
  // hides the lead-gen buttons and the price/buy-now card while keeping the
  // title, description and trust-signal badges above them. Defaults to
  // false so pages/liveclass/[id].js, which still runs a real checkout
  // funnel, is unaffected.
  hideSelling = false,
}) => {
  const [show, setShow] = useState(false);
  const showVideo = (data) => {
    setShow(data);
  };
  const [idBtnO, setIdBtnO] = useState("org-slo");
  const [idBtnV, setIdBtnV] = useState("org-dv");
  const [popups, setPopups] = useState(false);
  const popupShow = (demoClass, changeText) => {
    setPopups(true);
  };
  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  const triplet = (r, g, b) => {
    return (
      String.fromCharCode(r) + String.fromCharCode(g) + String.fromCharCode(b)
    );
  };
  return (
    <div className="grid grid-cols-[60%,39%] max-[741px]:flex max-[741px]:flex-col max-[901px]:grid-cols-[55%,44%] max-sm:flex max-sm:flex-col gap-5 max-sm:mb-[10px] bg-[#111621] w-full mt-[40px] max-sm:mt-[60px] max-sm:pt-4 min-[1600px]:mt-[70px] px-28 max-[1024px]:px-10 min-[1600px]:px-48 max-sm:px-0 py-[60px] min-[1600px]:py-[90px] pb-[70px] max-sm:pb-[30px] max-sm:py-4 relative">
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="RightPopup">
          {changeHeading ? (
            <h5>Download Program Handbook</h5>
          ) : (
            <h5>
              Get a chance to understand this course in detail from our
              counsellors
            </h5>
          )}
          <p>Fill the below Details to get started</p>
          <Form
            popup={true}
            setTrigger={setPopups}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectDa={redirectDa}
            redirectDM={redirectDM}
          />
        </div>
      </Popup>

      {show && (
        <VideoPlaylist
          setShow={showVideo}
          show={show}
          redirectDs={redirectDs}
          redirectFs={redirectFs}
          redirectDa={redirectDa}
          redirectDM={redirectDM}
        />
      )}

      {/* <div className="absolute gradient top-0 left-0 h-full w-[60%] max-sm:w-full z-0"></div> */}
      <div className="flex flex-col gap-4 relative z-[1] max-sm:px-5">
        <div className=" hidden gap-3 text-[#F18350] font-bold items-center max-sm:mb-[-8px] max-sm:gap-1 ">
          <p className="text-[#F18350] font-semibold min-[1600px]:text-[20px] max-sm:text-[15px] max-sm:font-medium">
            Self-Paced
          </p>
          <MdKeyboardArrowRight className="text-white min-[1600px]:text-[20px]" />
          <p className="text-[#F18350] font-semibold max-sm:text-[15px] min-[1600px]:text-[20px] max-sm:font-medium">
            Bootcamp
          </p>
        </div>

        {dmPage ? (
          <></>
        ) : (
          <>
            {" "}
            {nomicrosoft ? (
              <></>
            ) : (
              <>
                {" "}
                {redirectDs && (
                  <div className=" mt-4  w-max rounded flex items-center gap-2">
                    <p className="text-white font-medium">Powered by</p>
                    <div className="bg-white px-3 py-[3px] rounded-[4px]">
                      <Image
                        src="/cdn/Home/coursesection/microsoft.svg"
                        alt="PoweredByMicrosoft"
                        width={90}
                        height={19}
                        priority
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {redirectFs && (
          <div className="relative w-[348px] max-sm:w-[310px] h-[32px] max-sm:h-[29px] mt-3 max-sm:mt-12 ">
            {/* <Image src="/cdn/static/New_skillslash/Homepage/powered-by-microsoft--White.svg" alt="PoweredByMicrosoft" width={200} height={22}/> */}
            <Image
              src="/cdn/NewDatascience/Header/FAANG-Software-Developer-as-Trainers.svg"
              alt="FAANG Operators"
              fill
              priority
            />
          </div>
        )}
        {dmPage ? (
          <>
            {" "}
            <h1 className="text-5xl max-[901px]:text-2xl text-[#f18350] font-bold leading-[58px] max-[1281px]:text-3xl   max-sm:text-4xl max-sm:leading-[40px] max-[361px]:text-3xl">
              {title}
            </h1>
            <h2 className="text-5xl max-[901px]:text-2xl text-[#f18350] font-bold leading-[58px] max-[1281px]:text-3xl   max-sm:text-4xl max-sm:leading-[40px] max-[361px]:text-3xl">
              {" "}
              {titletwo}
            </h2>
            <div className="flex flex-row items-center gap-2">
              <Image
                src="/cdn/digital-marketing/chatgpt-icon.svg"
                width={40}
                height={40}
                alt="chat-gpt"
                loading="lazy"
              />
              <h3 className="text-white font-bold text-4xl">with Gen-AI</h3>
            </div>
          </>
        ) : (
          <>
            {" "}
            <h1 className="text-5xl max-[901px]:text-2xl text-white font-bold leading-[58px] max-[1281px]:text-3xl   max-sm:text-4xl max-sm:leading-[40px] max-[361px]:text-3xl">
              {title}
            </h1>
          </>
        )}

        <div className="flex gap-5 items-center min-[642px]:hidden max-sm:w-[90%] max-sm:mb-4 max-sm:mt-4">
          {ratingData.map((imgData, i) => {
            return (
              <div
                key={imgData.src}
                className={`${i === 0 ? "w-[23%]" : "w-[30%]"}`}
              >
                <Image
                  src={imgData.src}
                  width={imgData.width}
                  height={imgData.height}
                  alt="rating background"
                />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2 min-[1600px]:gap-0 border-[1px] mt-3 w-[75%] min-[1600px]:w-[60%] max-sm:w-[97%] rounded items-center px-4 py-1 justify-center max-sm:py-1 max-sm:px-2 max-sm:hidden">
          <Image
            src="/cdn/NewDatascience/googlereview-new.svg"
            alt="Goole_RReviews"
            width={150}
            height={23}
            priority
            className="mx-auto"
          />
          <Image
            src="/cdn/NewDatascience/Header/switch-up.svg"
            alt="switchup_RReviews"
            width={150}
            height={23}
            priority
            className="mx-auto"
          />
          <Image
            src="/cdn/NewDatascience/course-report.svg"
            alt="CR_RReviews"
            width={150}
            height={23}
            priority
            className="mx-auto"
          />
        </div>
        <p className="text-[#cccccc] w-[91%] min-[1600px]:w-[75%] text-[17px] max-sm:text-[16px] max-[1281px]:text-[16px] leading-[28px] max-sm:leading-[24px] font-light mt-2 max-sm:mt-2 min-[1600px]:text-[20px] max-sm:hidden">
          {desc}
        </p>
        <div className="flex  gap-3  max-[642px]:w-[80%]">
          {!hideSelling && (
            <button
              className="w-full min-[642px]:w-max px-3 bg-[#f18350] text-[15px] text-white rounded py-2 font-medium  flex justify-center items-center max-sm:text-[12px] max-sm:px-2"
              id="clck-free-counselling"
              onClick={() => popupShow()}
            >
              Free Counselling
            </button>
          )}
           {dmPage ? (<> </>):(<> <button
              className="w-full min-[642px]:w-max text-[15px] px-3 border-[1px] bg-transparent border-solid border-[#fff] text-white rounded py-2 font-medium  flex justify-center items-center
            max-sm:text-[12px] max-sm:px-2"
              onClick={() => showVideo(true)}
              id="clck-watch-demo"
            >
              Watch Demo{" "}
              <FaYoutube className="text-[#FF0000] text-[24px] max-sm:text-[16px]" />
            </button></>)}
        </div>
      </div>
      <div className="flex flex-col gap-7 relative w-full items-end justify-end">
        <div className="bg-white top-0 px-11 max-[1024px]:px-5 py-3 max-sm:px-0 rounded shadow flex flex-col w-full z-[1] max-sm:hidden absolute mt-28 max-[741px]:w-[52%] max-[741px]:top-0 max-[741px]:right-[-15px]">
          <div className="relative w-full  max-sm:w-[313px] h-[290px] max-[1281px]:h-[200px] max-sm:h-[220px] top-[-120px] max-sm:top-[-100px]  min-[1600px]:h-[320px] max-sm:left-7 max-sm:flex max-sm:justify-center">
           {dmPage ? (<> <div >
              <Image
                src={imgSrc}
                alt="headerImg"
                fill
                blurDataURL={rgbDataURL(237, 181, 6)}
                priority
                quality={40}
                id={idBtnV}
              />
              {/* <MdOutlinePlayCircleOutline
                className="absolute z-10 text-7xl text-white left-[42%] top-[41%] cursor-pointer "
                id={idBtnV}
              /> */}
            
            </div></>):(<> <div onClick={() => showVideo(true)} id={idBtnV}>
              {/* Real thumbnail of the demo video this click opens, not a
                  generic course illustration - see demoVideoId() above. */}
              <Image
                src={`https://i.ytimg.com/vi/${demoVideoId(redirectDs, redirectFs, redirectDa)}/hqdefault.jpg`}
                alt="headerImg"
                fill
                blurDataURL={rgbDataURL(237, 181, 6)}
                priority
                quality={40}
                id={idBtnV}
              />
              {/* <MdOutlinePlayCircleOutline
                className="absolute z-10 text-7xl text-white left-[42%] top-[41%] cursor-pointer "
                id={idBtnV}
              /> */}
              <ButtonWaveAnimation
                className="absolute z-10 text-7xl text-white left-[42%] top-[41%] cursor-pointer "
                id={idBtnV}
              />
            </div></>)}
          </div>
          {!hideSelling && (
          <div className="flex gap-2 w-full items-center mt-[-100px] max-sm:mt-[120px] max-sm:px-4">
            <p className="text-[#000000] flex gap-4 text-2xl font-bold items-center mr-3 mb-2">
              {offerPrice}
              {/* {newDataScience && (
                <span className="line-through text-lg font-normal text-[#646464]">
                  {actualPrice}
                </span>
              )} */}
            </p>
            {/* <Image
              src="/cdn/static/New_skillslash/CoursePage/icon/discount.svg"
              alt="discount"
              width={20}
              height={20}
              priority
              style={{ height: "20px" }}
            />
            <p className="text-[#f18350] font-bold">({discount} Off)</p> */}
          </div>
          )}
{!hideSelling && (dmPage ? (<>
  <div className="flex flex-col gap-5 max-sm:px-4">
            {newDataScience ? (
              <>
                <Link href={checkoutLink}>
                  <button
                    className="w-full px-4 bg-[#f18350] text-white rounded py-3 font-bold text-xl flex justify-center items-center"
                    id={idBtnO}
                  >
                    Buy Now
                  </button>
                </Link>
              </>
            ) : (
              <>
              
                  <button     onClick={() => popupShow()}
                    className="w-full px-4 bg-[#f18350] text-white rounded py-3 font-bold text-xl flex justify-center items-center cursor-pointer transition duration-300 ease-in-out transform hover:bg-[#d76940] hover-animation"
                    id={idBtnO}
                  >
                 Apply For Counselling
                  </button>
     
                <>
                  {dmPage ? (
                    <p className="w-full d-flex justify-center items-center text-center"></p>
                  ) : (
                    <p className="w-full d-flex justify-center items-center text-center">
                      {nomicrosoft ? (
                        <>7-Days Money-Back Guarantee</>
                      ) : (
                        <>15-Days Money-Back Guarantee</>
                      )}
                    </p>
                  )}
                </>
              </>
            )}
          </div>

</>):(<> <div className="flex flex-col gap-5 max-sm:px-4">
            {newDataScience ? (
              <>
                <Link href={checkoutLink}>
                  <button
                    className="w-full px-4 bg-[#f18350] text-white rounded py-3 font-bold text-xl flex justify-center items-center"
                    id={idBtnO}
                  >
                    Buy Now
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href={checkoutLink}>
                  <button
                    className="w-full px-4 bg-[#f18350] text-white rounded py-3 font-bold text-xl flex justify-center items-center cursor-pointer transition duration-300 ease-in-out transform hover:bg-[#d76940] hover-animation"
                    id={idBtnO}
                  >
                    Buy Now
                  </button>
                </Link>
                <>
                  {dmPage ? (
                    <p className="w-full d-flex justify-center items-center text-center"></p>
                  ) : (
                    <p className="w-full d-flex justify-center items-center text-center">
                      {nomicrosoft ? (
                        <>7-Days Money-Back Guarantee</>
                      ) : (
                        <>15-Days Money-Back Guarantee</>
                      )}
                    </p>
                  )}
                </>
              </>
            )}
          </div></>))}

          <div className="flex flex-col gap-2 py-4">
            <h3 className="text-xl font-bold px-5 py-1">Course Content</h3>
            <hr />

          {dmPage ? (<>  <div className="flex flex-col gap-2 px-7 max-[741px]:px-3">
              <p className="flex gap-2 items-center justify-between py-2">
                <span className="flex gap-2 items-center">
                  <MdOutlineVideocam className="text-xl" />
                  Learning Mode
                </span>

                <span>
                 <b>Live</b>
                </span>
              </p>
             
                
                  <hr />
                  <p className="flex gap-2 items-center justify-between py-2">
                    <span className="flex gap-2 items-center">
                      <MdLiveTv className="text-xl" />
                      Tools
                    </span>
                    <span>
                      <b>100+</b>
                    </span>
                  </p>
              
           
          
                  <hr />
                  <p className="flex gap-2 items-center justify-between py-2">
                    <span className="flex gap-2 items-center">
                      <MdLiveTv className="text-xl" />
                      Certificates
                    </span>
                    <span>
                      <b>10+</b>
                    </span>
                  </p>

              
                
              
              <hr />
              <p className="flex gap-2 items-center justify-between py-2">
                <span className="flex gap-2 items-center">
                  <MdLockOpen className="text-xl" />
                  Branded Case-Studies
                </span>
                <span>
                  <b>30+</b>
                </span>
              </p>
              <hr />
              <p className="flex gap-2 items-center justify-between py-2">
                <span className="flex gap-2 items-center">
                  <PiCertificateBold className="text-xl" />
                  1:1 Doubt Session-
                </span>
              <span><b>Daily</b></span>
              </p>

            
              <hr />
              <p className="flex gap-2 items-center justify-between py-2">
                <span className="flex gap-2 items-center">
                  <PiCertificateBold className="text-xl" />
                  Premium Career Support
                </span>
              <span><b>Included</b></span>
              </p>
            </div></>):(<>  <div className="flex flex-col gap-2 px-7 max-[741px]:px-3">
              <p className="flex gap-2 items-center justify-between py-2">
                <span className="flex gap-2 items-center">
                  <MdOutlineVideocam className="text-xl" />
                  Learning Mode
                </span>

                <span>
                  {nomicrosoft ? (
                    <>
                      {" "}
                      <b>Self-paced</b>
                    </>
                  ) : (
                    <b>Blended</b>
                  )}
                </span>
              </p>
              {nomicrosoft ? (
                <></>
              ) : (
                <>
                  <hr />
                  <p className="flex gap-2 items-center justify-between py-2">
                    <span className="flex gap-2 items-center">
                      <MdLiveTv className="text-xl" />
                      1:1 Doubt Session
                    </span>
                    <span>
                      <b>Daily</b>
                    </span>
                  </p>
                </>
              )}{" "}
              {nomicrosoft ? (
                <></>
              ) : (
                <>
                  <hr />
                  <p className="flex gap-2 items-center justify-between py-2">
                    <span className="flex gap-2 items-center">
                      <MdLiveTv className="text-xl" />
                      Live Project Sessions
                    </span>
                    <span>
                      <b>Weekly</b>
                    </span>
                  </p>

                  <hr />
                  <p className="flex gap-2 items-center justify-between py-2">
                    <span className="flex gap-2 items-center">
                      <MdOutlineWorkHistory className="text-xl" />
                      Career Support
                    </span>
                    <span>
                      <b>Included</b>
                    </span>
                  </p>
                </>
              )}
              <hr />
              <p className="flex gap-2 items-center justify-between py-2">
                <span className="flex gap-2 items-center">
                  <MdLockOpen className="text-xl" />
                  Course Access
                </span>
                <span>
                  <b>Lifetime</b>
                </span>
              </p>
              <hr />
              <p className="flex gap-2 items-center justify-between py-2">
                <span className="flex gap-2 items-center">
                  <PiCertificateBold className="text-xl" />
                  Certifications
                </span>
                {nomicrosoft ? (
                  <>
                    {" "}
                    <span>
                      <b>1</b>
                    </span>
                  </>
                ) : (
                  <>
                    {" "}
                    <span>
                      <b>{certification}</b>
                    </span>
                  </>
                )}
              </p>
            </div></>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
