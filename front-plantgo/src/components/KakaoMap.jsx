/* global kakao */

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "../customHook/useInterval";
import plantsMarkerImage from "../img/plant_marker_image.png";
import HomeNavBar from "./HomeNavBar";
import "./KakaoMap.css";
import "./KakaoMap.scss";

function KakaoMap() {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [currMarkers, setCurrMarkers] = useState([]);
  const [plantMarkers, setPlantMarkers] = useState([]);
  const [plantOverlays, setPlantOverlays] = useState([]);
  const [plantClusterer, setPlantClusterer] = useState(null);

  const [ewMarkers, setEwMarkers] = useState([]);
  const [ewOverlays, setEwOverlays] = useState([]);
  const [ewClusterer, setEwClusterer] = useState();

  const container = useRef();

  const token = sessionStorage.getItem("loginToken");

  const tmpMarkers = [
    { name: "더미식물1", lat: 37.6857293, lng: 126.7786386 },
    { name: "더미식물2", lat: 37.6980726, lng: 126.7664948 },
    { name: "더미식물3", lat: 37.6887371, lng: 126.7846376 },
    { name: "더미식물4", lat: 37.693819, lng: 126.780976 },
    { name: "더미식물5", lat: 37.6810649, lng: 126.7660589 },
    { name: "더미식물6", lat: 37.6969239, lng: 126.7704684 },
    { name: "더미식물7", lat: 37.6928105, lng: 126.7821193 },
    { name: "더미식물8", lat: 37.6915444, lng: 126.7651047 },
  ];

  const location = new kakao.maps.LatLng(position.lat, position.lng);
  const options = {
    center: location,
    level: 4,
  };

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    var tmpMarker = new kakao.maps.Marker({
      map: map,
      title: "myLocation",
      position: location,
    });
    setCurrMarkers(tmpMarker);
    setKakaoMap(map);
  }, [container]);

  useInterval(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const tmpLat = pos.coords.latitude;
      const tmpLng = pos.coords.longitude;
      if (
        ((position.lat - tmpLat) ** 2 + (position.lng - tmpLng) ** 2) ** 0.5 >
        0.0002
      ) {
        setPosition({ lat: tmpLat, lng: tmpLng });
        const tmpLoc = new kakao.maps.LatLng(tmpLat, tmpLng);
        kakaoMap.setCenter(tmpLoc); // 현재 위치로 지도 중앙 이동

        currMarkers.setMap(null);

        const tmpMarker = new kakao.maps.Marker({
          map: kakaoMap,
          title: "myLocation",
          position: tmpLoc,
        });
        setCurrMarkers(tmpMarker);
      }
    });
  }, 1000);

  useInterval(() => {
    var imageSrc = plantsMarkerImage;
    var imageSize = new kakao.maps.Size(42, 42);
    var imageOption = { offset: new kakao.maps.Point(27, 69) };
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    console.log(ewMarkers);
    for (var i = 0; i < ewMarkers.length; i++) {
      ewMarkers[i].setMap(null);
    }

    console.log("지웠다");
    console.log(ewMarkers);

    for (var i = 0; i < ewOverlays.length; i++) {
      ewOverlays[i].setMap(null);
    }

    var eunwooOverlays = [];
    var eunwooMarkers = [];

    tmpMarkers.forEach(function (tmpMarker) {
      // 1. 마커 생성
      const location = new kakao.maps.LatLng(tmpMarker.lat, tmpMarker.lng);

      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: location,
        image: markerImage,
        clickable: true,
      });
      eunwooMarkers.push(marker);

      // 2. 오버레이 생성
      // 2.1. 오버레이 content 생성
      var content = document.createElement("button");
      content.type = "button";
      content.className = "btn btn-success";
      content.appendChild(document.createTextNode(tmpMarker.name));

      // 2.2. 닫기 이벤트 추가
      content.onclick = function () {
        overlay.setMap(null);
      };

      var overlay = new kakao.maps.CustomOverlay({
        clickable: true,
        position: location,
        yAnchor: 1.7,
        xAnchor: 0.53,
        content: content,
      });
      eunwooOverlays.push(overlay);

      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(kakaoMap);
      });
    });

    // 클러스터 설정
    var clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap,
      averageCenter: true,
      minLevel: 6,
      disableClickZoom: false,
    });
    clusterer.addMarkers(eunwooMarkers);
    setEwClusterer(clusterer);

    setEwMarkers(eunwooMarkers);
    setEwOverlays(eunwooOverlays);
  }, 20000);

  useInterval(() => {
    var imageSrc = plantsMarkerImage;
    var imageSize = new kakao.maps.Size(42, 42);
    var imageOption = { offset: new kakao.maps.Point(27, 69) };
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    // 백단에서 현재 위치랑 같은 지역구에 있는 포토카드 데이터 받아오기
    axios({
      method: "post",
      url: "https://j7a703.p.ssafy.io/api/photocard/map",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        latitude: position.lat,
        longitude: position.lng,
      },
    })
      .then((res) => {
        const targets = res.data.mapPhotocardList;
        console.log("target", targets);

        // 새 데이터가 이전 데이터랑 다르면 state바꾸기
        if (targets.length !== plantMarkers.length) {
          if (plantClusterer !== null) {
            plantClusterer.clear(); // 이전 클러스터 삭제
          }

          // 이전 마커 삭제
          plantMarkers.forEach(function (plantMarker) {
            plantMarker.setMap(null);
          });

          // 이전 오버레이 삭제
          plantOverlays.forEach(function (plantOverlay) {
            plantOverlay.setMap(null);
          });

          // state에 .push할 임시 배열
          var tmpPlantMarkers = [];
          var tmpPlantOverlays = [];
          targets.forEach(function (target) {
            const location = new kakao.maps.LatLng(
              target.latitude,
              target.longitude
            );

            // 1. 마커 생성
            const marker = new kakao.maps.Marker({
              map: kakaoMap,
              position: location,
              image: markerImage,
              clickable: true,
            });
            tmpPlantMarkers.push(marker);

            // 2. 오버레이 생성
            // 2.1. 오버레이 content 생성
            var content = document.createElement("button");
            content.type = "button";
            content.className = "btn btn-success";
            content.appendChild(document.createTextNode(target.korName));

            // 2.2. 닫기 이벤트 추가
            content.onclick = function () {
              overlay.setMap(null);
            };

            var overlay = new kakao.maps.CustomOverlay({
              clickable: true,
              position: location,
              yAnchor: 1.7,
              xAnchor: 0.53,
              content: content,
            });
            tmpPlantOverlays.push(overlay);

            // 마커 클릭시 오버레이 나옴
            kakao.maps.event.addListener(marker, "click", function () {
              overlay.setMap(kakaoMap);
            });
          });

          // 클러스터 생성
          var clusterer = new kakao.maps.MarkerClusterer({
            map: kakaoMap,
            averageCenter: true,
            minLevel: 6,
            disableClickZoom: false,
          });
          clusterer.addMarkers(tmpPlantMarkers);

          setPlantClusterer(clusterer);
          setPlantMarkers(tmpPlantMarkers);
          setPlantOverlays(tmpPlantOverlays);
        }
      })
      .catch((err) => console.log(err));
  }, 5000);

  return (
    <div>
      <div
        id="container"
        ref={container}
        style={{ width: "100%", height: "100vh" }}
      />
      ;
    </div>
  );
}

export default KakaoMap;
