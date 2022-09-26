import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";
import DownNavBar from "../components/downNavBar";
function PlantList() {

  // useState
  const target = useRef();
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
    
    // 식물 도감 가져옴
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

    if(loading){
      //로딩되었을 때만 실행
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
          console.log('loadmore')
          //버튼에 도달했을 때 pageNumber를 1씩 증가시켜 데이터를 10개씩 더 보여줌.
        }
      });
      //옵져버 탐색 시작
      observer.observe(target.current);
      }
  }, [pageNumber]);
  
  
  return (
    <div style={{
      width: 360,
      height: 800
      }}> 
      <br />
      <h1>{JSON.stringify(plantList)}</h1>
      <button ref={target}>Load More</button>
      <DownNavBar/> 
    </div>
  )
};
export default PlantList;