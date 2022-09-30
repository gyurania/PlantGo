import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ranktemp.css";
import Container from "react-bootstrap/Container";
import RankNavBar from "../components/RankNavBar";

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
        url: "/api/v1/users/rank",
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
    console.log("rank!!!");
    console.log(rank);
    console.log(typeof rank);
    if (rank == null) return;
    if (rank.rankList == null) return;
    console.log(rank.rankList);
  }, [rank]);

  if (rank === null) {
    return <div>{/* <h1>기다려!!</h1> */}</div>;
  } else {
    const rendering = () => {
      // const result = [];
      // result.push(
      //   <div className="Rectangle">
      //     축하합니다 1등!!!
      //     {rank.rankList[0].userName} 님 무려 {rank.rankList[0].plantsCollects}
      //     개!!
      //   </div>
      // );
      // result.push(<List>);
      // for (let i = 0; i < rank.rankList.length; i++) {
      //   console.log("데이터 들어가는지 확인");
      //   result.push(
      //     <Card sx={{ minWidth: 275 }}>
      //       <CardContent>
      //         <Typography variant="h5" component="div">
      //           {i + 1} 등!!
      //         </Typography>
      //         <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
      //         <Typography variant="body2">
      //           {rank.rankList[i].userName}님이
      //           <br />
      //           {rank.rankList[i].plantsCollects}개의 식물을 모으셨습니다!!
      //         </Typography>
      //       </CardContent>
      //     </Card>
      //   );
      // }
      // result.push(</List>);
      // return result;
    };

    return (
      <Container fluid className="backgroundImg">
        <div>
          {/* <div>{rendering()}</div> */}
          <body class="page-leaderboard">
            <div class="rank-title">
              <img
                alt="Android Basics Leaderboard"
                class="mb-2"
                src="https://d125fmws0bore1.cloudfront.net/assets/svgs/icon_trophy_leaderboard-3442a4b2312e6cdd02aa9870e636dc082890277a6267c4ed986a750fef7cbb35.svg"
              />
              <br />
              PlantGo! Ranking
            </div>
            <section class="ranking">
              <div class="contain">
                <div class="ranking-table"></div>

                <div class="ranking-table-header-row">
                  <div class="ranking-table-header-data h6">Rank</div>
                  <div class="ranking-table-header-data h6">Name</div>
                  <div class="ranking-table-header-data h6">Plants</div>
                </div>

                <div class="ranking-table-row-leader-1">
                  <div class="ranking-table-data-leader-1">
                    <div class="medal-gold"></div>
                  </div>
                  <div class="ranking-table-data">
                    {rank.rankList[0].userName}
                  </div>
                  <div class="ranking-table-data">
                    {rank.rankList[0].plantsCollects}
                  </div>
                </div>

                <div class="ranking-table-body">
                  {rank.rankList.map((item, idx) => {
                    if (idx === 0) {
                    } else {
                      return (
                        <div class="ranking-table-row">
                          <div class="ranking-table-data">{idx + 1}</div>
                          <div class="ranking-table-data">{item.userName}</div>
                          <div class="ranking-table-data">
                            {item.plantsCollects}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </section>
          </body>
        </div>
        <RankNavBar></RankNavBar>
      </Container>
    );
  }
};

export default Ranking;
