import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TmpBook.scss";
import logo from "../img/플랜트고-색-폰트.png";

function PlantResultView() {
  const location = useLocation();

  const imgSrc = location.state.imgSrc;

  // location.state.plantInfo -> name, studyName,
  const navigate = useNavigate();

  const [info, setInfo] = useState<Object>({});
  const [removebgImg, setRemovebgImg] = useState<string>("");

  const token = sessionStorage.getItem("loginToken");

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
              <div className="result-title">코스모스</div>
            </div>
            <div className="author">by Eunwoo Choi</div>
            <div className="body2">
              <div className="content-top">
                코스모스(Cosmos bipinnatus)는 한국 고유어로 살사리꽃이라 불린다.
                가을을 상징하는 꽃이며 곧게 선 줄기에 털이 없는 가지가 많이
                갈라져 있다. 꽃의 색깔은 연분홍색, 흰색, 붉은색 등 매우
                다양하다. 현대에서 속명인 코스모스는 '우주'를 뜻한다.
              </div>
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
