import React from "react"
import { KAKAO_AUTH_URL } from "../informations/oauth";
import kakaoimage from '../img/kakao_login_small.png'
function KakaoLogin() {
  
  return (
    <a href={KAKAO_AUTH_URL}>
      <img src={kakaoimage} alt="" />
    </a>
    )
}
  
export default KakaoLogin;