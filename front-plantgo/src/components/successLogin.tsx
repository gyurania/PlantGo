import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { setCookie } from "./cookie";


function SuccessLogin() {
  
	const location = useLocation();
  const CODE = location.search.split('=')[1];
  useEffect(() => {
    setCookie('loginToken', CODE);
    window.location.replace("/");
  });
  return (
    <></>
  )
}
export default SuccessLogin;