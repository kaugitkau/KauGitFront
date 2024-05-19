import React, { useState } from 'react';
import { AiFillHome } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import {FaUserCircle, FaRegCompass} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export default function BottomTab() {
  let navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');

  const menuItems = [
    { name: 'home', label: 'Home', icon: AiFillHome, link: `/` },
    { name: 'social', label: 'social', icon: FaUserGroup, link: `/social`},
    { name: 'explore', label: 'explore', icon: FaRegCompass, link: `/explore` },
    { name: 'profile', label: 'profile', icon: FaUserCircle, link: `/profile`},
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 flex justify-around px-20 py-3 bg-white shadow-lg md:hidden">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`flex flex-col items-center w-full justify-center ${activeMenu === item.name ? 'text-cyan-500' : 'text-cyan-800 text-opacity-35'}`}
          onClick={() => {
            setActiveMenu(item.name);
            navigate(item.link);
          }}
        >
          {item.icon({ className: "text-2xl" })}
          <span className="mt-1 text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
