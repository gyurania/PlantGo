import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import "./RankView.css";
import "./ranktemp.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

  const table = {
    data: [
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "1", name: "김규란", plants: "2000" },
      { rank: "30", name: "김규란", plants: "2000" },
    ],
  };
  const result = [];

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
    return <div>기다려</div>;
  } else {
    const rendering = () => {
      // result.push(
      //   <div className="Rectangle">
      //     축하합니다 1등!!!
      //     {rank.rankList[0].userName} 님 무려 {rank.rankList[0].plantsCollects}
      //     개!!
      //   </div>
      // );
      // result.push(<List>);

      for (let i = 0; i < rank.rankList.length; i++) {
        table.push(i + 1);
        console.log("데이터 들어가는지 확인");
        console.log(table);
        result.push(
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                {i + 1} 등!!
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
              <Typography variant="body2">
                {rank.rankList[i].userName}님이
                <br />
                {rank.rankList[i].plantsCollects}개의 식물을 모으셨습니다!!
              </Typography>
            </CardContent>
          </Card>
        );
      }
      // result.push(</List>);

      return result;
    };
    return (
      <Container fluid className="backgroundImg">
        <div>
          {/* {rendering()} */}
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
                {/* <table> */}
                <div class="ranking-table-header-row">
                  <div class="ranking-table-header-data h6">Rank</div>
                  <div class="ranking-table-header-data h6">Name</div>
                  <div class="ranking-table-header-data h6">Plants</div>
                </div>

                <div class="ranking-table-row-leader-1">
                  <div class="ranking-table-data-leader-1">
                    <div class="medal-gold"></div>
                  </div>
                  <div class="ranking-table-data">{table.data.name}</div>
                  <div class="ranking-table-data">
                    <div class="complete"></div>
                  </div>
                </div>

                <div class="ranking-table-body">
                  {table.data.map((item) => {
                    return (
                      <div class="ranking-table-row">
                        <div class="ranking-table-data">{item.rank}</div>
                        <div class="ranking-table-data">{item.name}</div>
                        <div class="ranking-table-data">{item.plants}</div>
                      </div>
                    );
                  })}
                </div>
                {/* </table> */}
              </div>
            </section>
          </body>
        </div>
      </Container>
    );
  }
};

export default Ranking;
