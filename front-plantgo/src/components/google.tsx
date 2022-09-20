import React from "react"
import { GOOGLE_AUTH_URL } from "../informations/oauth";
import googleImage from '../img/btn_google_signin_light_normal_web.png'
function GoogleLogin() {
  const tempStyle = {
    width: "200px",
    height: "50px"
  }
  return (
    <a href={GOOGLE_AUTH_URL}>
      <img src={googleImage} alt="" style={tempStyle}/>
    </a>
    )
}
  
export default GoogleLogin;