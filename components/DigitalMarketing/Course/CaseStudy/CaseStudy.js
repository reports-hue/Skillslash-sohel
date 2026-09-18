import { useState } from "react";
import Image from "next/image"; // Import the Image component from next/image
import styles from "./CaseStudy.module.css"; // Import CSS module

const CaseStudy = ({
  changeHeading,
  redirectDs,
  redirectFs,
  redirectDa,
  redirectDM,
  redirectCaseS,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Moz",
      content: [
        "Increase organic traffic to the Moz website, improve search engine rankings for target keywords, and enhance brand authority through strategic backlink acquisition",
      ],
      moduletitle: "Module: ",
      para: ["Search Engine Optimization 1.0 "],
      redirect: { redirectDM: true },
    },
    {
      title: "Titan Watches",
      content: [
        "Optimize Titan Watches' Google Ads campaigns to improve key performance indicators (KPIs) such as click-through rate (CTR), conversion rate, and return on ad spend (ROAS)",
      ],
      moduletitle: "Module: ",
      para: ["Search Engine Marketing 1.0"],
      redirect: { redirectDM: true },
    },
    {
      title: "OnePlus India",
      content: [
        "Develop and implement an effective organic marketing strategy for OnePlus India's social media channels to increase brand visibility, audience engagement, and community interactions",
      ],
      moduletitle: "Module:",
      para: [""],
      redirect: { redirectDM: true },
    },
    {
      title: "More 20+", // Title for the fourth tab
      content: [
        "",
      ],
      moduletitle: "Module: 1",
      para: ["Search Engine Optimization 1.0 "],
      iconsImage: [""],
      redirect: { redirectCaseS: true },
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const currentRedirect = tabs[activeTab].redirect;

  return (
    <div className={styles.CaseStudyhead}>
      <h2>20+ Branded Case Studies</h2>
      <div className={styles.container}>
        <div className={styles.tab}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`${styles.tabButton} ${
                index === activeTab ? styles.active : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              <span>{tab.title}</span>
            </div>
          ))}
        </div>
        <div className={styles.tabContent}>
          {activeTab < 3 ? (
            <div className={styles.pointsul}>
              {tabs[activeTab].content.map((point, index) => (
                <span key={index}>{point}</span>
              ))}
              <div className="d-flex flex-col justify-start align-baseline">
                <h4 className="text-white text-[20px]">
                  {tabs[activeTab].moduletitle}
                </h4>
                {tabs[activeTab].para.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.moreContent}>
              <div className="bg-white py-6 px-4 rounded-lg d-flex flex-col gap-5 m-4">
                <p className="text-[#4f419a] mb-4 font-semibold ">
                  Download all case studies <span className="text-[#F18350]">NOW</span>
                </p>
                <Image
                  src="/cdn/digital-marketing/29-plus-desk.svg"
                  alt="More Icon"
                  width={700}
                  height={200}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
