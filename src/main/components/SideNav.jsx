// Sidebar.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegCompass } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Sidebar() {
  // 현재 활성화된 메뉴 항목을 추적합니다.
  let navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');

  const menuItems = [
    { name: 'home', label: 'Home', icon: AiFillHome, link: `/` },
    { name: 'social', label: 'social', icon: FaUserGroup, link: `/social`},
    { name: 'explore', label: 'explore', icon: FaRegCompass, link: `/explore` },
    { name: 'profile', label: 'profile', icon: FaUserCircle, link: `/profile`},
    // 다른 메뉴 항목들을 여기 추가할 수 있습니다.
  ];

  return (
    <div className="fixed flex flex-col w-20 h-screen pt-20 bg-white shadow-lg">
      <ul>
        {menuItems.map((item) => (
          // <Link to={item.link}>
          <li
            key={item.name}
            className={`flex-col text-[10px] font-semibold uppercase mt-4 py-2 flex items-center gap-1 hover:bg-cyan-100 hover:text-cyan-400 hover:bg-opacity-20 ${
              activeMenu === item.name ? 'bg-cyan-50 text-cyan-500' : 'text-cyan-800 text-opacity-35'
            }`}
            onClick={() => {
              setActiveMenu(item.name);
              navigate(item.link);
            }}
          >
            <item.icon className="text-xl" />
            {item.label}
          </li>
          // </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
