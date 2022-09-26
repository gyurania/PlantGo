import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Ranking = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState(null);
  //   const token = sessionStorage.getItem("loginToken");
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNDM1Nzg1MzAxIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NDE3MTg3MX0.QZeXeVlkLufoZBM7yt3ugt_OdOrtv6HsmJkige9yzyw";
  // 백엔드에서 rank data 받아오기
  useEffect(() => {
    axios({
      method: "get",
      url: "https://j7a703.p.ssafy.io:8080/v1/users/rank",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "aaplication/json",
      },
    })
      .then((res) => {
        setRank(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <h2>{JSON.stringify(rank)}</h2>
    </div>
  );
};

export default Ranking;
