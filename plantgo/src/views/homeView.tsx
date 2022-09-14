import React, { useEffect, useRef, useState } from "react";
import './HomeView.css'

// import lo from 'lottie-web'
// import defineLordIconElement from "lord-icon-element";
// import animationData from '../animation/refreshAnimation.json'
import { Player } from '@lottiefiles/react-lottie-player';



function HomeView() {

  const mapElement = useRef(null);

  const [latitude, setLatitude] = useState(37.5656)
  const [longitude, setLongitude] = useState(126.9769)

  navigator.geolocation.watchPosition((position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    console.log(position)
  })

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

  return (
    <div>
      <h2 className="title">Plant Go!</h2>
      {/* <iframe src="https://embed.lottiefiles.com/animation/60895"></iframe> */}
      <Player
        src='https://assets9.lottiefiles.com/packages/lf20_osrsnzbe.json'
        loop
        autoplay
        style={{ height: '50px', width: '50px' }}
      />
      <div ref={mapElement} style={{ width: 360, height: 800 }} className='map'/>
    </div>
  )
}


export default HomeView;