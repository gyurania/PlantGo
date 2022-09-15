import React from "react"
import { KAKAO_AUTH_URL } from "../informations/oauth";

function KakaoLogin() {
  
  return (
    <a href={KAKAO_AUTH_URL}>
      <span>카카오계정 로그인</span>
    </a>
    )
}
  
export default KakaoLogin;