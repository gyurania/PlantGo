import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";


const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const [imgSrc, setImgSrc] = useState('');
  const [latitude, setLatitude] = useState(37.5656);
  const [longitude, setLongitude] = useState(126.9769);

  const navigate = useNavigate()

  if (imgSrc != '') {
    navigate('/plantResult', {state:{imgSrc: imgSrc}})
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(position);
    });
  } else {
    window.alert("현재위치를 확인할 수 없습니다ㅠㅠ");
  }

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imgSrc)
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    console.log('여기', imgSrc);
    // axios({
    //   method: 'get',
    //   url: "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=127.0395466,37.5038118&output=json",
    //   headers: {
    //     "X-NCP-APIGW-API-KEY-ID": "6s70rnjtot",
    //     "X-NCP-APIGW-API-KEY": "uDvd8ChhbkZbYjXX1z7y88hd3bZEiLEzYtN8kiiq"
    //   }
    // })
    //   .then((res) => {
    //     const area = res.data.result[0].region.area3.name
    //     axios({
    //       method: 'post',
    //       url: 'http://j7a703.p.ssafy.io:8080/api/photocard',
    //       data: {
    //         'img': imgSrc,
    //         'lat': latitude,
    //         'lng': longitude,
    //         'area': area
    //       }
    //     }) 
    //       .then((res) => {

    //       })
    //   })
  }, [imgSrc, setImgSrc])

  return (
    <>
      <Webcam
        audio={ false }
        ref={ webcamRef }
        screenshotFormat="image/jpeg"
        width='360px'
        height='600px'
      />
      <button onClick={ capture }>Capture photo</button>
      {/* { imgSrc && (
        <img
          src={ imgSrc }
        />
      ) } */}
    </>
  );
};

export default WebcamCapture;