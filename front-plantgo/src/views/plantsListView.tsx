import React, { useEffect, useState } from "react";
import axios from "axios";
import spring from "../api/spring";
import useIntersectionObserver from "../customHook/useIO";
import Card from 'react-bootstrap/Card'

function PlantList() {

  // useState
  const [userSeq, setUserSeq] = useState(0);
  const [plantList, setPlantList] = useState<any | any[]>([]);
  const [pageNumber, setPageNumber] = useState<any | any[]>(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [collectedPlantList, setCollectedPlantList] = useState([]);
  const [nonCollectedPlantList, setNonCollectedPlantList] = useState([]);

  // Loading 후 가져오기

  const getMorePlant = async () => {
    setIsLoaded(true);
    setPageNumber((prev: number) => prev + 1);
    console.log(pageNumber)
    fetchPlantList()
    setIsLoaded(false);
  }

  // interSection 콜백 함수

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && !isLoaded && (pageNumber !== 419)) {
      observer.unobserve(entry.target);
      getMorePlant();
      observer.observe(entry.target);
    }
  }

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
    onIntersect,
  });

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
        setPlantList([...plantList, ...res.data.plantDtoList])
      })
      .catch((err) => console.error(err))
  };

  const fetchCollected = async () => {
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
  };

  const fetchNotCollected = async () => {
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
  })

  useEffect(() => {
    
    fetchPlantList()
    fetchCollected()
    fetchNotCollected()
  })

  let parseData = JSON.parse(plantList)

  return (
    <div style={{
      width: 360,
      height: 800
    }}>
      <br />
      {parseData.map((item: any) => (
        <Card
          bg={'Light'}
          key={item}
          text={'dark'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Img variant="top" src={item.imgUrl} />
          <Card.Body>
            <Card.Title>{item.korName} Card Title </Card.Title>
          </Card.Body>
        </Card>
      ))};
      <div ref={setTarget}>{isLoaded && <h1>Loading..</h1>}</div>
    </div>
  )
}
export default PlantList;