import React, { useEffect, useState } from "react";
import axios from "axios";
import spring from "../api/spring";
import TopNavBar from "../components/topNavBar";
import DownNavBar from "../components/downNavBar";
function PlantList() {

  // useState
  const loadMore = () => setPageNumber(prev => prev+1);
  const [userSeq, setUserSeq] = useState(0);
  const [plantList, setPlantList] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [collectedPlantList, setCollectedPlantList] = useState([])
  const [nonCollectedPlantList, setNonCollectedPlantList] = useState([])

  // Login key

  let loginToken:any = sessionStorage.getItem('loginToken')

  // 로그인 안되어 있으면 로그인 화면으로 보내부리기

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
    .then((res) => setPlantList({...plantList, ...res.data.plantDtoList}))
    .then(() => setLoading(true))
    .catch((err) => console.error(err))
  };

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
    
    // 수집한 식물 리스트 가져오는 함수

    axios({
      method: 'post',
      url: spring.plants.collected(),
      headers: {
        'Authorization': `Bearer ${loginToken}`
      },
      data: {
        'page': 1,
        'userSeq': userSeq
      }
    })
    .then(function (res) {
      console.log(res.data)
      setCollectedPlantList(res.data.plantDtoList)
    })
    .catch(function (err) {
      console.error(err)
    })

    // 미수집한 식물 리스트 가져오는 함수

    axios({
      method: 'post',
      url: spring.plants.noncollected(),
      headers: {
        'Authorization': `Bearer ${loginToken}`
      },
      data: {
        'page': 1,
        'userSeq': userSeq
      }
    })
    .then(function (res) {
      console.log(res.data)
      setNonCollectedPlantList(res.data.plantDtoList)
    })
    .catch(function (err) {
      console.error(err)
    })
  }, [pageNumber]);
  
  
  return (
    <div style={{
      width: 360,
      height: 800
      }}> 
      <br />
      <h1>{JSON.stringify(plantList)}</h1>
      <DownNavBar/>
    </div>
  )
};
export default PlantList;