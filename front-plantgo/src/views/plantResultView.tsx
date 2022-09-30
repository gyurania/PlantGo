import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/TmpBook.scss";
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
              <div className="result-title">몬스테라</div>
            </div>
            <div className="author">by Eunwoo Choi</div>
            <div className="body2">
              <div className="content-top">
                길지 따뜻한 것은 동산에는 보이는 생의 뿐이다. 몸이 낙원을 따뜻한
                봄바람이다. 가는 소리다.이것은 그것은 웅대한 피고 아름다우냐? 뭇
                끓는 그들을 든 이는 노래하며 크고 같이, 천자만홍이 위하여서.
                몸이 그들은 힘차게 것이다. 이성은 더운지라 품에 풀이 것은 피다.
                그들에게 청춘 용기가 부패뿐이다. 오직 그들에게 새 풀이 석가는
                운다. 가지에 없는 꽃 발휘하기 힘차게 사랑의 풀이 피고, 약동하다.
                커다란 가장 몸이 있다.
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
