import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import spring from "../api/spring";
import axios from "axios";

function SuccessLogin() {
  const location = useLocation();
  const CODE = location.search.split("=")[1];
  useEffect(() => {
    sessionStorage.clear();
    sessionStorage.setItem("loginToken", CODE);
  });
  let loginToken = sessionStorage.getItem("loginToken")
  useEffect(() => {
    const getUserSeq = () => {
      axios({
        method: 'get',
        url: spring.user.getUser(),
        headers: {
          'Authorization': `Bearer ${loginToken}`
        }
      })
        .then(function (res) {          
          sessionStorage.setItem("userSeq", res.data.body.user.userSeq);
          window.location.replace("/");
        })
        .catch(function (err) {
          console.error(err)
        })
    }
  })
  return <></>;
}
export default SuccessLogin;
