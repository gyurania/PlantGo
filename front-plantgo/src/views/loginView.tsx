import React from "react";
import GoogleLogin from "../components/Google";
import NaverLogin from "../components/Naver";
import KakaoLogin from "../components/Kakao";
import bgimg from "../img/loginBackground.png";
import logo from "../img/plantgo-white-font.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

function Login() {
  return (
    <Container fluid style={{
      backgroundImage: `url(${bgimg})`,
      //width: 360,
      height: 800,
      backgroundSize: "cover"
      }}>

      <Row>
        <Image src={logo} alt="" className="mx-auto d-block mt-5 mb-3" style={{
          width: 270,
          height: 350,
          // marginTop: 50,
          // marginBottom: 30,
        }}/>
      </Row>


      <Row>
        <Col></Col>
        <Col style={{
          minWidth: "250px",
          maxWidth: "250px"
        }}>
          <KakaoLogin />
          <GoogleLogin />
          <NaverLogin />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}


export default Login;
