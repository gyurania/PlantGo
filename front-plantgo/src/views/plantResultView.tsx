// import axios from "axios";
// import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TmpBook.scss";
import logo from "../img/플랜트고-색-폰트.png";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";

function PlantResultView() {
  const location = useLocation();
  const plantInfo = location.state.plantInfo;
  const plantName = plantInfo.kor_name
  const content = plantInfo.content
  const imgSrc = location.state.imgSrc;
  const userName = sessionStorage.getItem('userName')
  let navigate = useNavigate();

  // location.state.plantInfo -> name, studyName,
  // const navigate = useNavigate();

  // const [info, setInfo] = useState<Object>({});
  // const [removebgImg, setRemovebgImg] = useState<string>("");

  // const token = sessionStorage.getItem("loginToken");
  useEffect(() => {
    console.log(plantInfo)
  })
  return (
    <div className="container" style={{padding:0}}>
      <div className="mobile-layout">
        <div className="notification-header">
          <div className="time">plantGo!</div>
        </div>
        <div className="actions"></div>
        <div className="book-cover">
          <div className="book-top-cover"></div>
          <img className="book-top" src={imgSrc} alt="book-top" />
          <img
            className="book-side"
            src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
            alt="book-side"
          />
        </div>
        <div className="preface">
          <div className="content">
            <div className="header">
              <div className="result-title">{plantName}</div>
            </div>
            <div className="author">by {userName}</div>
            <div className="body2">
              <div className="content-top">
                {content}
              </div>
              <button className="btn btn-sm btn-outline-success"
              onClick={() => {
                navigate("/photocard", { state: plantInfo.plantId });
              }}
              style={{position:"relative", bottom:0, left:"25%"}}>포토카드 확인하기</button>
              <div className="result-bottom-nav">
                <img className="result-logo" src={logo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantResultView;
