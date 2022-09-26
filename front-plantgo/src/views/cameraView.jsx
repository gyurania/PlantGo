import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";

function App(props) {
  const [imgSrc, setImgSrc] = useState("");
  const [formImg, setFormImg] = useState(null);
  const [position, setPosition] = useState({ lat: 0, lng: 0, area: "" });
  const [rendered, setRendered] = useState(0);

  const navigate = useNavigate();

  const token = sessionStorage.getItem("loginToken");

  useEffect(() => {
    setRendered(1);
  }, []);

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
            console.log(res.data);
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
    if (rendered) {
      console.log(position);
      if (imgSrc !== "") {
        console.log("여긴오면안돼 제발");
        fetch(imgSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const newFile = new File([blob], "file_name", {
              type: "image/jpg",
            });
            console.log(newFile);
            console.log(typeof newFile);
            setFormImg(newFile);
          });
      }
    }
  }, [imgSrc]);

  // 3. form-data가 생성되면 back에 postcard post요청
  useEffect(() => {
    if (formImg !== null) {
      const formData = new FormData();
      formData.append("files", formImg);
      console.log(formImg);
      axios({
        method: "post",
        url: "http://j7a703.p.ssafy.io/api/photocard",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    console.log(dataUri);
    setImgSrc(dataUri);
  }

  // React DOM
  if (formImg === null) {
    return (
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
        idealResolution={{ width: 360, height: 800 }}
      />
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default App;
