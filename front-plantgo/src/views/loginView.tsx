import React from "react";
import GoogleLogin from "../components/Google";
import NaverLogin from "../components/Naver";
import KakaoLogin from "../components/Kakao";
import bgimg from "../img/loginBackground.png";
import logo from "../img/plantgo-white-font.png";

function Login() {
  return (
    <div style={{
      backgroundImage: `url(${bgimg})`,
      width: 360,
      height: 800
      }}>
      <img src={logo} alt="" style={{
        width: 250,
        height: 350,
      }}/>
      <KakaoLogin />
      <br />
      <GoogleLogin />
      <br />
      <NaverLogin />
    </div>
  );
}


export default Login;
