import { createBrowserRouter } from "react-router-dom";
  import Home from "./routes/home";
  import ProfileBoard from './routes/profile';
  import SocialBoard from './routes/social';
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
          path: "profile",
          element: <ProfileBoard />,
        },
        {
          path: "social",
          element: <SocialBoard />,
        },
      ]
    }
  ]);
  
  export default router;