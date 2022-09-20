import React from "react";
import GoogleLogin from "../components/Google";
import KakaoLogin from "../components/Kakao";
import NaverLogin from "../components/Naver";

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