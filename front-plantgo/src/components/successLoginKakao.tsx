import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";


function SuccessLogin() {
  
	const location = useLocation();
  const CODE = location.search.split('=')[1];
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("token", CODE);
    window.location.replace("/");
  });
  return (
    <></>
  )
}
export default SuccessLogin;