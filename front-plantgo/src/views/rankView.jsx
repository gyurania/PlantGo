import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RankView.css";

const Ranking = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState(null);
  const [rendered, setRendered] = useState(0);
  //   const token = sessionStorage.getItem("loginToken");
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNDM1Nzg1MzAxIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NDE4MzAwOH0.FDgjXXMEDjfRqZLS6RIgHMQpLK0alv0rKrLmju4PGrM";

  useEffect(() => {
    setRendered(1);
  }, []);

  // 백엔드에서 rank data 받아오기
  useEffect(() => {
    if (rendered === 1) {
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
    }
  }, [rendered]);

  useEffect(() => {
    console.log("rank는???");
    console.log(rank);
    console.log(typeof rank);
    if (rank == null) return;
    if (rank.rankList == null) return;
    console.log("rankList느느?????");
    console.log(rank.rankList);
  }, [rank]);

  if (rank === null) {
    return (
      <div>
        <h1>기다려!!</h1>
      </div>
    );
  } else {
    const rendering = () => {
      const result = [];
      result.push(
        <div className="Rectangle">
          축하합니다 1등!!!
          {rank.rankList[0].userName} 님 무려 {rank.rankList[0].plantsCollects}
          개!!
        </div>
      );
      // result.push(<List>);

      for (let i = 0; i < rank.rankList.length; i++) {
        result.push(
          <div className="ranks" key={i}>
            {" "}
            {i + 1}등!! {rank.rankList[i].userName + " / "} 모은 식물의 개수 :{" "}
            {rank.rankList[i].plantsCollects}
          </div>
        );
      }

      // result.push(</List>);
      return result;
    };
    return <div>{rendering()}</div>;
  }
};

export default Ranking;
