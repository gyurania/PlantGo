import React from "react";
import GoogleLogin from "../components/Google";
import NaverLogin from "../components/Naver";
import KakaoLogin from "../components/Kakao";
import bgimg from "../img/plantgo5.jpg";
import logo from "../img/플랜트고-색-폰트.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel';
import "./loginView.css";
function Login() {
  return (
    <Container fluid className="backgroundImg">
      
      <Row style={{height: "10%"}}></Row>
      <Row >
        <Carousel>
          <Carousel.Item>
          <Image src={logo} alt="" className="mx-auto d-block my-5" style={{
            width: 270,
            height: 350,
          }}/>
          </Carousel.Item>
          <Carousel.Item>
            <div className="m-auto my-5 d-flex align-items-center justify-content-center" style={{
                textAlign: "center",
                width: 330,
                height: 350
              }}>
              <p>여러분의 곁에는 <br></br> 어떤 나무와 꽃들이<br></br> 자라고 있나요?</p>

            </div>
          </Carousel.Item>
          <Carousel.Item >
            <div className="m-auto my-5 d-flex align-items-center justify-content-center" style={{
                textAlign: "center",
                width: 330,
                height: 350,
              }}>

                <p>찰칵!<br></br>사진을 찍고 식물도감을<br></br>수집해 보아요!</p>

              </div>
          </Carousel.Item>
        </Carousel>
      </Row>


      <Row>
        <Col></Col>
        <Col style={{
          minWidth: "250px",
          maxWidth: "250px",
          zIndex: 3
        }}>
          <KakaoLogin />
          <GoogleLogin />
          <NaverLogin />
        </Col>
        <Col></Col>
      </Row>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      
    </Container>
  );
}


export default Login;
