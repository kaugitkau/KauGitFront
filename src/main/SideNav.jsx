// Sidebar.js
import React, { useState } from 'react';
import { FaTachometerAlt, FaUserInjured, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { LuSettings2 } from "react-icons/lu";

function Sidebar() {
  // 현재 활성화된 메뉴 항목을 추적합니다.
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { name: 'home', label: 'Home', icon: FaTachometerAlt },
    { name: 'dashboard', label: 'Sharing', icon: FaTachometerAlt },
    { name: 'patients', label: 'Mentoring', icon: FaUserInjured },
    { name: 'appointments', label: 'Posting', icon: FaClipboardList },
    { name: 'community', label: 'Community', icon: FaClipboardList },
    // 다른 메뉴 항목들을 여기 추가할 수 있습니다.
  ];

  return (
    <div className="fixed flex flex-col h-screen bg-white w-52">
      <div className="p-4 mt-8 mb-4 text-xl font-black text-slate-800">
        HANZOOM
      </div>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`text-sm font-semibold uppercase mt-4 py-3 pl-5 flex items-center gap-4 text-slate-450 hover:bg-blue-100 hover:text-blue-400 ${
              activeMenu === item.name ? 'bg-blue-50 text-blue-500' : ''
            }`}
            onClick={() => setActiveMenu(item.name)}
          >
            <item.icon className="ml-4 text-xl" />
            {item.label}
          </li>
        ))}
      </ul>
      <ul className="p-0 mt-auto mb-12">
      <li className="hover:bg-slate-50 text-slate-450 hover:text-sky-600">
        <button className="flex items-center gap-4 py-3 pl-5 mt-4 text-sm font-semibold uppercase">
          <LuSettings2 className="ml-4 text-xl" />
          Settings
        </button>
        </li>
        <li className="hover:bg-slate-50 text-slate-450 hover:text-sky-600">
        <button className="flex items-center gap-4 py-3 pl-5 mt-4 text-sm font-semibold uppercase ">
          <FaSignOutAlt className="ml-4 mr-1 text-xl" />
          Logout
        </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
