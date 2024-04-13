import { createBrowserRouter } from "react-router-dom";
  import Home from "./routes/home";
  import SharingBoard from './routes/sharing';
  import MentoringBoard from './routes/mentoring';
  import App from './App';
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "",
            element: <Home />,
        },
        {
          path: "sharing",
          element: <SharingBoard />,
        },
        {
          path: "mentoring",
          element: <MentoringBoard />,
        },
      ]
    }
  ]);
  
  export default router;