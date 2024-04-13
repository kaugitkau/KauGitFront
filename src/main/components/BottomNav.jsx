import React, { useState } from 'react';
import { FaHome, FaBell, FaChartBar } from 'react-icons/fa';

function BottomNav() {
  // 현재 선택된 탭의 상태
  const [activeTab, setActiveTab] = useState('home');
  // 탭을 클릭할 때 호출되는 함수
  const selectTab = (tab) => {
    setActiveTab(tab);
    // 여기서 페이지 전환 로직을 처리할 수 있습니다.
  };

  return (
    <>
    <div className="flex h-36 mt-60 md:hidden"></div>
    <div className="fixed inset-x-0 bottom-0 flex justify-around px-3 py-2 bg-white shadow-lg md:hidden">
      <div
        className={`flex flex-col items-center w-full justify-center ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'}`}
        onClick={() => selectTab('home')}
      >
        <FaHome className="text-2xl" />
        <span className="mt-1 text-xs">Home</span>
      </div>
      <div
        className={`flex flex-col items-center w-full justify-center ${activeTab === 'alerts' ? 'text-blue-500' : 'text-gray-500'}`}
        onClick={() => selectTab('alerts')}
      >
        <FaBell className="text-2xl" />
        <span className="mt-1 text-xs">Alerts</span>
      </div>
      <div
        className={`flex flex-col items-center w-full justify-center ${activeTab === 'stats' ? 'text-blue-500' : 'text-gray-500'}`}
        onClick={() => selectTab('stats')}
      >
        <FaChartBar className="text-2xl" />
        <span className="mt-1 text-xs">Stats</span>
      </div>
    </div>
    </>
  );
}

export default BottomNav;
