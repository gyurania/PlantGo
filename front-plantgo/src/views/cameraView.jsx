import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Webcam from "react-webcam";

const areaInitialState = { area: "" };

// function reducer(state, action) {
//   switch (action.)
// }

const videoConstraints = {
  width: 360,
  height: 500,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);

  const [imgSrc, setImgSrc] = useState("");
  const [formImg, setFormImg] = useState(null);
  const [position, setPosition] = useState({ lat: 0, lng: 0, area: "" });

  const navigate = useNavigate();

  const token = sessionStorage.getItem("loginToken");

  // 1. 처음 랜더링 될 때만 현재 좌표와 행정구역 업데이트
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
            console.log("here");
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

  // 2. 사진을 찍으면 base64에서 form-data로 바꿔주기
  useEffect(() => {
    console.log(position);
    if (imgSrc !== "") {
      console.log("여긴오면안돼 제발");
      fetch(imgSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const newFile = new File([blob], "file_name", { type: "image/png" });
          console.log(newFile);
          console.log(typeof newFile);
          setFormImg(newFile);
        });
    }
  }, [imgSrc]);

  // 3. form-data가 생성되면 back에 postcard post요청
  useEffect(() => {
    if (formImg !== null) {
      console.log(formImg);
      axios.post("http://j7a703.p.ssafy.io:8080/api/photocard");
      axios({
        method: "post",
        url: "/api/photocard",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          latitude: position.lat,
          longitude: position.lng,
          area: position.area,
          userSeq: 2,
        },
      })
        .then((res) => {
          navigate("/plantResult", { state: { plantInfo: res.data } });
        })
        .catch((err) => console.log(err));
    }
  }, [formImg]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  // React DOM
  if (formImg === null) {
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
  } else {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );
  }
};

export default WebcamCapture;
