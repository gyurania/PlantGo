import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
// import {
//   RemoveBgResult,
//   RemoveBgError,
//   removeBackgroundFromImageBase64,
// } from "remove.bg";

const WebcamCapture = () => {
  const webcamRef = useRef<Webcam>(null);

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  // const [latitude, setLatitude] = useState(37.5656);
  // const [longitude, setLongitude] = useState(126.9769);
  const [isCaptureClicked, setIsCaptureClicked] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
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
          console.log("reverse geocode", res.data.results[0].region.area2.name);
        });
      });
    } else {
      window.alert("현재 위치를 확인할 수 없습니다ㅠㅠ");
    }

    navigate("/plantResult", { state: { imgSrc: imgSrc } });
  }, [isCaptureClicked]);

  const handleCaptureClicked = (e: any) => {
    e.preventDefault();
    setIsCaptureClicked(true);
  };
  // if (imgSrc !== null) {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       // setLatitude(position.coords.latitude);
  //       // setLongitude(position.coords.longitude);
  //       axios({
  //         method: "get",
  //         url: `/map-reversegeocode/v2/gc?coords=${position.coords.longitude},${position.coords.latitude}&output=json`,
  //         headers: {
  //           "X-NCP-APIGW-API-KEY-ID": "6s70rnjtot",
  //           "X-NCP-APIGW-API-KEY": "uDvd8ChhbkZbYjXX1z7y88hd3bZEiLEzYtN8kiiq",
  //         },
  //       }).then((res) => {
  //         console.log("reverse geocode", res.data.results[0].region.area2.name);
  //       });
  //     });
  //   } else {
  //     window.alert("현재 위치를 확인할 수 없습니다ㅠㅠ");
  //   }

  //   navigate("/plantResult", { state: { imgSrc: imgSrc } });
  // }

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
      />
      <button
        onClick={(e) => {
          capture();
          handleCaptureClicked(e);
        }}
      >
        Capture photo
      </button>
      {/* { imgSrc && (
        <img
          src={ imgSrc }
        />
      ) } */}
    </>
  );
};

export default WebcamCapture;
