import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import useInterval from "../customHook/useInterval";

function NaverMap(props: any) {
  const mapElement = useRef(null);

  const [position, setPosition] = useState({ lat: 37.5656, lng: 126.9769 });
  const [currMarkers, setCurrMarkers] = useState(Array);
  const [dragedCenter, setDragedCenter] = useState(Object);
  const [isRenewed, setIsRenewed] = useState<boolean>(false);
  const [area, setArea] = useState<string>("");

  const token: any = sessionStorage.getItem("userToken");

  // 1-1. 1초마다 현재 위치 갱신
  useInterval(() => {
    const time = new Date();
    console.log(time.getSeconds());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (
          Math.abs(position.lat - pos.coords.latitude) > 0.00001 ||
          Math.abs(position.lng - pos.coords.longitude) > 0.00001
        ) {
          console.log("위치 좀 변화 됨");
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        }
      });
    }
  }, 1000);

  // 1-2. 10초마다 백단에 식물 정보 데이터 요청하기
  useInterval(() => {
    const time = new Date();
    console.log(time.getSeconds());
    axios({
      method: "get",
      url: `https://j7a703.p.ssafy.io/api/photocard/map/${position.lat},${position.lng}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setCurrMarkers(res.data.mapPhotocardList);
      })
      .catch((err) => console.log(err));
  }, 100000);

  // 1. 랜더링 된 것 표시
  useEffect(() => {
    setIsRenewed(true);
  }, []);

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
  useEffect(() => {
    console.log("랜더링 전");
    if (isRenewed) {
      console.log("랜더링 후");
      const { naver } = window;
      console.log("if 문 전");
      if (!mapElement.current || !naver) return;
      console.log("if 문 후");

      // var lat: any = 37.5656;
      // var lng: any = 126.9769;

      // if (navigator.geolocation) {
      //   navigator.geolocation.watchPosition((pos) => {
      //     console.log("watch Position");
      //     lat = pos.coords.latitude;
      //     lng = pos.coords.longitude;
      //   });
      // }

      var areaArr: any = [];

      areaArr.push(
        { location: "a", lat: 37.4959854, lng: 127.0664091 },
        { location: "a", lat: 37.5656, lng: 126.9769 },
        { location: "a", lat: 37.6469954, lng: 127.0147158 },
        { location: "강남역", lat: 37.496486, lng: 127.0283615 },
        { location: "역삼역", lat: 37.5007252, lng: 127.0366003 },
        { location: "선릉역", lat: 37.504496, lng: 127.0489806 },
        { location: "논현역", lat: 37.5111154, lng: 127.0215647 },
        { location: "신논현역", lat: 37.5048075, lng: 127.0253732 },
        { location: "신사역", lat: 37.5165159, lng: 127.0204072 },
        { location: "언주역", lat: 37.5073732, lng: 127.0340489 }
      );

      // 현재 위치 변수 할당
      const location = new naver.maps.LatLng(position.lat, position.lng);

      // 지도 옵션
      const mapOptions: naver.maps.MapOptions = {
        center: location,
        zoom: 16,
      };

      // 지도 생성
      const map = new naver.maps.Map(mapElement.current, mapOptions);

      // 여기서부터 Marker
      // 내 위치 Marker
      new naver.maps.Marker({
        map: map,
        title: "myLocation",
        position: new naver.maps.LatLng(props.lat, props.lng),
      });

      var markers: naver.maps.Marker[] = [];
      var infowindows: naver.maps.InfoWindow[] = [];

      // 식물들 위치 Marker
      for (var i = 0; i < areaArr.length; i++) {
        const otherMarkers = new naver.maps.Marker({
          map: map,
          title: areaArr[i].location,
          position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng),
        });

        const infowindow = new naver.maps.InfoWindow({
          content: `
                <div class="naver-container">
                  ${areaArr[i].location}
                <div/>
              `,
          borderWidth: 1,
          anchorSize: new naver.maps.Size(10, 10),
          pixelOffset: new naver.maps.Point(10, -10),
        });

        markers.push(otherMarkers);
        infowindows.push(infowindow);
      }

      // zoom값 가져오는 이벤트리스너
      naver.maps.Event.addListener(map, "zoom_changed", function (zoom) {
        console.log(zoom);
        console.log(areaArr);
        console.log("줌 바뀜 제발 제발");
      });

      // 드래그 시 state변경시키기
      naver.maps.Event.addListener(map, "dragend", () => {
        console.log("드래그");
        console.log(map.getCenter().x);
        console.log(map.getCenter().y);
        const lat = map.getCenter().x;
        const lng = map.getCenter().y;
        setDragedCenter({ lat: lat, lng: lng });
      });

      const getClickHandler = (seq: number) => {
        return () => {
          const marker = markers[seq];
          const infoWindow = infowindows[seq];

          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        };
      };

      for (let i = 0; i < markers.length; i += 1) {
        naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
      }
    }
  }, [position]); // 나중에는 props.nearPlants만 쓸꺼임

  return (
    <div>
      <div ref={mapElement} style={{ width: 360, height: 800 }} />
    </div>
  );
}

export default NaverMap;
