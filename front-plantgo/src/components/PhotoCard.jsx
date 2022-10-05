import Moment from "moment";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";

let PhotoCard = (props) => {
  console.log(props);
  let loginToken = sessionStorage.getItem("loginToken");
  const formDate = Moment(props.data.createdAt).format("YYYY-MM-DD");
  const [memo, setMemo] = useState(props.data.memo);
  const [read, setRead] = useState(true);

  const memoChangeHandler = (event) => {
    setMemo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: spring.photocard.modifyMemo(props.data.photocardId),
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
      params: {
        photocard_id: props.data.photocardId,
      },
      data: {
        memo: memo,
      },
    })
      .then((res) => {
        console.log("수정완료");
        setRead(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="photocard">
      <div
        style={{
          backgroundImage: `url(${props.data.photoUrl})`,
        }}
        className="front"
      >
        <p>{formDate}</p>
        <br></br>
        <p>{props.data.area}</p>
      </div>

      {read ? (
        <div className="back read">
          <div>
            <p>{memo}</p>
          </div>
          {memo ? (
            <button
              className="photocardbutton"
              onClick={() => {
                setRead(false);
              }}
            >
              Modify
            </button>
          ) : (
            <button
              className="photocardbutton"
              onClick={() => {
                setRead(false);
              }}
            >
              메모하기
            </button>
          )}
        </div>
      ) : (
        <div className="back modify">
          <Form onSubmit={submitHandler}>
            <Form.Label style={{fontFamily:"MICEGothic Bold"}}>Memo</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              style={{ height: "auto" }}
              value={memo}
              onChange={memoChangeHandler}
            />

            <button type="submit" className="photocardbutton">
              Submit
            </button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
