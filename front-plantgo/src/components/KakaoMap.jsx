/* global kakao */

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "../customHook/useInterval";
import plantsMarkerImage from "../img/plant_marker_image.png";
import overlayImage from "../img/93708.jpg";
import HomeNavBar from "./HomeNavBar";
import "./KakaoMap.css";
import "./KakaoMap.scss";

function KakaoMap() {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [dragPosition, setDragPosition] = useState({});
  const [currMarkers, setCurrMarkers] = useState([]);
  const [dragMarkers, setDragMarkers] = useState([]);
  const [dragClusterer, setDragClusterer] = useState(null);
  const [dragOverlays, setDragOverlays] = useState([]);
  const [plantMarkers, setPlantMarkers] = useState([]);
  const [plantOverlays, setPlantOverlays] = useState([]);
  const [plantClusterer, setPlantClusterer] = useState(null);

  const container = useRef();

  const token = sessionStorage.getItem("loginToken");

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

    kakao.maps.event.addListener(map, "dragend", function () {
      const tmpLac = map.getCenter().Ma;
      const tmpLng = map.getCenter().La;
      setDragPosition({ lat: tmpLac, lng: tmpLng });
    });
    setCurrMarkers(tmpMarker);
    setKakaoMap(map);
  }, [container]);

  // 드래그 시 식물 데이터 받아오기
  useEffect(() => {
    if (dragPosition === {}) {
      return;
    }

    var imageSrc = plantsMarkerImage;
    var imageSize = new kakao.maps.Size(42, 42);
    var imageOption = { offset: new kakao.maps.Point(27, 69) };
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    axios({
      method: "post",
      url: "https://j7a703.p.ssafy.io/api/photocard/map",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        latitude: dragPosition.lat,
        longitude: dragPosition.lng,
      },
    }).then((res) => {
      const targets = res.data.mapPhotocardList;
      if (targets.length !== dragMarkers.length) {
        if (dragClusterer !== null) {
          dragClusterer.clear();
        }

        dragMarkers.forEach(function (dragMarker) {
          dragMarker.setMap(null);
        });

        dragOverlays.forEach(function (dragOverlay) {
          dragOverlay.setMap(null);
        });

        var tmpDragMarkers = [];
        var tmpDragOverlays = [];
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
          tmpDragMarkers.push(marker);

          // 2. 오버레이 생성
          // 2.1. 오버레이 content 생성
          var content = document.createElement("div");
          content.className = "card";
          content.style = "width: 10rem";

          var imageBox = document.createElement("img");
          imageBox.className = "card-img-top";
          imageBox.src = target.photoUrl;
          imageBox.onclick = function () {
            overlay.setMap(null);
          };

          var cardBody = document.createElement("div");
          cardBody.className = "card-body";

          var title = document.createElement("h5");
          title.className = "card-title";
          title.appendChild(document.createTextNode(target.korName));

          cardBody.append(title);
          content.append(imageBox, cardBody);

          var overlay = new kakao.maps.CustomOverlay({
            clickable: true,
            position: location,
            yAnchor: 1.5,
            xAnchor: 0.53,
            content: content,
          });
          tmpDragOverlays.push(overlay);

          // 마커 클릭시 오버레이 나옴
          kakao.maps.event.addListener(marker, "click", function () {
            overlay.setMap(kakaoMap);
          });
        });
        var clusterer = new kakao.maps.MarkerClusterer({
          map: kakaoMap,
          averageCenter: true,
          minLevel: 6,
          disableClickZoom: false,
        });
        clusterer.addMarkers(tmpDragMarkers);

        setDragMarkers(tmpDragMarkers);
        setDragOverlays(tmpDragOverlays);
        setDragClusterer(clusterer);
      }
    });
  }, [dragPosition]);

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
            var content = document.createElement("div");
            content.className = "card";
            content.style = "width: 10rem";

            var imageBox = document.createElement("img");
            imageBox.className = "card-img-top";
            imageBox.src = target.photoUrl;
            imageBox.onclick = function () {
              overlay.setMap(null);
            };

            var cardBody = document.createElement("div");
            cardBody.className = "card-body";

            var title = document.createElement("h5");
            title.className = "card-title";
            title.appendChild(document.createTextNode(target.korName));

            cardBody.append(title);
            content.append(imageBox, cardBody);

            var overlay = new kakao.maps.CustomOverlay({
              clickable: true,
              position: location,
              yAnchor: 1.5,
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
