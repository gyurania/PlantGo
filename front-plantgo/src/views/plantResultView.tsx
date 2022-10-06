// import axios from "axios";
// import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TmpBook.scss";
import "./plantResultView.css";
import "./loginView.css";
import logo from "../img/플랜트고-색-폰트.png";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import PhotoCardNavBar from "../components/PhotocardNavBar";

function PlantResultView() {
  const location = useLocation();
  const plantInfo = location.state.plantInfo;
  const plantName = plantInfo.kor_name;
  const content = plantInfo.content;
  const imgSrc = location.state.imgSrc;
  // const plantInfo = "";
  // const plantName = "없음";
  // const content = "plantInfo.content";
  // const imgSrc = "location.state.imgSrc";
  const userName = sessionStorage.getItem("userName");

  let navigate = useNavigate();

  return (
    <div className="container-result" style={{ padding: 0 }}>
      <div className="mobile-layout">
        <div className="notification-header">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "MICEGothic Bold",
              fontSize: "40px",
              color: "#1C6758",
            }}
          >
            PlantSearch Result
          </h1>
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
              <div className="content-top">{content}</div>
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => {
                    navigate("/photocard", { state: plantInfo.plantId });
                  }}
                  style={{ display: "inline-block" }}
                >
                  포토카드 확인하기
                </button>
              </div>
              <div className="result-bottom-nav">
                <img className="result-logo" src={logo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PhotoCardNavBar></PhotoCardNavBar>
    </div>
  );
}

export default PlantResultView;
