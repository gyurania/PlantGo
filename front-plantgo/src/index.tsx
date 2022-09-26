import React from "react";
import Login from "./views/loginView";
import Home from "./views/homeView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import SuccessLogin from "./components/successLogin";
import WebcamCapture from "./views/cameraView";
import PlantList from "./views/plantsListView";
import PlantResultView from "./views/plantResultView";
import RankView from "./views/rankView";
import "bootstrap/dist/css/bootstrap.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
axios.defaults.withCredentials = true;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/oauth/redirect" element={<SuccessLogin />} />
        <Route path="/camera" element={<WebcamCapture />} />
        <Route path="/plantlist" element={<PlantList />} />
        <Route path="/plantResult" element={<PlantResultView />} />
        <Route path="/rank" element={<RankView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
