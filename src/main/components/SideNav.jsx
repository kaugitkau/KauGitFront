// components/SideNav.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegCompass } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../../redux/authSlice';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [activeMenu, setActiveMenu] = useState('home');

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      try {
        await axios.get('/hanzoomApi/api/logout');
        dispatch(logout());
        alert('You have been logged out.');
      } catch (error) {
        console.error('Error during logout', error);
        alert('Error during logout. Please try again.');
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    console.log('[sideNav]의 isLoggedIn 상태 : ', isLoggedIn);
  }, [isLoggedIn]);

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
