import React from "react"
import { KAKAO_AUTH_URL } from "../informations/oauth";
import kakaoImage from '../img/kakao_logo.png'
function KakaoLogin() {
  const tempStyle = {
    width: "50px",
    height: "50px",
    margin: "10px",
  }
  return (
    <a href={KAKAO_AUTH_URL}>
      <img src={kakaoImage} alt="" style={tempStyle}/>
    </a>
    )
}
  
export default KakaoLogin;