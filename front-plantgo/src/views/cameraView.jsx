import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 360,
  height: 500,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);

  const [imgSrc, setImgSrc] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (imgSrc !== "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // setLatitude(position.coords.latitude);
          // setLongitude(position.coords.longitude);
          axios({
            method: "get",
            url: `/map-reversegeocode/v2/gc?coords=${position.coords.longitude},${position.coords.latitude}&output=json`,
            headers: {
              "X-NCP-APIGW-API-KEY-ID": "6s70rnjtot",
              "X-NCP-APIGW-API-KEY": "uDvd8ChhbkZbYjXX1z7y88hd3bZEiLEzYtN8kiiq",
            },
          }).then((res) => {
            console.log(
              "reverse geocode",
              res.data.results[0].region.area2.name
            );
            navigate("/plantResult", {
              state: {
                imgSrc: imgSrc,
                position: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                area: res.data.results[0].region.area2.name,
              },
            });
          });
        });
      } else {
        window.alert("현재 위치를 확인할 수 없습니다ㅠㅠ");
      }
    }
  }, [imgSrc]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="360px"
        height="600px"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {/* { imgSrc && (
        <img
          src={ imgSrc }
        />
      ) } */}
    </>
  );
};

export default WebcamCapture;
