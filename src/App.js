import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
// import Cookies from 'js-cookie';

function App() {
  // useEffect(() => {
  //   const sessionId = Cookies.get('JSESSIONID');
  //   if (sessionId) {
  //     console.log("session id found : ", sessionId);
  //     // navigate('/');
  //   } else {
  //     Cookies.set('JSESSIONID', )
  //   }
  // }, []);
  return (
    <div className="App" data-theme="light">
      <Outlet />
    </div>
  );
}



export default App;
