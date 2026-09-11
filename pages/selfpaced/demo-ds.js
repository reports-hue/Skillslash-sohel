import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Image from "next/image";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

const demoDs = () => {
  const [video, setVideo] = useState(false);
  const [vId, setVId] = useState("");
  const videoShow = (id) => {
    setVideo(true);
    setVId(id);
  };
  const array = ["mvAWOD9zpWE", "hsqalsbALu0", "Nfu1HsXz5GQ"];
  const imgSrc = [
    "/cdn/static/New_skillslash/CoursePage/icon/coin.svg",
    "/cdn/static/New_skillslash/CoursePage/icon/dynamic.svg",
    "/cdn/static/New_skillslash/CoursePage/icon/system_design.svg",
  ];
  return (
    <>
      <Head>
        <title>Demo Videos - Skillslash</title>
        <meta
          name="description"
          content="Watch demo videos from Skillslash live classes and projects."
        />
        <meta name="robots" content="noindex,follow" />
      </Head>
      <VideoPopup triggers={video} setTriggers={setVideo} ids={vId} />
      <Navbar />
      <div className="grid grid-cols-[32%,32%,32%] mt-[190px] max-sm:mt-[140px] max-sm:mb-[20px] px-28 gap-3 max-sm:grid-cols-[100%] max-sm:px-5  ">
        {array.map((data, i) => {
          return (
            <div className="flex flex-col shadow gap-8 rounded" key={i}>
              <div className="relative rounded w-full h-[230px] max-sm:h-[210px] cursor-pointer ">
                <Image src={imgSrc[i]} alt="image" fill />
              </div>
              <div className="flex mt-210px gap-6 mx-2 mb-4">
                <button onClick={() => videoShow(data)}>Watch Now</button>
                <a href="https://courses.skillslash.com/learn/DSA---System-Design-Bootcamp">
                  <button>View Course</button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default demoDs;
