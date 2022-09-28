import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./photoCards.css";
import Container from "react-bootstrap/Container";

function PhotoCards() {
  const { state } = useLocation();

  return (
    <div className="plantBook">
      <div className="book">
        <div className="imgBox">
          <div className="bark"></div>
          <img src="https://image.ibb.co/fYzTrb/lastofus.jpg" />
        </div>
        <div className="details">
          <h4 className="color1">You're not a Fossil! (YET)</h4>
          <h4 className="color2 margin">(HAPPY BIRTHDAY)</h4>
          <p>Dear Dad,</p>
          <p>Let's see.. .</p>
          <p>You’re never around, you</p>
          <p>hate the music I’m into, you</p>
          <p>practically despise the movies I</p>
          <p>like, and yet somehow you still</p>
          <p>manage to be the best dad every year.</p>
          <p>How do you do that? :)</p>
          <p className="text-right">Happy Birthday, papa!</p>
          <p className="text-right">♥Sarah</p>
        </div>
      </div>
    </div>
  );
}

export default PhotoCards;
