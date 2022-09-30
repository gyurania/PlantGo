import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../img/플랜트고-색.png";
import { IoIosArrowBack } from "react-icons/io";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import {
  BsCameraFill,
  BsPlus,
  BsBook,
  BsAward,
  BsBoxArrowRight,
  BsArrowRepeat,
} from "react-icons/bs";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./HomeNavBar.css";

const PlantsNavBar = () => {
  let Navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  const toggleMenu = () => {
    setIsShown((current) => !current);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const home = () => {
    Navigate("/");
  };
  return (
    <>
      {/* 상단메뉴 */}
      <button
        className="btn btn-default"
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
        }}
      >
        <MdKeyboardBackspace
          onClick={home}
          style={{
            width: 50,
            height: 50,
            position: "fixed",
            top: "15px",
            right: "15px",
          }}
        />
      </button>
    </>
  );
};

export default PlantsNavBar;
