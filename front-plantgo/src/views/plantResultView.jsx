import React from "react";
import { useLocation } from "react-router-dom";

function PlantResultView() {
  const location = useLocation();
  return <div>{location.state.imgSrc}</div>;
}

export default PlantResultView;
