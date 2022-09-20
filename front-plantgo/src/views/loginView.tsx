import React from "react";
import GoogleLogin from "../components/Google";
import NaverLogin from "../components/Naver";
import KakaoLogin from "../components/Kakao";

function Login() {
  return (
    <div>
      <KakaoLogin />
      <br />
      <GoogleLogin />
      <br />
      <NaverLogin />
    </div>
  );
}


export default Login;