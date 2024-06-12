import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegCompass } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Sidebar() {
  let navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace this with actual login state

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Handle logout logic here
      setIsLoggedIn(false);
    } else {
      // Navigate to login page
      navigate('/login');
    }
  };

  const menuItems = [
    { name: 'home', label: 'Home', icon: AiFillHome, link: `/` },
    { name: 'social', label: 'Social', icon: FaUserGroup, link: `/social` },
    { name: 'explore', label: 'Explore', icon: FaRegCompass, link: `/explore` },
    { name: 'profile', label: 'Profile', icon: FaUserCircle, link: `/profile` },
  ];

  return (
    <div className="flex-col justify-between">
      <div className="fixed flex flex-col justify-between w-20 h-screen pt-20 bg-white shadow-lg">
        <ul>
          {menuItems.map((item) => (
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
          ))}
        </ul>
        <div className="flex items-center justify-center py-2 mt-4">
          <button
            className="flex flex-col items-center gap-1 mb-10 text-opacity-50 hover:bg-cyan-100 hover:text-cyan-400 hover:bg-opacity-20 text-cyan-800"
            onClick={handleLoginLogout}
          >
            {isLoggedIn ? <AiOutlineLogout className="text-xl" /> : <AiOutlineLogin className="text-xl" />}
            <span className="text-[10px] font-semibold uppercase">
              {isLoggedIn ? 'Logout' : 'Login'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
