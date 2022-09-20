import React from "react";
import GoogleLogin from "../components/google";
import NaverLogin from "../components/naver";
import KakaoLogin from "../components/kakao";

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
