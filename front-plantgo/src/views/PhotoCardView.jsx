import PhotoCard from "../components/PhotoCard.jsx";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";
import "./PhotoCardView.scss";
import { keyframes } from "@emotion/react";
import { MdArrowBack } from "react-icons/md";
import PhotocardNavBar from "../components/PhotocardNavBar";

function PhotoCardView() {
  let loginToken = sessionStorage.getItem("loginToken");
  let Navigate = useNavigate();
  const { state } = useLocation();
  const [photocardList, setphotocardList] = useState([]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  console.log(state);
  const fetchPhotocards = async () => {
    console.log("호롤로");
    //setLoading(true)
    axios({
      method: "get",
      url: spring.photocard.register(),
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
      params: {
        plantId: state,
      },
    })
      .then((res) => {
        setphotocardList([...res.data.photocardList]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchPhotocards();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
      className="backgroundImg"
    >
      <Container >
        <Row style={{ height: "15%", display: "block", paddingTop: "15%" }}>
          <h1 style={{ textAlign: "center" , fontFamily:"MICEGothic Bold", fontSize:"50px", color: "white"}}>Photocards</h1>
        </Row>
        <Row>
          <Col>
            <Carousel
              style={{ minWidth: "100%", minHeight: "400px" }}
              activeIndex={index}
              onSelect={handleSelect}
              // variant="dark"
            >
              {photocardList.length > 0 ? (
                photocardList.map((photocard) => {
                  return (
                    <Carousel.Item interval={10000}>
                      <PhotoCard data={photocard}></PhotoCard>
                    </Carousel.Item>
                  );
                })
              ) : (
                <li>포토카드가 없습니다.</li>
              )}
            </Carousel>
          </Col>
        </Row>
        <PhotocardNavBar></PhotocardNavBar>
      </Container>
    </div>
  );
}

export default PhotoCardView;
