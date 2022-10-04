import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import spring from "../api/spring";
import axios from "axios";

function SuccessLogin() {
  const location = useLocation();
  const CODE = location.search.split("=")[1];
  const getUserSeq = () => {
    axios({
      method: 'get',
      url: spring.user.getUser(),
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('loginToken')}`
      }
    })
      .then(function (res) {          
        sessionStorage.setItem("userSeq", res.data.body.user.userSeq);
        sessionStorage.setItem("userName", res.data.body.user.username);
        window.location.replace('/')
      })
      .catch(function (err) {
        console.error(err)
      })
  }
  useEffect(() => {
    sessionStorage.clear();
    sessionStorage.setItem("loginToken", CODE);
    getUserSeq()
  }, []);
  return <></>;
}
export default SuccessLogin;