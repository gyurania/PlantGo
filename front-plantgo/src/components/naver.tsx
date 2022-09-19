import React from "react"
import { NAVER_AUTH_URL } from "../informations/oauth";
import naverImage from '../img/naver_login.png'
function NaverLogin() {
  const tempStyle = {
    width: "200px",
    height: "50px"
  }
  return (
    <a href={NAVER_AUTH_URL}>
      <img src={naverImage} alt="" style={tempStyle} />
    </a>
    )
}
  
export default NaverLogin;