import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
// import Cookies from 'js-cookie';
// import { GoogleOAuthProvider } from '@react-oauth/google';

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
  // const clientId = '8462816831-3lop9fop0m4utavosv1jns6t6g66qnt9.apps.googleusercontent.com';
  return (
    // <GoogleOAuthProvider clientId={clientId}>
    <div className="App" data-theme="light">
      <Outlet />
    </div>
    // </GoogleOAuthProvider>
  );
}



export default App;
