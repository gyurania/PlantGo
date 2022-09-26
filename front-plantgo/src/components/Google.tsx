import React from "react"
import { GOOGLE_AUTH_URL } from "../informations/oauth";
import googleImage from '../img/google_logo.png'
function GoogleLogin() {
  const tempStyle = {
    width: "60px",
    height: "60px",
    marginLeft: "-5px",
    margin: "10px"
  }
  return (
    <a href={GOOGLE_AUTH_URL}>
      <img src={googleImage} alt="" style={tempStyle}/>
    </a>
    )
}
  
export default GoogleLogin;