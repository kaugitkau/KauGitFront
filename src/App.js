import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import SharingBoard from './routes/sharing';
import MentoringBoard from './routes/mentoring';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/sharing/*",
    element: <SharingBoard />,
  },
  {
    path: "/mentoring/*",
    element: <MentoringBoard />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
