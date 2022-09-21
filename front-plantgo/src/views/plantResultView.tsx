import React from "react";
import { useLocation } from "react-router-dom";
// import {
//   RemoveBgResult,
//   RemoveBgError,
//   removeBackgroundFromImageBase64,
// } from "remove.bg";
// import * as fs from "fs";

function PlantResultView() {
  const location = useLocation();

  // const localFile = "/public/monstera.jpg";
  // const base64img = fs.readFileSync(localFile, { encoding: "base64" });
  // console.log(typeof base64img);

  // removeBackgroundFromImageBase64({
  //   base64img,
  //   apiKey: "9tRSQ11xfpwdrxkXF3hWcjSM",
  //   size: "regular",
  //   type: "product",
  // }).then((res: RemoveBgResult) => {
  //   const base64img = res.base64img;
  // });

  return (
    <div>
      <img src={location.state.imgSrc} alt="" />
    </div>
  );
}

export default PlantResultView;
