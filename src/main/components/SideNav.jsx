// Sidebar.js
import React, { useState } from 'react';
import { FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { LuSettings2 } from "react-icons/lu";
import { FaHome, FaUserFriends, FaDoorOpen } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  // 현재 활성화된 메뉴 항목을 추적합니다.
  let navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');

  const menuItems = [
    { name: 'home', label: 'Home', icon: FaHome, link: `/` },
    { name: 'sharing', label: 'Sharing', icon: FaDoorOpen, link: `/sharing`},
    { name: 'mentoring', label: 'Mentoring', icon: FaUserFriends, link: `/mentoring` },
    { name: 'posting', label: 'Posting', icon: FaClipboardList, link: `/posting`},
    { name: 'community', label: 'Community', icon: IoChatbubbles, link: `/community` },
    // 다른 메뉴 항목들을 여기 추가할 수 있습니다.
  ];

  return (
    <div className="fixed flex flex-col h-screen bg-white w-52">
      <div className="p-4 mt-8 mb-4 text-xl font-black text-center text-slate-800">
        HANZOOM
      </div>
      <ul>
        {menuItems.map((item) => (
          // <Link to={item.link}>
          <li
            key={item.name}
            className={`text-sm font-semibold uppercase mt-4 py-3 pl-5 flex items-center gap-4 hover:bg-blue-100 hover:text-blue-400 ${
              activeMenu === item.name ? 'bg-blue-50 text-blue-500' : 'text-slate-400'
            }`}
            onClick={() => {
              setActiveMenu(item.name);
              navigate(item.link);
            }}
          >
            <item.icon className="ml-4 text-xl" />
            {item.label}
          </li>
          // </Link>
        ))}
      </ul>
      <ul className="p-0 mt-auto mb-12">
      <li className="hover:bg-slate-50 text-slate-400 hover:text-sky-600">
        <button className="flex items-center gap-4 py-3 pl-5 mt-4 text-sm font-semibold uppercase">
          <LuSettings2 className="ml-4 text-xl" />
          Settings
        </button>
        </li>
        <li className="hover:bg-slate-50 text-slate-400 hover:text-sky-600">
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
