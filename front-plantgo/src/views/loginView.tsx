import React from "react";
import GoogleLogin from "../components/google";
import KakaoLogin from "../components/kakao";
import NaverLogin from "../components/naver";

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