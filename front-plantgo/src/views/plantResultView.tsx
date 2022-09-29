import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import {
//   RemoveBgResult,
//   RemoveBgError,
//   removeBackgroundFromImageFile,
// } from "remove.bg";
// import * as fs from "fs";

function PlantResultView() {
  const location = useLocation();
  // location.state.plantInfo -> name, studyName,
  const navigate = useNavigate();

  const [info, setInfo] = useState<Object>({});
  const [removebgImg, setRemovebgImg] = useState<string>("");

  const token = sessionStorage.getItem("loginToken");
  // const localFile = "/public/monstera.jpg";

  useEffect(() => {
    axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      headers: {
        "x-api-key": "9tRSQ11xfpwdrxkXF3hWcjSM",
      },
      data: {
        image_file_b64: location.state.imgSrc,
        size: "preview",
        type: "auto",
        type_level: "1",
        format: "auto",
        roi: "0% 0% 100% 100%",
        crop: false,
        crop_margin: "0",
        scale: "original",
        position: "original",
        channels: "rgba",
        add_shadow: false,
        semitransparency: true,
      },
    })
      .then((res) => {
        console.log(res.data);
        setRemovebgImg(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // removeBackgroundFromImageFile({
  //   path: localFile,
  //   apiKey: "9tRSQ11xfpwdrxkXF3hWcjSM",
  //   size: "regular",
  //   type: "auto",
  //   scale: "50%",
  // }).then((res: RemoveBgResult) => {
  //   const base64img = res.base64img;
  //   console.log(base64img);
  // });

  if (removebgImg === "") {
    return (
      <div>
        <h1>배경 제거 중...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <img src={removebgImg} alt="" />
      </div>
    );
  }
}

export default PlantResultView;
