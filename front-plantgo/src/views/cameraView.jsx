import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";
import Spinner from "../img/leap.gif";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App(props) {
  const [imgSrc, setImgSrc] = useState("");
  const [formImg, setFormImg] = useState(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
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
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }
  }, []);

  // 2. 사진을 찍으면 base64에서 form-data로 바꿔주기
  useEffect(() => {
    if (rendered) {
      console.log(position);
      if (imgSrc !== "") {
        // 이미지가 비어있지 않으면??
        console.log("여긴오면안돼 제발 와도 돼");
        fetch(imgSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const newFile = new File([blob], "file_name", {
              type: "image/jpg",
            });
            console.log(newFile);
            console.log(typeof newFile);
            setFormImg(newFile); // 바뀐 걸 formImg에 넣음
          });
      }
    }
  }, [imgSrc]); // imgSrc에 변화가 생기면 useEffect 실행됨, base64 -> 이미지 파일로 변환하는 함수

  // 3. form-data가 생성되면 back에 postcard post요청
  useEffect(() => {
    if (formImg !== null) {
      const formData = new FormData();
      // formData.append("img", formImg, {
      //   type: "image/jpg",
      // });
      formData.append("img", formImg);
      // console.log(formImg);
      console.log("formImg append!!!!!!!!!!!");

      // formData.append("photocardRequest", JSON.stringify(position), {
      //   type: "application/json",
      // });
      formData.append(
        "photocardRequest",
        new Blob([JSON.stringify(position)], {
          type: "application/json",
        })
      );

      // console.log(formData.position.longitude);
      axios({
        method: "post",
        url: "https://j7a703.p.ssafy.io/api/photocard",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNDM1Nzg1MzAxIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTg0NDI0NjQxNn0.8Ry1vFUXRfz8UpNZXprZ57oY0Nj0dvDAz76yOylMfXE`,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((res) => {
          console.log("사진찍고 응답", res.data);
          if (res.data === null) {
            window.alert("사진을 인식할 수 없어요ㅠㅠ");
            navigate("/camera");
          } else {
            navigate("/plantResult", {
              state: { plantInfo: res.data, imgSrc: imgSrc },
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [formImg]); // formImg가 바뀌면

  function handleTakePhoto(dataUri) {
    // 여기로 base64가 넘어오면
    // Do stuff with the photo...
    console.log("takePhoto");
    console.log(dataUri);
    console.log(typeof dataUri);
    // console.log(dataUri);
    setImgSrc(dataUri); // setImgSrc에 저장이 되면 -> 2번이 실행됨
  }

  // React DOM
  if (formImg === null) {
    return (
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri); // 사진 촬영하면 base64 이미지
        }}
        isFullscreen={true}
        isImageMirror={false}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
      />
    );
  } else {
    return (
      <Container
        fluid
        style={{
          height: "100vh",
        }}
      >
        <div class="row justify-content-center">
          <img src={Spinner} alt="로딩 페이지" width="30%" />
          식물 정보 가져오는 중..
        </div>
      </Container>
    );
  }
}

export default App;
