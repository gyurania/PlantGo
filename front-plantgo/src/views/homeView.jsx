import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeView.css";

import NaverMap from "../components/NaverMap";

function HomeView({}) {
  // if (!sessionStorage.getItem("loginToken")) {
  //   window.location.replace("/login");
  // }

  const navigate = useNavigate();

  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [isRenewed, setIsRenewed] = useState(0);

  // 1. 랜더링 되면 isRenewed값 갱신
  useEffect(() => {
    setIsRenewed(1);
  }, []);

  // 2. 현재 위치 가져오기, 랜더링 될 떄 한번만
  useEffect(() => {
    if (isRenewed) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          console.log(pos);
        });
      } else {
        window.alert("현재위치를 확인할 수 없습니다ㅠㅠ");
      }
    }
  }, [isRenewed]);

  // // 3. 2번에서 위치 받아오면 현재 위치
  // useEffect(() => {
  //   if (isRenewed) {
  //     axios({
  //       method: "get",
  //       url: "http://j7a703.p.ssafy.io:8080/api/map1",
  //       data: {
  //         lat: position.lat,
  //         lng: position.lng,
  //       },
  //     })
  //       .then((res) => {
  //         setNearPlants(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [position]);

  // const function = getIsRenewed(isRenewed:Boolean) => {
  //   setIsRenewed((isRenewed + 1) % 2)
  // }

  const goCamera = () => {
    navigate("/camera");
  };

  return (
    <div>
      <div className="over-map">
        <img src="./plantGO_logo_wot_rbg.jpg" alt="logo" />
        <p className="plus-icon">Plus Button</p>
        <p className="plus-icon">Renew Button</p>
        <p className="camera-icon" onClick={goCamera}>
          Camera Icon
        </p>
      </div>
      <NaverMap lat={position.lat} lng={position.lng} />
    </div>
  );
}

export default HomeView;
