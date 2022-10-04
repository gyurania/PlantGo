import axios from "axios";
import React, { useState, useEffect } from "react";
import useInterval from "../customHook/useInterval";
import plantsMarkerImage from "../img/plant_marker_image.png";
import HomeNavBar from "./HomeNavBar";
import "./KakaoMap.css";

function KakaoMap() {
  const { kakao } = window;

  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [currMarkers, setCurrMarkers] = useState([]);
  const [plantMarkers, setPlantMarkers] = useState([]);
  const [map, setMap] = useState();
  const [tmpMarkerForZoom, setTmpMarkerForZoom] = useState([]);
  const [clusterer, setClusterer] = useState();
  const [dummyClusterer, setDummyClusterer] = useState();
  const [dummyClustererTwo, setDummyClustererTwo] = useState();

  const token = sessionStorage.getItem("loginToken");

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

  const tmpMarkersTwo = [
    { lat: 37.5200336, lng: 127.1282772 },
    { lat: 37.5160667, lng: 127.1243592 },
    { lat: 37.5182792, lng: 127.1344056 },
    { lat: 37.5180981, lng: 127.1266643 },
    { lat: 37.5182355, lng: 127.1238584 },
    { lat: 37.5118357, lng: 127.1304261 },
    { lat: 37.5033023, lng: 127.1327042 },
    { lat: 37.5022663, lng: 127.1302278 },
    { lat: 37.5013664, lng: 127.1258691 },
    { lat: 37.5107164, lng: 127.1211286 },
    { lat: 37.5032846, lng: 127.1269937 },
    { lat: 37.5111809, lng: 127.1282727 },
    { lat: 37.5121714, lng: 127.1376493 },
    { lat: 37.5108401, lng: 127.1211919 },
    { lat: 37.5095895, lng: 127.136557 },
    { lat: 37.5013944, lng: 127.1295162 },
    { lat: 37.5153765, lng: 127.132021 },
    { lat: 37.5199083, lng: 127.1248939 },
    { lat: 37.5016456, lng: 127.1345962 },
    { lat: 37.5158073, lng: 127.1221035 },
    { lat: 37.5067285, lng: 127.1338475 },
    { lat: 37.5037201, lng: 127.131405 },
    { lat: 37.5070649, lng: 127.1309208 },
    { lat: 37.5162135, lng: 127.1219085 },
    { lat: 37.50176, lng: 127.1262367 },
    { lat: 37.5202607, lng: 127.1349643 },
    { lat: 37.5202219, lng: 127.1363472 },
    { lat: 37.5132826, lng: 127.1293017 },
    { lat: 37.5057235, lng: 127.1342782 },
    { lat: 37.5127882, lng: 127.134744 },
    { lat: 37.5135407, lng: 127.1387372 },
    { lat: 37.5013314, lng: 127.1371592 },
    { lat: 37.520569, lng: 127.131713 },
    { lat: 37.5190172, lng: 127.1240564 },
    { lat: 37.501896, lng: 127.1356269 },
    { lat: 37.506476, lng: 127.1304169 },
    { lat: 37.5020112, lng: 127.134987 },
    { lat: 37.5030168, lng: 127.1376111 },
    { lat: 37.5195928, lng: 127.128292 },
    { lat: 37.5110264, lng: 127.1287948 },
    { lat: 37.5130598, lng: 127.134296 },
    { lat: 37.5170782, lng: 127.1308869 },
    { lat: 37.5052628, lng: 127.1279523 },
    { lat: 37.502826, lng: 127.1225383 },
    { lat: 37.5148044, lng: 127.1290155 },
    { lat: 37.5125511, lng: 127.1213029 },
    { lat: 37.5101932, lng: 127.1241904 },
    { lat: 37.5078105, lng: 127.1368952 },
    { lat: 37.507453, lng: 127.1261492 },
    { lat: 37.5195206, lng: 127.1391732 },
    { lat: 37.5156896, lng: 127.1194626 },
    { lat: 37.5272646, lng: 127.1283791 },
    { lat: 37.5288176, lng: 127.1251134 },
    { lat: 37.5257544, lng: 127.1282554 },
    { lat: 37.5172889, lng: 127.1117257 },
    { lat: 37.5127321, lng: 127.1196729 },
    { lat: 37.5269958, lng: 127.1115254 },
    { lat: 37.5300283, lng: 127.1263295 },
    { lat: 37.5188591, lng: 127.1116623 },
    { lat: 37.5215358, lng: 127.1277263 },
    { lat: 37.5266669, lng: 127.1279806 },
    { lat: 37.5220057, lng: 127.1101627 },
    { lat: 37.528055, lng: 127.1225952 },
    { lat: 37.5202967, lng: 127.1287835 },
    { lat: 37.517383, lng: 127.1115984 },
    { lat: 37.5147876, lng: 127.1216801 },
    { lat: 37.5274537, lng: 127.1282737 },
    { lat: 37.5169244, lng: 127.1153113 },
    { lat: 37.5306729, lng: 127.1194176 },
    { lat: 37.5138061, lng: 127.1208664 },
    { lat: 37.5198305, lng: 127.1277889 },
    { lat: 37.5192738, lng: 127.1244535 },
    { lat: 37.5116651, lng: 127.1227248 },
    { lat: 37.517153, lng: 127.1147852 },
    { lat: 37.5256103, lng: 127.1233 },
    { lat: 37.5279358, lng: 127.1199454 },
    { lat: 37.5219589, lng: 127.1292007 },
    { lat: 37.5208764, lng: 127.1161344 },
    { lat: 37.5213586, lng: 127.1177428 },
    { lat: 37.5123909, lng: 127.1107177 },
    { lat: 37.5299741, lng: 127.116189 },
    { lat: 37.5225288, lng: 127.1208959 },
    { lat: 37.514256, lng: 127.1283387 },
    { lat: 37.5192866, lng: 127.1109335 },
    { lat: 37.513714, lng: 127.111866 },
    { lat: 37.5276161, lng: 127.1225757 },
    { lat: 37.5167117, lng: 127.1140757 },
    { lat: 37.5295056, lng: 127.1286065 },
    { lat: 37.5232359, lng: 127.122926 },
    { lat: 37.514815, lng: 127.1166991 },
    { lat: 37.5256796, lng: 127.1262612 },
    { lat: 37.5306432, lng: 127.1234789 },
    { lat: 37.5144177, lng: 127.11977 },
    { lat: 37.5191959, lng: 127.1278951 },
    { lat: 37.5163393, lng: 127.1229787 },
    { lat: 37.5173634, lng: 127.1264266 },
    { lat: 37.5145768, lng: 127.1195143 },
    { lat: 37.5264717, lng: 127.1233619 },
    { lat: 37.5222855, lng: 127.1211765 },
    { lat: 37.5216428, lng: 127.1298063 },
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

  // 1초마다 현재위치 받아와서 이전과 0.0002이상 달라졌으면 position업데이트 및 지도 중앙이동
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
    var imageSrc = plantsMarkerImage;
    var imageSize = new kakao.maps.Size(42, 42);
    var imageOption = { offset: new kakao.maps.Point(27, 69) };
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    var tmpMarkersZoom = [];
    for (var i = 0; i < tmpMarkersTwo.length; i++) {
      var tmpLoc = new kakao.maps.LatLng(
        tmpMarkersTwo[i].lat,
        tmpMarkersTwo[i].lng
      );
      var dummyMarker = new kakao.maps.Marker({
        map: map,
        position: tmpLoc,
        image: markerImage,
      });
      tmpMarkersZoom.push(dummyMarker);
    }

    var tmpClusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, // 클러스터 할 최소 지도 레벨
      disableClickZoom: false, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    });
    tmpClusterer.addMarkers(tmpMarkersZoom);
    setDummyClustererTwo(tmpClusterer);

    // setTmpMarkerForZoom(tmpMarkersZoom);
  }, 5000);

  useInterval(() => {
    var imageSrc = plantsMarkerImage;
    var imageSize = new kakao.maps.Size(42, 42);
    var imageOption = { offset: new kakao.maps.Point(27, 69) };
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    var tmpMarkersZoom = [];
    for (var i = 0; i < tmpMarkers.length; i++) {
      var tmpLoc = new kakao.maps.LatLng(tmpMarkers[i].lat, tmpMarkers[i].lng);
      var dummyMarker = new kakao.maps.Marker({
        map: map,
        position: tmpLoc,
        image: markerImage,
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
    setDummyClusterer(tmpClusterer);

    setTmpMarkerForZoom(tmpMarkersZoom);
  }, 5000);

  useInterval(() => {
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
        const target = res.data.mapPhotocardList;
        if (target.length !== plantMarkers.length) {
          clusterer.clear(); // 이전 클러스터러 삭제
          for (var i = 0; i < plantMarkers.length; i++) {
            plantMarkers[i].setMap(null); // 이전 마커 삭제
          }

          // 새로 들어온 데이터 마커로 치환 후 state에 push
          var tmpPlantMarkers = [];
          for (var i = 0; i < target.length; i++) {
            const tmpLoc = new kakao.maps.LatLng(
              target[i].longitude,
              target[i].latitude
            );
            const tmpMarker = new kakao.maps.Marker({
              map: map,
              title: target[i].user.username,
              position: tmpLoc,
            });
            tmpPlantMarkers.push(tmpMarker);
          }

          var tmpClusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 5, // 클러스터 할 최소 지도 레벨
            disableClickZoom: false, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
          });
          tmpClusterer.addMarkers(tmpPlantMarkers);
          setClusterer(tmpPlantMarkers);

          setPlantMarkers(tmpPlantMarkers); // 이전 마커들 다 지우고 다시 채움
        }
      })
      .catch((err) => console.log(err));
  }, 5000);

  return (
    <div>
      <div
        id="map"
        style={{ width: "100%", height: "100vh" }}
        className="kakao-map"
      />
      {/* <HomeNavBar /> */}
    </div>
  );
}

export default KakaoMap;
