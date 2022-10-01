import React, { useState, useEffect } from "react";
import useInterval from "../customHook/useInterval";

function KakaoMap() {
  const { kakao } = window;

  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [currMarkers, setCurrMarkers] = useState([]);
  const [plantMarkers, setPlantMarkers] = useState([]);
  const [map, setMap] = useState();
  const [tmpMarkerForZoom, setTmpMarkerForZoom] = useState([]);
  const [clusterer, setClusterer] = useState();

  const location = new kakao.maps.LatLng(position.lat, position.lng);

  const tmpMarkers = [
    { lat: 37.6887371, lng: 126.7846376 },
    { lat: 37.6857293, lng: 126.7786386 },
    { lat: 37.6980726, lng: 126.7664948 },
    { lat: 37.693819, lng: 126.780976 },
    { lat: 37.6810649, lng: 126.7660589 },
    { lat: 37.6969239, lng: 126.7704684 },
    { lat: 37.6928105, lng: 126.7821193 },
    { lat: 37.6915444, lng: 126.7651047 },
    { lat: 37.6806735, lng: 126.7692261 },
    { lat: 37.6871522, lng: 126.7795575 },
    { lat: 37.6816072, lng: 126.7654713 },
    { lat: 37.6854876, lng: 126.7688321 },
    { lat: 37.6911751, lng: 126.7836991 },
    { lat: 37.6933195, lng: 126.778545 },
    { lat: 37.6899245, lng: 126.7834599 },
    { lat: 37.6971122, lng: 126.783201 },
    { lat: 37.6851134, lng: 126.783325 },
    { lat: 37.692296, lng: 126.7789639 },
    { lat: 37.6973139, lng: 126.7708711 },
    { lat: 37.6857771, lng: 126.7848305 },
    { lat: 37.6977715, lng: 126.7729631 },
    { lat: 37.6916873, lng: 126.766929 },
    { lat: 37.694581, lng: 126.7714456 },
    { lat: 37.6964568, lng: 126.7835931 },
    { lat: 37.6937457, lng: 126.7743304 },
    { lat: 37.6815675, lng: 126.7756563 },
    { lat: 37.6942786, lng: 126.7655234 },
    { lat: 37.6876536, lng: 126.7805864 },
    { lat: 37.6923464, lng: 126.7692389 },
    { lat: 37.6898039, lng: 126.7777472 },
    { lat: 37.6821305, lng: 126.7722636 },
    { lat: 37.6939555, lng: 126.7652895 },
    { lat: 37.6974921, lng: 126.7675053 },
    { lat: 37.695066, lng: 126.7714841 },
    { lat: 37.692129, lng: 126.7748648 },
    { lat: 37.6869954, lng: 126.7730032 },
    { lat: 37.683574, lng: 126.7682936 },
    { lat: 37.6810586, lng: 126.7741027 },
    { lat: 37.6959415, lng: 126.7760606 },
    { lat: 37.6826798, lng: 126.7741713 },
    { lat: 37.6907297, lng: 126.7723427 },
    { lat: 37.6992186, lng: 126.7728969 },
    { lat: 37.6882578, lng: 126.7747021 },
    { lat: 37.6815031, lng: 126.7818412 },
    { lat: 37.6824607, lng: 126.7702168 },
    { lat: 37.6921077, lng: 126.7826622 },
    { lat: 37.6837851, lng: 126.7691574 },
    { lat: 37.6938868, lng: 126.7840651 },
    { lat: 37.6903737, lng: 126.7783206 },
  ];

  const mapOptions = {
    center: location,
    level: 4,
  };

  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var tmpMap = new kakao.maps.Map(mapContainer, mapOptions);
    var tmpMarker = new kakao.maps.Marker({
      map: tmpMap,
      title: "myLocation",
      position: location,
    });
    setCurrMarkers(tmpMarker);
    setMap(tmpMap);
  }, []);

  const handleZoomChange = (level) => {
    console.log(level);
    console.log(currMarkers);
    console.log(tmpMarkerForZoom);
  };

  useInterval(() => {
    const time = new Date();
    // console.log(time.getSeconds());
    navigator.geolocation.getCurrentPosition((pos) => {
      const tmpLat = pos.coords.latitude;
      const tmpLng = pos.coords.longitude;
      // console.log(tmpLat, tmpLng);
      if (
        ((position.lat - tmpLat) ** 2 + (position.lng - tmpLng) ** 2) ** 0.5 >
        0.0002
      ) {
        setPosition({ lat: tmpLat, lng: tmpLng });
        const tmpLoc = new kakao.maps.LatLng(tmpLat, tmpLng);
        map.setCenter(tmpLoc); // 현재 위치로 지도 중앙 이동
        console.log("currMarker", currMarkers);
        currMarkers.setMap(null);
        const tmpMarker = new kakao.maps.Marker({
          map: map,
          title: "myLocation",
          position: tmpLoc,
        });
        setCurrMarkers(tmpMarker);
      }
    });
  }, 1000);

  useInterval(() => {
    var tmpMarkersZoom = [];
    for (var i = 0; i < tmpMarkers.length; i++) {
      var tmpLoc = new kakao.maps.LatLng(tmpMarkers[i].lat, tmpMarkers[i].lng);
      var dummyMarker = new kakao.maps.Marker({
        map: map,
        position: tmpLoc,
      });
      tmpMarkersZoom.push(dummyMarker);
    }

    var tmpClusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 6, // 클러스터 할 최소 지도 레벨
      disableClickZoom: false, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    });
    tmpClusterer.addMarkers(tmpMarkersZoom);
    setClusterer(tmpClusterer);

    // setTmpMarkerForZoom(tmpMarkersZoom);
  }, 5000);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}

export default KakaoMap;
