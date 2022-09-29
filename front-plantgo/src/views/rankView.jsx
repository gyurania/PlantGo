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
        <script>
          var sum = 1+2+3+4; document.getElementById("name").innerHTML=sum;
        </script>
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
              Plant Go Ranking
            </div>
            <section class="ranking">
              <div class="contain">
                <div class="ranking-table">
                  <div class="ranking-table-header-row">
                    <div class="ranking-table-header-data h6">Rank</div>
                    <div class="ranking-table-header-data h6">Name</div>
                    <div class="ranking-table-header-data h6">Plants</div>
                  </div>
                  <Row>
                    <div class="ranking-table-row-leader-1">
                      <div class="ranking-table-data-leader-1">
                        <div class="medal-gold"></div>
                      </div>
                      <div class="ranking-table-data" id="name"></div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                  </Row>
                  <div class="ranking-table-row-leader-2">
                    <div class="ranking-table-data-leader-2">
                      <div class="medal-silver"></div>
                    </div>
                    <div class="ranking-table-data">Raghav M</div>
                    <div class="ranking-table-data">
                      <div class="complete"></div>
                    </div>
                  </div>
                  <div class="ranking-table-row-leader-3">
                    <div class="ranking-table-data-leader-3">
                      <div class="medal-bronze"></div>
                    </div>
                    <div class="ranking-table-data">Ryan Z</div>
                    <div class="ranking-table-data">
                      <div class="complete"></div>
                    </div>
                  </div>
                  <div class="ranking-table-body">
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">4</div>
                      <div class="ranking-table-data">Joseph R</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">5</div>
                      <div class="ranking-table-data">Muwaffaq I</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">6</div>
                      <div class="ranking-table-data">Joshua L</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">7</div>
                      <div class="ranking-table-data">Nick M</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">8</div>
                      <div class="ranking-table-data">Ravindra R</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">9</div>
                      <div class="ranking-table-data">Ricardo M</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">10</div>
                      <div class="ranking-table-data">Shubham R</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">11</div>
                      <div class="ranking-table-data">Flavio S</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">12</div>
                      <div class="ranking-table-data">Igor S</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">13</div>
                      <div class="ranking-table-data">Mycah H</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">14</div>
                      <div class="ranking-table-data">hemant d</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">15</div>
                      <div class="ranking-table-data">Santhosh S</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">16</div>
                      <div class="ranking-table-data">Joseph D</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">17</div>
                      <div class="ranking-table-data">Kevin C</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">18</div>
                      <div class="ranking-table-data">yasser m</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">19</div>
                      <div class="ranking-table-data">Miguel �ngel M</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">20</div>
                      <div class="ranking-table-data">Peter K</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">21</div>
                      <div class="ranking-table-data">Atikur R</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">22</div>
                      <div class="ranking-table-data">Matthew Y</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">23</div>
                      <div class="ranking-table-data">Anwar S</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">24</div>
                      <div class="ranking-table-data">Jake Y</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">25</div>
                      <div class="ranking-table-data">Lokesh R</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">26</div>
                      <div class="ranking-table-data">Christopher P</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">27</div>
                      <div class="ranking-table-data">Mingxin O</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">28</div>
                      <div class="ranking-table-data">August E</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">29</div>
                      <div class="ranking-table-data">Samsruti D</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                    <div class="ranking-table-row">
                      <div class="ranking-table-data">30</div>
                      <div class="ranking-table-data">Harsh V</div>
                      <div class="ranking-table-data">
                        <div class="complete"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </body>
        </div>
      </Container>
    );
  }
};

export default Ranking;
