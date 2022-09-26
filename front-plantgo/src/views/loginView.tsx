import React from "react";
import GoogleLogin from "../components/Google";
import NaverLogin from "../components/Naver";
import KakaoLogin from "../components/Kakao";
import bgimg from "../img/plantgo3.jpg";
import logo from "../img/plantgo-white-font.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import "./loginView.css";
function Login() {
  return (
    <Container fluid style={{
        backgroundImage: `url(${bgimg})`,
        height: "100vh",
        backgroundSize: "cover",
        border: "3px",
        boxSizing: "border-box"
        
      }}>

      <Row style={{height: "15%"}}></Row>
      <Row >
        <Image src={logo} alt="" className="mx-auto d-block my-5" style={{
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
          maxWidth: "250px",
          zIndex: 2
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
