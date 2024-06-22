import React from 'react';
import {useState, useEffect, useRef} from 'react';
import Layout from '../main/Layout';
// root route
import MainBoard from "../dashboard/home/MainBoard";
import PostsBoard from "../dashboard/home/PostsBoard";
import BuddyBoard from "../dashboard/home/BuddyBoard";
import SharingBoard from "../dashboard/home/SharingBoard";
import Cookies from 'js-cookie';

const tabsData = [
  {
    label: "Main",
    content:
      <MainBoard />,
  },
  {
    label: "Buddy",
    content:
      <BuddyBoard />,
  },
  {
    label: "Sharing",
    content:
      <SharingBoard />,
  },
  {
    label: "Posts",
    content:
      <PostsBoard />,
  }
];

function HomeContents() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    const sessionId = Cookies.get('JSESSIONID');
    if (sessionId) {
      console.log("session id found : ", sessionId);
      // navigate('/');
    }
  }, []);
  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      // console.log(currentTab?.offsetLeft, currentTab?.clientWidth);
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }
    setTabPosition();
    window.addEventListener("resize", setTabPosition);
    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div>
      <div className='relative md:static'>
      <div className='h-10 my-2 mt-20 bg-gray-100 abslute absoulte md:mt-0 md:absolute md:z-20 md:top-3 md:right-1/4 md:bg-cyan-400'>
        <div className=''> 
        {/* for top bar */}
        <div className='md:relative md:mt-0 md:top-0'>
            <div className="block md:hidden" >  
            {/* 모바일뷰용 탭슬라이더 */}
                <span className="absolute h-10 transition-all duration-300 bg-opacity-25 bg-cyan-500"
                    style={{ left: tabUnderlineLeft, width: tabUnderlineWidth}}
                />
                <span
                  className="absolute block h-1 mt-10 transition-all duration-300 bg-cyan-500"
                  style={{ left: tabUnderlineLeft, width: tabUnderlineWidth}}
                />
            </div>
            <div className="hidden md:block"> 
                {/* pc뷰용 탭슬라이더 */}
                <span
                  className="absolute block h-1 mt-0 transition-all duration-300 bg-white top-10"
                  style={{ left: tabUnderlineLeft - 10, width: Math.round(tabUnderlineWidth * 1.5)}}
                />
            </div>
        </div>
        <div className="grid w-full grid-flow-col py-2 md:py-0 md:border-b justify-stretch md:flex md:space-x-8">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className={activeTabIndex === idx ? "md:pt-2 md:pb-3 md:text-sm md:text-white font-semibold text-cyan-400 md:bg-cyan-400" : "md:pt-2 md:pb-3 md:text-sm md:text-cyan-600"}
                onClick={() => setActiveTabIndex(idx)}>
                {tab.label}
              </button>
            );
          })}
        </div>
        </div>
      </div>
      </div>
      <div className="py-4">
        <p>{tabsData[activeTabIndex].content}</p>
      </div>
    </div>
  );
}
export default function Home() { // Home Dashboard
    return (
        <Layout Content={
       <>
        <HomeContents />
       </>
    }/>
    );
}