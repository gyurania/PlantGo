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
    <div className="container">
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
              <div className="result-title">무언가 식물의 이름</div>
            </div>
            <div className="author">by {userName}</div>
            <div className="body2">
              <div className="content-top">
                어떻게 식물 설명을 써야할 지 매우 고민이었는데 이렇게나마 쓰게 되니 너무 반갑고 하드코딩을 하려니 회의감이 들고 내가 이러려고 개발자하나 고민되고 많은 노력 끝에 사람들이 성과를 쟁취했듯 나도 그렇게 할 수 있을까 고민되고 그럽니다.
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
