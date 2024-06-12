import { createBrowserRouter } from "react-router-dom";
  import Home from "./routes/home";
  import ProfileBoard from './routes/profile';
  import SocialBoard from './routes/social';
  import Details from './routes/details';
  import Explore from './routes/explore';
  import Write from './routes/write';
  import LoginPage from './routes/login';
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
        {
          path: "details/:postId",
          element: <Details />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "write",
          element: <Write />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
      ]
    }
  ]);
  
  export default router;