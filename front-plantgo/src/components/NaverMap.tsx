import React, { useEffect, useRef } from 'react'

function NaverMap(props: any) {
    const mapElement = useRef(null)

    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;

        var areaArr: any = []

        areaArr.push(
            { location: 'a', lat: 37.4959854, lng: 127.0664091 },
            { location: 'a', lat: 37.5656, lng: 126.9769 },
            { location: 'a', lat: 37.6469954, lng: 127.0147158 },
            { location: '강남역', lat: 37.4964860, lng: 127.0283615 },
            { location: '역삼역', lat: 37.5007252, lng: 127.0366003 },
            { location: '선릉역', lat: 37.5044960, lng: 127.0489806 },
            { location: '논현역', lat: 37.5111154, lng: 127.0215647 },
            { location: '신논현역', lat: 37.5048075, lng: 127.0253732 },
            { location: '신사역', lat: 37.5165159, lng: 127.0204072 },
            { location: '언주역', lat: 37.5073732, lng: 127.0340489 },
        )

        const location = new naver.maps.LatLng(props.lat, props.lng)

        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 18,
            zoomControl: false,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);

        // 여기서부터 Marker
        // 내 위치 Marker
        new naver.maps.Marker({
            map: map,
            title: 'myLocation',
            position: new naver.maps.LatLng(props.lat, props.lng),
            // icon: {
            //     url: pinImage,
            //     size: new naver.maps.Size(50, 52),
            //     origin: new naver.maps.Point(0, 0),
            //     anchor: new naver.maps.Point(25, 26),
            // },
        })

        var markers: naver.maps.Marker[] = [];
        var infowindows: naver.maps.InfoWindow[] = [];
        // const contentTags =
        //   '<div class="naver-container"><p>식물정보</p></div>';

        // 식물들 위치 Marker
        // for (var i = 0; i < areaArr.length; i++) {
        //   const otherMarkers = new naver.maps.Marker({
        //     map: map,
        //     title: areaArr[i].location,
        //     position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng)
        //   })

        //   const infowindow = new naver.maps.InfoWindow({
        //     content: `
        //       <div class="naver-container">
        //         ${areaArr[i].location}
        //       <div/>
        //     `,
        //     borderWidth: 1,
        //     anchorSize: new naver.maps.Size(10, 10),
        //     pixelOffset: new naver.maps.Point(10, -10),
        //   });

        //   markers.push(otherMarkers);
        //   infowindows.push(infowindow);
        // }

        naver.maps.Event.addListener(map, "idle", () => {
            updateMarkers(map, markers);
        });

        // zoom값 가져오는 이벤트리스너
        naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {
            console.log(zoom)
            console.log(areaArr)
            console.log('줌 바뀜 제발 제발')
            if (zoom >= 16) {
                for (var i = 0; i < areaArr.length; i++) {
                    const otherMarkers = new naver.maps.Marker({
                        map: map,
                        title: areaArr[i].location,
                        position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng)
                    })

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
            } else {
                markers = []
                infowindows = []
            }
        })

        const updateMarkers = (
            isMap: naver.maps.Map,
            isMarkers: naver.maps.Marker[]
        ) => {
            const mapBounds: any = isMap.getBounds();
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

        const showMarker = (isMap: naver.maps.Map, marker: naver.maps.Marker) => {
            marker.setMap(isMap);
        };

        const hideMarker = (marker: naver.maps.Marker) => {
            marker.setMap(null);
        };

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
    }, [props.lat, props.lng, props.nearPlants])  // 나중에는 props.nearPlants만 쓸꺼임

    return (
        <div>
            <div ref={mapElement} style={{ width: 360, height: 800 }} />
        </div>
    )
}


export default NaverMap