import React from "react"
import { NAVER_AUTH_URL } from "../informations/oauth";
import naverImage from '../img/naver_logo.png'
function NaverLogin() {
  const tempStyle = {
    width: "50px",
    height: "50px",
    margin: "10px"
  }
  return (
    <a href={NAVER_AUTH_URL}>
      <img src={naverImage} alt="" style={tempStyle} />
    </a>
    )
}
  
export default NaverLogin;