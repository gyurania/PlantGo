import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AltImg from './plantGO_logo_wot_rbg.png'
import Button from 'react-bootstrap/Button'
import { useLocation, useNavigate } from "react-router-dom";

function PlantList() {
  
  const navigate = useNavigate();

  const TOTAL_PAGES = 419;

  // useState, useRef, useInview
  const [plantList, setPlantList] = useState<any>([]);
  const [endPage, setEndPage] = useState<boolean>(true)
  const [wholePage, setWholePage] = useState<number>(1);
  const [collectedPage, setCollectedPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true)
  const [lastElement1, setLastElement1] = useState<any>(null);
  const [lastElement2, setLastElement2] = useState<any>(null);
  const [collectedPlantList, setCollectedPlantList] = useState<any>([]);
  const [collectedPlantPage, setCollectedPlantPage] = useState<number>(0);
  const [collectedPlantCount, setCollectedPlantCount] = useState<number>(0);
  const [nonCollectedPlantList, setNonCollectedPlantList] = useState<any>([]);
  const [watchMode, setWatchMode] = useState<number>(0);

  // Login key, userSeq

  let loginToken = sessionStorage.getItem('loginToken')
  let userSeq = sessionStorage.getItem('userSeq')

  // 로그인 안되어 있으면 로그인 화면으로 보내기

  if (!loginToken) {
    window.location.replace('/login')
  }

  // 모든 리스트 observer

  const observer1 = useRef(
    new IntersectionObserver(
        (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setWholePage((no) => no + 1);
            }
        })
  );

  // 모아놓은 식물 observer
  const observer2 = useRef(
    new IntersectionObserver(
        (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setCollectedPage((no) => no + 1);
            }
        })
  );
  
  // plantlist
  const fetchPlantList = async () => {
    
    setLoading(true)
    axios({
      method: 'post',
      url: spring.plants.list(),
      headers: {
        'Authorization': `Bearer ${loginToken}`,
      },
      data: {
        'page': wholePage,
        'userSeq': userSeq
      }
    })
    .then((res) => {
      let all:any = new Set([...plantList, ...res.data.plantDtoList]);
      setPlantList([...all]);
      setLoading(false);
      console.log(plantList)
    })
    .catch((err) => {
      console.error(err)
    })
  };

  // 모은 식물
  const fetchCollected = () => {
    setLoading(true)
    axios({
      method: 'post',
      url: "/api/plants/collected",
      headers: {
        'Authorization': `Bearer ${loginToken}`,
      },
      data: {
        'page': collectedPage,
        'userSeq': userSeq
      }
    })
      .then(function (res) {
        console.log(res.data)
        let all:any = new Set([...collectedPlantList, ...res.data.plantDtoList]);
        setCollectedPlantList([...all]);
        setCollectedPlantCount(res.data.totalCnt)
        setCollectedPlantPage(res.data.totalPage)
        setLoading(false)
      })
      .catch(function (err) {
        console.error(err)
      })
  };
  
  // // 아직 안 모은 식물
  // const fetchNotCollected = () => {
  //   axios({
  //     method: 'post',
  //     url: spring.plants.noncollected(),
  //     headers: {
  //       'Authorization': `Bearer ${loginToken}`
  //     },
  //     data: {
  //       'page': page,
  //       'userSeq': userSeq
  //     }
  //   })
  //     .then(function (res) {
  //       console.log(res.data)
  //       let all:any = new Set([...nonCollectedPlantList, ...res.data.plantDtoList]);
  //       setNonCollectedPlantList([...all]);
  //     })
  //     .catch(function (err) {
  //       console.error(err)
  //     })
  // };

  // 모든 리스트 페이지 불러오기
  useEffect(() => {
    if (wholePage <= TOTAL_PAGES) {
      fetchPlantList();
    }
  }, [wholePage]);
  
  // 모은 식물 리스트 페이지 불러오기

  useEffect(() => {
    if (collectedPage <= collectedPlantPage) {
      fetchCollected()
    }
  }, [collectedPage])

  
  // 모든 리스트 옵저버
  useEffect(() => {
    const currentElement = lastElement1;
    const currentObserver = observer1.current;

    if (currentElement) {
        currentObserver.observe(currentElement);
    }

    return () => {
        if (currentElement) {
            currentObserver.unobserve(currentElement);
        }
    };
  }, [lastElement1]);

  // Collected 옵저버
  useEffect(() => {
    const currentElement = lastElement2;
    const currentObserver = observer2.current;

    if (currentElement) {
        currentObserver.observe(currentElement);
    }

    return () => {
        if (currentElement) {
            currentObserver.unobserve(currentElement);
        }
    };
  }, [lastElement2]);

  let UserCard = (plant:any) => {
    if (plant.data.collected==false) {
      return (
          <Card>
              <Card.Img
                      src={plant.data.imgUrl}
                      variant="top"
                      alt={AltImg}
                      style={{width:50, height:50}}
                      onClick = {(e) => {navigate("/photocards", { state: plant.data });}}
                  />
              <Card.Body>
                  <Card.Title>{plant.data.korName}</Card.Title>
              </Card.Body>
          </Card>
        );
      } else {
        return (
          <Card>
              <Card.Img
                      src={plant.data.imgUrl}
                      variant="top"
                      alt={AltImg}
                      style={{width:50, height:50}}
                      onClick = {(e) => {navigate("/photocards", { state: plant.data });}}
                  />
              <Card.Body>
                  <Card.Title>{plant.data.korName}</Card.Title>
              </Card.Body>
          </Card>
        );
      }
  };
  
    return (
      <div className='mx-44 bg-gray-100 p-6'>
          <h1 className='text-3xl text-center mt-4 mb-10'>Plants Guide</h1>
          <h2>총 식물 수 : 4188</h2>
          <h2>모은 식물 수 : {collectedPlantCount}</h2>
          <Button onClick={() => {setWatchMode(0)}}>전체 식물 보기</Button>
          <Button onClick={() => {setWatchMode(1)}}>내가 모은 식물</Button>
          {/* <Button onClick={() => {setWatchMode(2)}}>내가 모으지 못한 식물</Button> */}
          
          {watchMode==0 && <div>
            <Row xs={2}>
                {plantList.length > 0 ? (
                    plantList.map((plant:any, i:number) => {
                      if(i === plantList.length - 1 &&
                        !loading && wholePage <= TOTAL_PAGES)
                        return (
                            <Col
                                key={`${plant.korName}-${i}`}
                                ref={setLastElement1}
                            >
                                <UserCard data={plant} key={`${plant.korName}-${i}`} />
                            </Col>
                        ) 
                      else 
                        return (
                            <Col>
                              <UserCard
                                  data={plant}
                                  key={`${plant.korName}-${i}`}
                              />
                            </Col>
                        )
              })) :<div>끝</div>}
            </Row>
            {loading && <p className='text-center'>loading...</p>}
            {wholePage - 1 === TOTAL_PAGES && (
                <p className='text-center my-10'>더 이상의 정보가 없습니다.</p>
            )}
          </div>}

          {watchMode==1 && <div>
            <Row xs={2}>
                {collectedPlantList.length > 0 ? (
                    collectedPlantList.map((plant:any, i:number) => {
                      if(i === collectedPlantList.length - 1 &&
                        !loading && collectedPage <= collectedPlantPage)
                        return (
                            <Col
                                key={`${plant.korName}-${i}`}
                                ref={setLastElement2}
                            >
                                <UserCard 
                                  data={plant}
                                  key={`${plant.korName}-${i}`}/>
                            </Col>
                        ) 
                      else 
                        return (
                            <Col>
                              <UserCard
                                  data={plant}
                                  key={`${plant.korName}-${i}`}
                              />
                            </Col>
                        )
              })) :<div>끝</div>}
            </Row>
            {loading && <p className='text-center'>loading...</p>}
            {collectedPage - 1 === collectedPlantPage && (
                <p className='text-center my-10'>더 이상의 정보가 없습니다.</p>
            )}
          </div>}
      </div>
  );
}
      
export default PlantList;
