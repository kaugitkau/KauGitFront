// Layout.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setTrue, setFalse } from '../redux/authSlice';
import Sidebar from './components/SideNav';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { Outlet } from 'react-router-dom';

function Layout({Content}) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/hanzoomApi/api/login-status');
        console.log(`login Status : ${response.data}`);
        if (response.data === true) {
          dispatch(setTrue());
        } else {
          dispatch(setFalse());
        }
        console.log('isAuthenticated 상태 변경:', response.data);
      } catch (error) {
        console.error('Error checking auth status', error);
        dispatch(setFalse());
      }
    };
    checkAuthStatus();
  }, [dispatch]);

  return (
    <>
      <Header />
        <div className="flex flex-row bg-slate-50">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="w-full overflow-scroll">
                <div className="flex-row w-full-[52] md:w-full px-6 py-2 md:pl-28 md:pt-24 h-screen">
                  {Content}
                </div>
                <BottomNav />
            </div>
        </div>
    </>
  );
}

export default Layout;
