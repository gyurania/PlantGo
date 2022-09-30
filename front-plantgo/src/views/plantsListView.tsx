import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AltImg from "../img/plantGO_logo_wot_rbg.png";
import Button from "react-bootstrap/Button";
import CheckMark from "../img/blue_check.png";
import BackgroundImg from "../img/plantgo3.jpg";
import BookIcon from "../img/book_icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { minWidth } from "@mui/system";
import "../CSS/plantListView.css";
import Container from "react-bootstrap/Container";

function PlantList() {
  const navigate = useNavigate();

  const TOTAL_PAGES = 419;

  // useState, useRef, useInview
  const [plantList, setPlantList] = useState<any>([]);
  const [endPage, setEndPage] = useState<boolean>(true);
  const [wholePage, setWholePage] = useState<number>(1);
  const [collectedPage, setCollectedPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastElement1, setLastElement1] = useState<any>(null);
  const [lastElement2, setLastElement2] = useState<any>(null);
  const [collectedPlantList, setCollectedPlantList] = useState<any>([]);
  const [collectedPlantPage, setCollectedPlantPage] = useState<number>(0);
  const [collectedPlantCount, setCollectedPlantCount] = useState<number>(0);
  const [nonCollectedPlantList, setNonCollectedPlantList] = useState<any>([]);
  const [watchMode, setWatchMode] = useState<number>(0);

  // Login key, userSeq

  let loginToken = sessionStorage.getItem("loginToken");
  let userSeq = sessionStorage.getItem("userSeq");

  // 로그인 안되어 있으면 로그인 화면으로 보내기

  if (!loginToken) {
    window.location.replace("/login");
  }

  // 모든 리스트 observer

  const observer1 = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setWholePage((no) => no + 1);
      }
    })
  );

  // 모아놓은 식물 observer
  const observer2 = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setCollectedPage((no) => no + 1);
      }
    })
  );

  // plantlist
  const fetchPlantList = async () => {
    setLoading(true);
    axios({
      method: "post",
      url: spring.plants.list(),
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
      data: {
        page: wholePage,
        userSeq: userSeq,
      },
    })
      .then((res) => {
        let all: any = new Set([...plantList, ...res.data.plantDtoList]);
        setPlantList([...all]);
        setLoading(false);
        console.log(plantList);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 모은 식물
  const fetchCollected = () => {
    setLoading(true);
    axios({
      method: "post",
      url: spring.plants.collected(),
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
      data: {
        page: collectedPage,
        userSeq: userSeq,
      },
    })
      .then(function (res) {
        console.log(res.data);
        let all: any = new Set([
          ...collectedPlantList,
          ...res.data.plantDtoList,
        ]);
        setCollectedPlantList([...all]);
        setCollectedPlantCount(res.data.totalCnt);
        setCollectedPlantPage(res.data.totalPage);
        setLoading(false);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  // // 아직 안 모은 식물
  // const fetchNotCollected = () => {
  //   axios({
  //     method: 'post',
  //     url: spring.plants.noncollected(),
  //     headers: {
  //       'Authorization': `Bearer ${loginToken}`
  //     },
  //     data: {
  //       'page': page,
  //       'userSeq': userSeq
  //     }
  //   })
  //     .then(function (res) {
  //       console.log(res.data)
  //       let all:any = new Set([...nonCollectedPlantList, ...res.data.plantDtoList]);
  //       setNonCollectedPlantList([...all]);
  //     })
  //     .catch(function (err) {
  //       console.error(err)
  //     })
  // };

  useEffect(() => {
    document.body.classList.add("plantlist");
    fetchCollected();
  }, []);
  // 모든 리스트 페이지 불러오기
  useEffect(() => {
    if (wholePage <= TOTAL_PAGES) {
      fetchPlantList();
    }
  }, [wholePage]);

  // 모은 식물 리스트 페이지 불러오기
  useEffect(() => {
    if (collectedPage <= collectedPlantPage) {
      fetchCollected();
    }
  }, [collectedPage]);

  // 모든 리스트 옵저버
  useEffect(() => {
    const currentElement = lastElement1;
    const currentObserver = observer1.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement1]);

  // Collected 옵저버
  useEffect(() => {
    const currentElement = lastElement2;
    const currentObserver = observer2.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement2]);

  let UserCard = (plant: any) => {
    if (plant.data.collected == false) {
      return (
        <Card
          border="danger"
          style={{
            height: 180,
            width: 150,
            padding: 0,
            margin: "0.75em",
            backgroundColor: "#FFFFFF",
            boxShadow: "3px 3px 5px #152967",
            textAlign: "center",
            display: "inline-block",
          }}
          onClick={() => {
            navigate("/photocards", { state: plant.data });
          }}
        >
          <Card.Body>
            <Card.Img
              src={plant.data.imgUrl}
              alt={AltImg}
              style={{
                height: 100,
                width: 100,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
            <Card.Title
              style={{
                fontFamily: "D2Coding",
                fontWeight: "bold",
                padding: ".3em",
                fontSize: "1em",
                lineHeight: "2em",
                margin: 0,
              }}
            >
              {plant.data.korName}
            </Card.Title>
            <Card.Text
              style={{
                fontSize: "1em",
              }}
            >
              수집 미완료
            </Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card
          border="primary"
          style={{
            height: 180,
            width: 150,
            padding: 0,
            margin: "0.5em",
            backgroundColor: "#FFFFFF",
            boxShadow: "3px 3px 5px #152967",
            textAlign: "center",
            display: "inline-block",
          }}
          onClick={() => {
            navigate("/photocards", { state: plant.data });
          }}
        >
          <Card.Body>
            <img
              src={CheckMark}
              style={{
                height: 30,
                width: 30,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <Card.Img
              src={plant.data.imgUrl}
              alt={AltImg}
              style={{
                height: 100,
                width: 100,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
            <Card.Title
              style={{
                fontFamily: "D2Coding",
                fontWeight: "bold",
                padding: ".3em",
                fontSize: "1em",
                lineHeight: "2em",
                margin: 0,
              }}
            >
              {plant.data.korName}
            </Card.Title>
            <Card.Text
              style={{
                fontSize: "1em",
              }}
            >
              수집 완료
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  };

  return (
    <Container fluid className="backgroundImg">
      <br />
      <br />
      <img
        src={BookIcon}
        style={{
          height: 100,
          width: 100,
          textAlign: "center",
          display: "block",
          margin: "auto",
        }}
      ></img>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "MICEGothic Bold",
          fontWeight: "normal",
          fontSize: 30,
          color: "#1C6758",
        }}
      >
        Plants Book
      </h1>

      <h2
        style={{
          textAlign: "center",
          fontFamily: "MICEGothic Bold",
          fontWeight: "normal",
          fontSize: 15,
          color: "#1C6758",
        }}
      >
        총 식물 수 : 4188
      </h2>
      <h2
        style={{
          textAlign: "center",
          fontFamily: "MICEGothic Bold",
          fontWeight: "normal",
          fontSize: 15,
          color: "#1C6758",
        }}
      >
        모은 식물 수 : {collectedPlantCount}
      </h2>
      <div
        style={{ paddingRight: 0, display: "flex", justifyContent: "center" }}
      >
        <Button
          size="sm"
          variant="outline-success"
          style={{ marginRight: 5 }}
          onClick={() => {
            setWatchMode(0);
          }}
        >
          전체 식물 보기
        </Button>
        <Button
          size="sm"
          variant="outline-success"
          onClick={() => {
            setWatchMode(1);
          }}
        >
          내가 모은 식물
        </Button>
      </div>
      {/* <Button onClick={() => {setWatchMode(2)}}>내가 모으지 못한 식물</Button> */}
      {watchMode == 0 && (
        <div>
          <Row xs={2} style={{ marginRight: 0 }}>
            {plantList.length > 0 ? (
              plantList.map((plant: any, i: number) => {
                if (
                  i === plantList.length - 1 &&
                  !loading &&
                  wholePage <= TOTAL_PAGES
                )
                  return (
                    <Col
                      key={`${plant.korName}-${i}`}
                      ref={setLastElement1}
                      style={{
                        paddingRight: 0,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <UserCard data={plant} key={`${plant.korName}-${i}`} />
                    </Col>
                  );
                else
                  return (
                    <Col
                      style={{
                        paddingRight: 0,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <UserCard data={plant} key={`${plant.korName}-${i}`} />
                    </Col>
                  );
              })
            ) : (
              <div></div>
            )}
          </Row>
          {loading && <p className="text-center">loading...</p>}
          {wholePage - 1 === TOTAL_PAGES && (
            <div>
              <br />
              <br />
              <br />
              <p className="text-center my-10">더 이상의 정보가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {watchMode == 1 && (
        <div>
          <Row xs={2} style={{ marginRight: 0 }}>
            {collectedPlantList.length > 0 ? (
              collectedPlantList.map((plant: any, i: number) => {
                if (
                  i === collectedPlantList.length - 1 &&
                  !loading &&
                  collectedPage <= collectedPlantPage
                )
                  return (
                    <Col
                      key={`${plant.korName}-${i}`}
                      ref={setLastElement2}
                      style={{
                        paddingRight: 0,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <UserCard data={plant} key={`${plant.korName}-${i}`} />
                    </Col>
                  );
                else
                  return (
                    <Col
                      style={{
                        paddingRight: 0,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <UserCard data={plant} key={`${plant.korName}-${i}`} />
                    </Col>
                  );
              })
            ) : (
              <div></div>
            )}
          </Row>
          {loading && <p className="text-center">loading...</p>}
          {collectedPage - 1 === collectedPlantPage && (
            <div>
              <br />
              <br />
              <br />
              <p className="text-center my-10">더 이상의 정보가 없습니다.</p>
              <br />
              <br />
              <br />
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default PlantList;
