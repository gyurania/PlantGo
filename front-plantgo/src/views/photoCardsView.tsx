import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./photoCards.css";
import Container from "react-bootstrap/Container";
import logo from "../img/플랜트고-색-폰트.png";
import photos from "../img/photos.png";
import Row from "react-bootstrap/Row";

function PhotoCards() {
  const { state } = useLocation()
  const navigate = useNavigate();
  console.log(state);

  const Book = (imgUrl: any) => {
    console.log(imgUrl);
    return (
      <div className="plantBook">
        <div className="book">
          <div className="imgBox">
            <div className="bark"></div>
            <Container
              style={{ background: "#ADDDD0", height: "100%", width: "100%" }}
            >
              <img
                src={imgUrl.data}
                style={{
                  width: "100%",
                  marginTop: 10,
                }}
              />

              <div style={{ height: "20%", width: "100%" }}></div>
              <h2
                style={{ textAlign: "center", fontFamily: "MICEGothic Bold" }}
                className="mx-auto"
              >
                {state.korName}
              </h2>
            </Container>
          </div>
          <div className="details">
            <h4 className="color1">You're not a Fossil! (YET)</h4>
            <h4 className="color2 margin">(HAPPY BIRTHDAY)</h4>
            <p>Dear Dad,</p>
            <p>Let's see.. .</p>
            <p>You’re never around, you</p>
            <p>hate the music I’m into, you</p>
            <p>practically despise the movies I</p>
            <p>like, and yet somehow you still</p>
            <p>manage to be the best dad every year.</p>
            <p>How do you do that? :)</p>
            <p className="text-right">Happy Birthday, papa!</p>
            <p className="text-right">♥Sarah</p>
          </div>
        </div>
      </div>
    );
  };

  const Book2 = (imgUrl: any) => {
    console.log(imgUrl);
    return (
      <div className="plantBook">
        <div className="book">
          <div className="imgBox">
            <div className="bark"></div>
            <Container style={{ background: "#013243", height: "100%", width: "100%" }}>
              <img src={imgUrl.data} style={{
                width: "90%",
                margin: "20px 0 0 15px"
              }} />
            </Container>

          </div>
          <div className="details">
            <h4 className="color1">{state.korName}</h4>
            <br></br>
            <p>학술명 : </p>
            <p>{state.schName}</p>
            <p>국내 분포 : {state.dstrb}</p>
            <p>꽃 설명 : {state.flwrDesc}</p>
            <p>번식방법 {state.brdMthd}</p>
          </div>
          <Container style={{
            marginTop: 50,
            marginLeft: 30
          }} className="photos" onClick={() => { navigate("/photocard", { state: state.plantId }) }}>
            <h4>포토카드 보러가기 →</h4>
            <img src={photos}
              style={{
                width: "200px",
                height: "200px"
              }}

            ></img>
          </Container>
        </div>
      </div>
    )}

  if (!state.imgUrl) {
    return <Book data={state.imgUrl}></Book>;
  } else {
    return <Book2 data={logo}></Book2>;
  }

  return (
    <div className="plantBook">
      <div className="book">
        <div className="imgBox">
          <div className="bark"></div>
          <img src="https://image.ibb.co/fYzTrb/lastofus.jpg" />
        </div>
        <div className="details">
          <h4 className="color1">You're not a Fossil! (YET)</h4>
          <h4 className="color2 margin">(HAPPY BIRTHDAY)</h4>
          <p>Dear Dad,</p>
          <p>Let's see.. .</p>
          <p>You’re never around, you</p>
          <p>hate the music I’m into, you</p>
          <p>practically despise the movies I</p>
          <p>like, and yet somehow you still</p>
          <p>manage to be the best dad every year.</p>
          <p>How do you do that? :)</p>
          <p className="text-right">Happy Birthday, papa!</p>
          <p className="text-right">♥Sarah</p>
        </div>
      </div>
    </div>
  );
}

export default PhotoCards;
