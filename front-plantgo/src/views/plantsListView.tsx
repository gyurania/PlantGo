import React, { useEffect, useState } from "react";
import axios from "axios";
import spring from "../api/spring";
import Card from 'react-bootstrap/Card'

function PlantList() {

  // useState
  const [userSeq, setUserSeq] = useState(0);
  const [plantList, setPlantList] = useState<any | any[]>([]);
  const [pageNumber, setPageNumber] = useState(1)
  // const [collectedPlantList, setCollectedPlantList] = useState([]);
  // const [nonCollectedPlantList, setNonCollectedPlantList] = useState([]);

  // Login key

  let loginToken = sessionStorage.getItem('loginToken')

  // 로그인 안되어 있으면 로그인 화면으로 보내기

  if (!loginToken) {
    window.location.replace('/login')
  }
  
  // plantlist 가져오는 함수
  const fetchPlantList = async () => {
    axios({
      method: 'post',
      url: spring.plants.list(),
      headers: {
        'Authorization': `Bearer ${loginToken}`
      },
      data: {
        'page': pageNumber,
        'userSeq': userSeq
      }
    })
      .then((res) => {
        console.log(res.data)
        console.log(pageNumber)
        setPlantList([...plantList, res.data.plantDtoList])
        setPageNumber(prev => prev + 1)
        console.log(pageNumber)
      })
      .catch((err) => console.error(err))
  };

  // const fetchCollected = () => {
  //   axios({
  //     method: 'post',
  //     url: spring.plants.collected(),
  //     headers: {
  //       'Authorization': `Bearer ${loginToken}`
  //     },
  //     data: {
  //       'page': 1,
  //       'userSeq': userSeq
  //     }
  //   })
  //     .then(function (res) {
  //       console.log(res.data)
  //       setCollectedPlantList(res.data.plantDtoList)
  //     })
  //     .catch(function (err) {
  //       console.error(err)
  //     })
  // };

  // const fetchNotCollected = () => {
  //   axios({
  //     method: 'post',
  //     url: spring.plants.noncollected(),
  //     headers: {
  //       'Authorization': `Bearer ${loginToken}`
  //     },
  //     data: {
  //       'page': 1,
  //       'userSeq': userSeq
  //     }
  //   })
  //     .then(function (res) {
  //       console.log(res.data)
  //       setNonCollectedPlantList(res.data.plantDtoList)
  //     })
  //     .catch(function (err) {
  //       console.error(err)
  //     })
  // };

  // 곧바로 실행되는 것
  useEffect(() => {

    // userSeq 가져오는 함수

    axios({
      method: 'get',
      url: spring.user.getUser(),
      headers: {
        'Authorization': `Bearer ${loginToken}`
      }
    })
      .then(function (res) {
        console.log(res.data.body.user.userSeq);
        setUserSeq(res.data.body.user.userSeq);
      })
      .catch(function (err) {
        console.error(err)
      })
    
    fetchPlantList()
    // fetchCollected()
    // fetchNotCollected()
  })

  return (
    <div style={{
      width: 360,
      height: 800
    }}>
      <br />
      <h4>{JSON.stringify(plantList)}</h4>
    </div>
  )
}
export default PlantList;