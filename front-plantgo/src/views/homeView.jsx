import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeView.css";
import HomeNavBar from "../components/HomeNavBar";

import NaverMap from "../components/NaverMap";
import KakaoMap from "../components/KakaoMap";
import DownNavBar from "../components/downNavBar";

function HomeView({}) {
  if (!sessionStorage.getItem("loginToken")) {
    window.location.replace("/login");
  }

  const navigate = useNavigate();

  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [isRenewed, setIsRenewed] = useState(0);

  // 1. 랜더링 되면 isRenewed값 갱신
  useEffect(() => {
    setIsRenewed(1);
  }, []);

  const goCamera = () => {
    navigate("/camera");
  };

  return (
    <div>
      <div>
        {/* <NaverMap lat={position.lat} lng={position.lng} /> */}
        <KakaoMap lat={position.lat} lng={position.lng} />
      </div>
      <div>
        <HomeNavBar></HomeNavBar>
      </div>
      {/* <div className="over-map">
        <img src="./plantGO_logo_wot_rbg.jpg" alt="logo" />
        <p className="plus-icon">Plus Button</p>
        <p className="plus-icon">Renew Button</p>
        <p className="camera-icon" onClick={goCamera}>
          Camera Icon
        </p>
      </div> */}
    </div>
  );
}

export default HomeView;
