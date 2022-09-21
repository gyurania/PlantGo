import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  RemoveBgResult,
  RemoveBgError,
  removeBackgroundFromImageFile,
} from "remove.bg";
// import * as fs from "fs";

function PlantResultView() {
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<Object>({});
  const token = sessionStorage.getItem("token");
  // const localFile = "/public/monstera.jpg";

  useEffect(() => {
    if (loading) {
      axios({
        method: "post",
        url: "http://j7a703.p.ssafy.io:8080/api/photocard",
        headers: {
          Authorization: `'Bearer ' + ${token}`,
        },
        data: {
          img: location.state.imgSrc,
          latitude: location.state.position.lat,
          longitude: location.state.position.lng,
          area: location.state.area,
        },
      })
        .then((res) => {
          setLoading(false);
          setInfo(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("잘못 된 접근입니다.");
    }
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
