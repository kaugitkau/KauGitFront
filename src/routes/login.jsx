import React, { useState, useEffect } from 'react';
import { FaGoogle } from "react-icons/fa";
import Wave from 'react-wavify';
import ParticlesBg from 'particles-bg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import 'animate.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
// import { useGoogleLogin } from "@react-oauth/google";
// import NaverLogin from 'react-naver-login';


function LoginPage() {
  const navigate = useNavigate();
  
  const handleSocialLogin = async (provider) => {
    console.log("1");
    try {
      console.log("2");
      const response = await axios.get(`hanzoomApi/api/login?provider=${provider}`);
      console.log("3")
      const { loginUrl } = response.data;
      console.log(response.data);
      window.location.href='http://localhost:8080/login/oauth2/code/google';
      const response2 = await axios.post(`hanzoomApi/oauth2/authorization/google`);
      console.log(response2.data);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  // const googleSocialLogin = useGoogleLogin({
  //   scope: "email profile",
  //   onSuccess: async ({ code }) => {
  //     axios
  //       .get("hanzoomApi/oauth2/authorization/google/")
  //       .then(({ data }) => {
  //         console.log(data);
  //       });
  //       window.location.href = `/hanzoomApi/oauth2/authorization/google`;
  //     axios
  //       .post("hanzoomApi/oauth2/authorization/google/", null)
  //       .then(({ data }) => {
  //         console.log(data);
  //       });
  //       navigate('/');
  //   },
  //   onError: (errorResponse) => {
  //     console.error(errorResponse);
  //   },
  //   ux_mode : 'redirect',
  //   redirect_uri : `http://localhost:3000/login`,
  //   login_url : `/oauth2/authorization/google`,
  //   native_login_uri : `/hanzoomApi/oauth2/authorization/google`,
  //   flow : 'implicit',
  // });

  const videos = [
    "https://media.istockphoto.com/id/1061351670/ko/%EB%B9%84%EB%94%94%EC%98%A4/%EB%B9%9B%EC%9D%98-timelapse-%EA%B0%95%EB%82%A8-%EC%84%BC%ED%84%B0-%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%EC%A7%80%EA%B5%AC-%EC%84%9C%EC%9A%B8-%EC%84%9C%EC%9A%B8-%EC%8B%9C-%ED%95%9C%EA%B5%AD%EC%97%90%EB%8A%94-%EA%B5%90%EC%B0%A8%EB%A1%9C-%ED%86%B5%ED%95%B4-%ED%86%B5%ED%96%89-%EC%86%8D%EB%8F%84-%EC%82%B0%EC%B1%85%EB%A1%9C.mp4?s=mp4-640x640-is&k=20&c=jdxA5kf-sGMF5qd1YeWQ8JWxT4bzuwMhutzmNmxsZDI=",
    "https://v2.cdnpk.net/videvo_files/video/premium/partners1003/large_watermarked/BB_86efe1a3-6051-48ed-ab78-d500a83a531d_preview.mp4",
  ];
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const videoSwitchInterval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // Switch video every 10 seconds

    return () => clearInterval(videoSwitchInterval);
  }, [videos.length]);
  useEffect(() => {
    const sessionId = Cookies.get('JSESSIONID');
    if (sessionId) {
      navigate('/');
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        // handleOAuthCallback(code);
      }
    }
  }, [navigate]);

  // const handleOAuthCallback = async (code) => {
  //   try {
  //     const response = await fetch(`/api/oauth2/code/google?code=${code}`, {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  //         'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  //         'Upgrade-Insecure-Requests': '1'
  //       },
  //       credentials: 'include'
  //     });

  //     if (response.ok) {
  //       navigate('/');
  //     } else {
  //       console.error('OAuth callback failed:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error handling OAuth callback:', error);
  //   }
  // };
  
  return (
    <div className="relative flex flex-col justify-center w-screen min-h-screen md:flex-row">
      {/* Mobile Background */}
      <div className="absolute top-0 bottom-0 left-0 right-0 h-screen overflow-y-hidden md:hidden">
        <div className="relative w-full h-screen">
        <div className='absolute w-full h-screen bg-cyan-100'></div>
        <div className='w-full h-1/4'></div>
        <Wave
          fill="#09D0EF"
          paused={false}
          options={{
            amplitude: 50,
            speed: 0.45,
            points: 3
          }}
          className="w-full h-full opacity-80"
        />
        </div>
      </div>
      {/* Desktop Background */}
      <div className="relative hidden w-3/4 md:flex md:flex-col md:items-center md:justify-center bg-cyan-400">
        <div className='absolute z-10 w-full h-screen opacity-90'>
            <ParticlesBg type="circle" bg={true} />
        </div>
        <TransitionGroup>
          <CSSTransition
            key={currentVideoIndex}
            timeout={1000}
            classNames="fadeIn 3s ease-in-out duration-300"
          >
            <video
              key={currentVideoIndex}
              autoPlay
              loop
              muted
              className="absolute inset-0 object-cover w-full h-full opacity-70"
            >
              <source src={videos[currentVideoIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </CSSTransition>
        </TransitionGroup>
        <div className="z-10 p-8 text-center text-white animate__animated animate__fadeInDown">
              <h1 className="mb-4 text-4xl font-bold animate__animated animate__fadeIn animate__delay-1s">Join Our Community</h1>
              <p className="mb-2 text-md animate__animated animate__fadeIn animate__delay-2s">Discover the joys of travel and student life in Korea with our community-focused services.</p>
              <p className="text-md animate__animated animate__fadeIn animate__delay-3s">Connect, explore, and thrive with like-minded individuals on an unforgettable journey.</p>
        </div>
      </div>
      {/* Login Form */}
      <div className="relative z-10 flex flex-col items-center justify-center m-4 mx-24 bg-white rounded-md shadow-md md:w-1/2 md:m-0 md:max-w-md md:min-h-screen">
        <div className="flex flex-col justify-center h-[60vh]">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Login to Your Account</h2>
        <div className="w-full mt-4">
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => handleSocialLogin('google')} 
              className="flex items-center justify-center px-4 py-3 text-white transition-transform transform bg-red-500 rounded-md hover:bg-red-600 hover:scale-[1.01]"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>

            <button onClick={() => handleSocialLogin('naver')} 
              className="flex items-center justify-center px-4 py-3 text-white transition-transform transform bg-green-500 rounded-md hover:bg-green-600 hover:scale-[1.01]"
            >
              Sign in with Naver
            </button>
              {/* <NaverLogin 
              clientId="ud72bzHYNtmwGhKFDjAU"
              callbackUrl="/hanzoomApi/oauth2/authorization/naver"
              render={(props) => <div onClick={props.onClick}>Naver Login</div>}
              onSuccess={(result) => console.log(result)}
              onFailure={(result) => console.error(result)}
            /> */}
          </div>
        </div>
        <p className="mt-4 text-center text-gray-600">Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a></p>
        </div>
        </div>
    </div>
  );
}

export default LoginPage;
