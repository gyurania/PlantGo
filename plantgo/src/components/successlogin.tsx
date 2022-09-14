import { type } from "os";
import React from "react";
import { KAKAO_AUTH_URL } from "../informations/oauth";
import { useLocation } from "react-router-dom";

function SuccessLogin() {
  
	const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  return (
    <h1>{KAKAO_CODE}</h1>
  )
}
export default SuccessLogin;