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
  const [initRender, setInitRender] = useState(0);

  const token = sessionStorage.getItem("loginToken");
  // const localFile = "/public/monstera.jpg";

  useEffect(() => {
    setInitRender(1);
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

  return (
    <div>
      <img src={location.state.imgSrc} alt="" />
    </div>
  );
}

export default PlantResultView;
