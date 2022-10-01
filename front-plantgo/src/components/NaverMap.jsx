import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import useInterval from "../customHook/useInterval";

function NaverMap(props) {
  const { naver } = window;

  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [currMarkers, setCurrMarkers] = useState([]);
  const [plantMarkers, setPlantMarkers] = useState([]);
  const [map, setMap] = useState();
  const [tmpMarkerForZoom, setTmpMarkerForZoom] = useState([]);

  const token = sessionStorage.getItem("loginToken");

  const location = new naver.maps.LatLng(position.lat, position.lng);

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

  const tmpMarkers2 = [
    { lat: 37.6825028, lng: 126.803479 },
    { lat: 37.6803765, lng: 126.8042497 },
    { lat: 37.6830861, lng: 126.8004077 },
    { lat: 37.6870405, lng: 126.795442 },
    { lat: 37.6838755, lng: 126.795529 },
    { lat: 37.675437, lng: 126.7902437 },
    { lat: 37.68694, lng: 126.7987575 },
    { lat: 37.6869294, lng: 126.7917361 },
    { lat: 37.6743857, lng: 126.7926848 },
    { lat: 37.675668, lng: 126.8016781 },
    { lat: 37.6832347, lng: 126.7982068 },
    { lat: 37.6832529, lng: 126.7990177 },
    { lat: 37.6869673, lng: 126.797413 },
    { lat: 37.6872292, lng: 126.8025874 },
    { lat: 37.6717532, lng: 126.8003155 },
    { lat: 37.6874469, lng: 126.8077986 },
    { lat: 37.6811184, lng: 126.8010205 },
    { lat: 37.6891567, lng: 126.7962853 },
    { lat: 37.6820735, lng: 126.7914402 },
    { lat: 37.6706207, lng: 126.7961641 },
    { lat: 37.6824315, lng: 126.7958591 },
    { lat: 37.6830615, lng: 126.7924317 },
    { lat: 37.6895066, lng: 126.7948306 },
    { lat: 37.6825424, lng: 126.7978814 },
    { lat: 37.6756857, lng: 126.7947284 },
    { lat: 37.68403, lng: 126.7945458 },
    { lat: 37.6873425, lng: 126.7985114 },
    { lat: 37.6798418, lng: 126.8094798 },
    { lat: 37.6825038, lng: 126.8059573 },
    { lat: 37.6727906, lng: 126.7995048 },
    { lat: 37.6850415, lng: 126.8037211 },
    { lat: 37.6862668, lng: 126.8034928 },
    { lat: 37.6773302, lng: 126.7983913 },
    { lat: 37.6895211, lng: 126.8018378 },
    { lat: 37.6793872, lng: 126.7978797 },
    { lat: 37.6769154, lng: 126.795715 },
    { lat: 37.6858266, lng: 126.8018991 },
    { lat: 37.672321, lng: 126.8012392 },
    { lat: 37.6755601, lng: 126.7926133 },
    { lat: 37.6807928, lng: 126.8012701 },
    { lat: 37.6731426, lng: 126.8074612 },
    { lat: 37.6770122, lng: 126.8001821 },
    { lat: 37.6869959, lng: 126.7983829 },
    { lat: 37.6821233, lng: 126.7987866 },
    { lat: 37.6893451, lng: 126.7927215 },
    { lat: 37.6738308, lng: 126.8060185 },
    { lat: 37.6807212, lng: 126.7947884 },
    { lat: 37.6786405, lng: 126.8076909 },
    { lat: 37.6834315, lng: 126.8083983 },
    { lat: 37.679942, lng: 126.8051732 },
  ];

  // 지도 옵션
  const mapOptions = {
    center: location,
    zoom: 16,
  };

  const initMap = () => {
    var tmpMap = new naver.maps.Map("map", mapOptions);
    var tmpMarker = new naver.maps.Marker({
      map: tmpMap,
      title: "myLocation",
      position: location,
    });
    setCurrMarkers(tmpMarker);

    naver.maps.Event.addListener(tmpMap, "zoom_changed", function (zoom) {
      console.log("zoom = ", zoom);
      console.log("줌 할때 마커들", tmpMarkerForZoom);
      const center = tmpMap.getCenter();
      const centerPosition = { lat: center._lat, lng: center._lng };

      if (zoom === 15) {
      }
    });

    naver.maps.Event.addListener(tmpMap, "idle", () => {
      updateMarkers(tmpMap, plantMarkers);
    });

    setMap(tmpMap);
  };

  useEffect(() => {
    initMap();
  }, []);

  const updateMarkers = (isMap, isMarkers) => {
    const mapBounds = isMap.getBounds();
    let marker;
    let position;

    for (let i = 0; i < isMarkers.length; i += 1) {
      marker = isMarkers[i];
      position = marker.getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(isMap, marker);
      } else {
        hideMarker(marker);
      }
    }
  };

  const showMarker = (isMap, marker) => {
    marker.setMap(isMap);
  };

  const hideMarker = (marker) => {
    marker.setMap(null);
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
        const tmpLoc = new naver.maps.LatLng(tmpLat, tmpLng);
        map.setCenter(tmpLoc); // 현재 위치로 지도 중앙 이동
        console.log("currMarker", currMarkers);
        currMarkers.setMap(null);
        const tmpMarker = new naver.maps.Marker({
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
    for (var i = 0; i < tmpMarkers2.length; i++) {
      var tmpLoc2 = new naver.maps.LatLng(
        tmpMarkers2[i].lat,
        tmpMarkers2[i].lng
      );
      var dummyMarker = new naver.maps.Marker({
        map: map,
        position: tmpLoc2,
      });
      tmpMarkersZoom.push(dummyMarker);
    }

    setTmpMarkerForZoom(tmpMarkersZoom);
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
        console.log("이전 식물 마커", plantMarkers);
        console.log(res.data);

        if (target.length !== plantMarkers.length) {
          for (var i = 0; i < plantMarkers.length; i++) {
            plantMarkers[i].setMap(null);
          }

          // 새로 들어온 데이터 마커로 치환 후 state에 push
          var tmpPlantMarkers = [];
          for (var i = 0; i < target.length; i++) {
            const tmpLoc = new naver.maps.LatLng(
              target[i].longitude,
              target[i].latitude
            );
            const tmpMarker = new naver.maps.Marker({
              map: map,
              title: target[i].user.username,
              position: tmpLoc,
            });
            tmpPlantMarkers.push(tmpMarker);
          }
          setPlantMarkers(tmpPlantMarkers); // 이전 마커들 다 지우고 다시 채움
        }
      })
      .catch((err) => console.log(err));
  }, 9000);

  // // 1-2. 10초마다 백단에 식물 정보 데이터 요청하기
  // // useInterval(() => {
  // //   console.log("10초");
  // //   const time = new Date();
  // //   console.log(time.getSeconds());
  // //   console.log("token", token);
  // //   axios({
  // //     method: "post",
  // //     url: `https://j7a703.p.ssafy.io/api/photocard/map/`,
  // //     headers: {
  // //       Authorization: `Bearer ${token}`,
  // //     },
  // //     data: {
  // //       latitude: position.lat,
  // //       longitude: position.lng,
  // //     },
  // //   })
  // //     .then((res) => {
  // //       console.log(res.data);
  // //       if (res.data.mapPhotocardList !== currMarkers) {
  // //         setCurrMarkers(res.data.mapPhotocardList);
  // //       }
  // //     })
  // //     .catch((err) => console.log(err));
  // // }, 10000);

  // // 1. 랜더링 된 것 표시
  // useEffect(() => {
  //   setIsRenewed(true);
  // }, []);

  useEffect(() => {});
  // 드래그 했을 때 중앙 기준 식물정보 받아오기
  // useEffect(() => {
  //   if (isRenewed) {
  //     axios({
  //       method: "get",
  //       url: "http://j7a703.p.ssafy.io/api/map1",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: {
  //         lat: props.lat,
  //         lng: props.lng,
  //       },
  //     })
  //       .then((res) => {
  //         const tmpMarkers = currMarkers;
  //         tmpMarkers.concat(res.data);

  //         setCurrMarkers(tmpMarkers);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [dragedCenter]);

  // 네이버 맵 생성, 맵 관련 각종 이벤트리스너, 로직
  // useEffect(() => {
  //   if (isRenewed) {
  //     const { naver } = window;
  //     if (!mapElement.current || !naver) return;
  //     var areaArr: any = [];
  //     const tmpCurrMarkers: any = currMarkers;

  //     areaArr.push(
  //       { location: "a", lat: 37.4959854, lng: 127.0664091 },
  //       { location: "a", lat: 37.5656, lng: 126.9769 },
  //       { location: "a", lat: 37.6469954, lng: 127.0147158 },
  //       { location: "강남역", lat: 37.496486, lng: 127.0283615 },
  //       { location: "역삼역", lat: 37.5007252, lng: 127.0366003 },
  //       { location: "선릉역", lat: 37.504496, lng: 127.0489806 },
  //       { location: "논현역", lat: 37.5111154, lng: 127.0215647 },
  //       { location: "신논현역", lat: 37.5048075, lng: 127.0253732 },
  //       { location: "신사역", lat: 37.5165159, lng: 127.0204072 },
  //       { location: "언주역", lat: 37.5073732, lng: 127.0340489 }
  //     );

  //     var lat = 37.6843202;
  //     var lng = 126.7796355;
  //     // 현재 위치 변수 할당
  //     const location = new naver.maps.LatLng(lat, lng);

  //     // 지도 옵션
  //     const mapOptions: naver.maps.MapOptions = {
  //       center: location,
  //       zoom: 16,
  //     };

  //     // 지도 생성
  //     const map = new naver.maps.Map(mapElement.current, mapOptions);

  //     var lat = 37.6843202;
  //     var lng = 126.7796355;

  //     setInterval(() => {
  //       console.log("인터벌 되나");
  //       navigator.geolocation.watchPosition((pos) => {
  //         const tmpLat = pos.coords.latitude;
  //         const tmpLng = pos.coords.longitude;
  //         console.log();
  //         if (((tmpLat - lat) ** 2 + (tmpLng - lng) ** 2) ** 0.5 > 0.0005) {
  //           console.log("맵 내부 위도", tmpLat);
  //           console.log("맵 내부 경도", tmpLng);
  //           lat = tmpLat;
  //           lng = tmpLng;
  //           var tmpLocation = new naver.maps.LatLng(lat, lng);
  //           map.setCenter(tmpLocation);
  //         }
  //       });
  //     }, 1000);

  //     // 여기서부터 Marker
  //     // 내 위치 Marker
  //     new naver.maps.Marker({
  //       map: map,
  //       title: "myLocation",
  //       position: new naver.maps.LatLng(lat, lng),
  //     });

  //     var markers: naver.maps.Marker[] = [];
  //     var infowindows: naver.maps.InfoWindow[] = [];

  //     // 실제 사용 식물 (포토카드) 데이터
  //     for (var i = 0; i < tmpCurrMarkers.length; i++) {
  //       const otherMarkers = new naver.maps.Marker({
  //         map: map,
  //         position: new naver.maps.LatLng(
  //           tmpCurrMarkers[i].latitude,
  //           tmpCurrMarkers[i].longitude
  //         ),
  //         icon: {
  //           url: "/public/plantGO_logo_wot_rbg.png",
  //           size: new naver.maps.Size(30, 30),
  //         },
  //       });

  //       const infowindow = new naver.maps.InfoWindow({
  //         content: `<div>클릭해보셈<div/>`,
  //         borderWidth: 1,
  //         anchorSize: new naver.maps.Size(10, 10),
  //         pixelOffset: new naver.maps.Point(10, -10),
  //       });

  //       markers.push(otherMarkers);
  //       infowindows.push(infowindow);
  //     }

  //     // 식물들 위치 Marker
  //     for (var i = 0; i < areaArr.length; i++) {
  //       const otherMarkers = new naver.maps.Marker({
  //         map: map,
  //         title: areaArr[i].location,
  //         position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng),
  //       });

  //       const infowindow = new naver.maps.InfoWindow({
  //         content: `
  //               <div class="naver-container">
  //                 ${areaArr[i].location}
  //               <div/>
  //             `,
  //         borderWidth: 1,
  //         anchorSize: new naver.maps.Size(10, 10),
  //         pixelOffset: new naver.maps.Point(10, -10),
  //       });

  //       markers.push(otherMarkers);
  //       infowindows.push(infowindow);
  //     }

  //     // zoom값 가져오는 이벤트리스너
  //     naver.maps.Event.addListener(map, "zoom_changed", function (zoom) {
  //       console.log(zoom);
  //       console.log(areaArr);
  //       console.log("줌 바뀜 제발 제발");
  //     });

  //     // 드래그 시 state변경시키기
  //     naver.maps.Event.addListener(map, "dragend", () => {
  //       console.log("드래그");
  //       console.log(map.getCenter().x);
  //       console.log(map.getCenter().y);
  //       const lat = map.getCenter().x;
  //       const lng = map.getCenter().y;
  //       setDragedCenter({ lat: lat, lng: lng });
  //     });

  //     const getClickHandler = (seq: number) => {
  //       return () => {
  //         const marker = markers[seq];
  //         const infoWindow = infowindows[seq];

  //         if (infoWindow.getMap()) {
  //           infoWindow.close();
  //         } else {
  //           infoWindow.open(map, marker);
  //         }
  //       };
  //     };

  //     for (let i = 0; i < markers.length; i += 1) {
  //       naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
  //     }
  //   }
  // }, [isRenewed, position, currMarkers]); // 나중에는 props.nearPlants만 쓸꺼임

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}

export default NaverMap;

// import React, { useEffect } from "react";

// export const NaverMap = () => {
//   const { naver } = window;
//   useEffect(() => {
//     let map = null;
//     const initMap = () => {
//       const map = new naver.maps.Map("map", {
//         center: new naver.maps.LatLng(37.5656, 126.9769),
//         zoom: 13,
//       });
//     };
//     initMap();
//   }, []);

//   //지도 사이즈 관련 스타일
//   const mapStyle = {
//     width: "80%",
//     height: "600px",
//   };

//   return (
//     <React.Fragment>
//       <div id="map" style={{ width: "100%", height: "100vh" }}></div>
//     </React.Fragment>
//   );
// };

// export default NaverMap;
