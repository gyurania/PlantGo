import PhotoCard from "../components/PhotoCard.jsx"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";
import "./PhotoCardView.scss"

function PhotoCardView() {
  let loginToken = sessionStorage.getItem('loginToken')
  const { state } = useLocation()
  const [photocardList, setphotocardList] = useState([]);

  console.log(state)
  const fetchPhotocards = async () => {
    console.log("호롤로")
    //setLoading(true)
    axios({
      method: 'get',
      url: spring.photocard.register(),
      headers: {
        'Authorization': `Bearer ${loginToken}`,
      },
      params: {
        'plantId': state
      }
    })
      .then((res) => {
        setphotocardList([...res.data.photocardList]);
      })
      .catch((err) => {
        console.error(err)
      })
  };

  useEffect(() => {
    fetchPhotocards();
  }, [])

  return (
    <div className="photocardContainer">

      {photocardList.length > 0 ? (
        photocardList.map((photocard => {
          return (
            <PhotoCard data={photocard}></PhotoCard>
          )
        }))
      ) : <li>포토카드가 없습니다.</li>}

    </div>
  )
}

export default PhotoCardView;