import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App" data-theme="light">
      <Outlet />
    </div>
  );
}



export default App;
