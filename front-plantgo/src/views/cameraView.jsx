import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 360,
  height: 500,
  facingMode: { exact: "environment" },
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);

  const [imgSrc, setImgSrc] = useState("");
  const [formImg, setFormImg] = useState();
  const [position, setPosition] = useState({ lat: 0, lng: 0, area: "" });

  const navigate = useNavigate();

  // 처음 랜더링 될 때만 현재 좌표와 행정구역 업데이트
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        axios({
          method: "get",
          url: `/map-reversegeocode/v2/gc?coords=${pos.coords.longitude},${pos.coords.latitude}&output=json`,
          headers: {
            "X-NCP-APIGW-API-KEY-ID": "6s70rnjtot",
            "X-NCP-APIGW-API-KEY": "uDvd8ChhbkZbYjXX1z7y88hd3bZEiLEzYtN8kiiq",
          },
        })
          .then((res) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              area: res.data.results[0].region.area2.name,
            });
          })
          .catch((err) => console.log(err));
      });
    }
  }, []);

  // 사진을 찍으면 base64에서 form-data로 바꿔주기
  useEffect(() => {
    if (imgSrc !== "") {
      //
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
