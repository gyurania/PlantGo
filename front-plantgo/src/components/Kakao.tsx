import React from "react"
import { KAKAO_AUTH_URL } from "../informations/oauth";
import kakaoImage from '../img/kakao_login_medium_narrow.png'
function KakaoLogin() {
  const tempStyle = {
    width: "200px",
    height: "50px"
  }
  return (
    <a href={KAKAO_AUTH_URL}>
      <img src={kakaoImage} alt="" style={tempStyle}/>
    </a>
    )
}
  
export default KakaoLogin;