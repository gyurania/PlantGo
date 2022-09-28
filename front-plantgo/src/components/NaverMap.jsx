import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import useInterval from "../customHook/useInterval";

function NaverMap(props) {
  const { naver } = window;

  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [currMarkers, setCurrMarkers] = useState([]);
  const [plantMarkers, setPlantMarkers] = useState([]);
  const [map, setMap] = useState();

  const token = sessionStorage.getItem("loginToken");

  const location = new naver.maps.LatLng(position.lat, position.lng);

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
      position: new naver.maps.LatLng(location),
    });
    setCurrMarkers(tmpMarker);

    naver.maps.Event.addListener(tmpMap, "zoom_changed", function (zoom) {
      console.log(zoom);
      console.log("줌 바뀜 제발 제발");
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
    console.log(time.getSeconds());
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const tmpLat = pos.coords.latitude;
        const tmpLng = pos.coords.longitude;
        if (
          ((position.lat - tmpLat) ** 2 + (position.lng - tmpLng) ** 2) ** 0.5 >
          0.0003
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
      },
      () => {
        window.alert("GPS동의 바람");
      }
    );
  }, 3000);

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
        console.log("이전 식물 마커", plantMarkers);
        console.log(res.data);
        if (target !== plantMarkers) {
          console.log("식물 마커 달라짐");
          // 이전 마커들 .setMap(null) 해줘야 할 듯
          for (var i = 0; i < plantMarkers.length; i++) {
            plantMarkers[i].setMap(null);
          }

          // 새로 들어온 데이터 마커로 치환 후 state에 push
          var tmpPlantMarkers = [];
          for (var i = 0; i < target.length; i++) {
            const tmpLoc = new naver.maps.LatLng(
              target[i].latitude,
              target[i].longitude
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
