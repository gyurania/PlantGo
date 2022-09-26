import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Ranking = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState(null);
  //   const token = sessionStorage.getItem("loginToken");
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNDM1Nzg1MzAxIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NDE4MzAwOH0.FDgjXXMEDjfRqZLS6RIgHMQpLK0alv0rKrLmju4PGrM";
  // 백엔드에서 rank data 받아오기
  useEffect(() => {
    axios({
      method: "get",
      url: "https://j7a703.p.ssafy.io/api/v1/users/rank",
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
  }, []);

  useEffect(() => {
    console.log("rank는???");
    console.log(rank);
  }, [rank]);

  return (
    <div>
      <div>{JSON.stringify(rank)}</div>
    </div>
  );
};

export default Ranking;
