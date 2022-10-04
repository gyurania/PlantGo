import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./photoCards.css";
import Container from "react-bootstrap/Container";
import logo from "../img/플랜트고-색-폰트.png";
import photos from "../img/photos.png";
import Row from "react-bootstrap/Row";
import RankNavBar from "../components/RankNavBar";

function PhotoCards() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const Book2 = (imgUrl: any) => {
    console.log(imgUrl);
    return (
      <div className="plantBook">
        <div className="book">
          <div className="imgBox">
            <div className="bark"></div>
            <Container style={{ background: "#013243", height: "100%", width: "100%" }}>
              <img src={logo} style={{
                maxWidth: "250px",
                maxHeight: "375px",
                width: "70vw",
                height: "45vh",
                margin: "10% 0 0 5%"
              }} />
            </Container>

          </div>
          <div className="details" style={{overflow: 'auto'}}>
            <h4 className="color1">{state.korName}</h4>
            <br></br>
            {state.familyKor? <p>과명 : {state.familyKor}</p> : <></>}
            {state.genusKor?<p>속명 : {state.genusKor}</p> :<></>}
            {state.schName ? <p>학술명 : {state.schName}</p> : <></>}
            {state.origin.replace(" ","")?<p>원산지: {state.origin}</p>:<></>}
            {state.dstrb.replace(" ", "") ? <p>국내 분포 : {state.dstrb}</p> : <></>}
            {state.foreDstrb.replace(" ", "") ? <p>해외 분포 : {state.foreDstrb}</p> : <></>}
            {state.grwEnvDesc.replace(" ","")?<p>생육환경 {state.grwEnvDesc}</p>:<></>}
            {state.flwrDesc.replace(" ","")?<p>꽃 설명 : {state.flwrDesc}</p>:<></>}
            {state.leafDesc.replace(" ","")?<p>잎 설명 : {state.leafDesc}</p>:<></>}
            {state.branchDesc.replace(" ","")?<p>줄기 설명 : {state.branchDesc}</p>:<></>}
            {state.fruitDesc.replace(" ","")?<p>열매 설명 : {state.leafDesc}</p>:<></>}
            {state.rootDesc.replace(" ","")?<p>뿌리 설명 : {state.rootDesc}</p>:<></>}
            {state.brdMthd.replace(" ", "") ? <p>번식방법 {state.brdMthd}</p> : <></>}
            {state.farmDesc.replace(" ", "") ? <p>재배특성 : {state.farmDesc}</p> : <></>}
            {state.useMthd.replace(" ", "") ? <p>사용법 {state.useMthd}</p> : <></>}
            {state.prtcDesc.replace(" ","")?<p>보호방안 :   {state.prtcDesc}</p>:<></>}
          </div>
          <Container style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "15%",
            justifyContent:"center"
          }} className="photos" onClick={() => { navigate("/photocard", { state: state.plantId }) }}>
            <h4>PhotoCards →</h4>
            <img src={photos}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                width: "70%",
                height: "40%",
                marginLeft: "15%"
              }}
              className="photos"
              onClick={() => {
                navigate("/photocard", { state: state.plantId });
              }}
            ></img>
            </Container>
        </div>
        <RankNavBar></RankNavBar>
      </div>
    );
  };

  if (state.imgUrl) {
    return <Book2 data={state.imgUrl}></Book2>;
  } else {
    return <Book2 data={logo}></Book2>;
  }
}

export default PhotoCards;
