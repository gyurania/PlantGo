import axios from "axios";
import React, { useEffect, useState } from "react";
import "./HomeView.css";

import NaverMap from "../components/NaverMap";

function HomeView() {
  // if (!sessionStorage.getItem('loginToken')) {
  //   window.location.replace("/login")
  // }

  const [latitude, setLatitude] = useState(37.5656);
  const [longitude, setLongitude] = useState(126.9769);
  const [nearPlants, setNearPlants] = useState([]); // {lat, lng, plantNm, plantImg}
  const [isRenewed, setIsRenewed] = useState(Boolean);

  // 1. 현재 위치 가져오기
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(position);
    });
  } else {
    window.alert("현재위치를 확인할 수 없습니다ㅠㅠ");
  }

  // 2. 현재 위치 주변 식물 정보 받기 비동기처리
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/map",
      data: {
        lat: latitude,
        lng: longitude,
      },
    })
      .then((res) => {
        setNearPlants(res.data);
      })
      .catch((err) => console.log(err));
  }, [latitude, longitude]);

  // const function = getIsRenewed(isRenewed:Boolean) => {
  //   setIsRenewed((isRenewed + 1) % 2)
  // }

  return (
    <div>
      <div className="over-map">
        <h2 className="title">Plant Go!</h2>
        <p className="plus-icon">Plus Button</p>
        <p className="plus-icon">
          Renew Button
        </p>
      </div>
      <NaverMap
        lat={latitude}
        lng={longitude}
        nearPlants={nearPlants}
        renew={isRenewed}
      />
    </div>
  );
}

export default HomeView;
