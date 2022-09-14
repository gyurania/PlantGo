import React, { useEffect, useRef, useState } from "react";


function HomeView() {
  const mapElement = useRef(null);

  const [latitude, setLatitude] = useState(37.5656)
  const [longitude, setLongitude] = useState(126.9769)

  navigator.geolocation.watchPosition((position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    console.log(position)
  })

  // useEffect(() => {
  //   navigator.geolocation.watchPosition((position) => {
  //     setLatitude(position.coords.latitude)
  //     setLongitude(position.coords.longitude)
  //     console.log(position)
  //   })
  // }, [])

  console.log('위도', latitude)
  console.log('경도', longitude)

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    var areaArr = []
    areaArr.push(
      {location: 'a', lat: 37.4959854, lng: 127.0664091},
      {location: 'a', lat: 37.5656, lng: 126.9769},
      {location: 'a', lat: 37.6469954, lng: 127.0147158},
      {location: 'currMy', lat: latitude, lng: longitude},
    )

    // const location = new naver.maps.LatLng(37.5656, 126.9769);
    const location = new naver.maps.LatLng(latitude, longitude);


    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: false,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    for (var i=0; i < areaArr.length; i++) {
      new naver.maps.Marker({
        map: map,
        title: areaArr[i].location,
        position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng)
      })
    }

    console.log(mapOptions.zoom)
  }, [latitude, longitude]);


  return <div ref={mapElement} style={{ width: 360, height: 800 }} />;
}


export default HomeView;