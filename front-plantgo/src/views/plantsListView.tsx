import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import spring from "../api/spring";
import { useInView } from "react-intersection-observer"


function PlantList() {


  // useState, useRef, useInview
  
  const [userSeq, setUserSeq] = useState(0);
  const [plantList, setPlantList] = useState<any>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(1);
  const [ref, inView] = useInView();
  // const [collectedPlantList, setCollectedPlantList] = useState([]);
  // const [nonCollectedPlantList, setNonCollectedPlantList] = useState([]);

  // Login key

  let loginToken = sessionStorage.getItem('loginToken')

  // 로그인 안되어 있으면 로그인 화면으로 보내기

  if (!loginToken) {
    window.location.replace('/login')
  }

  const getUserSeq = () => {
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
  }
  
  // plantlist 가져오는 함수
  const fetchPlantList = useCallback(async () => {
    axios({
      method: 'post',
      url: spring.plants.list(),
      headers: {
        'Authorization': `Bearer ${loginToken}`
      },
      data: {
        'page': page,
        'userSeq': userSeq
      }
    })
      .then((res) => {
        console.log(res.data)
        setPlantList((plantList: any) => [...plantList, ...res.data.plantDtoList])
        setHasNextPage(res.data.plantDtoList.length === 10);
        if (res.data.plantDtoList.length) {
          page.current += 1;
        }
      })
      .catch((err) => console.error(err))
  }, []);

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

  // 곧바로 실행되는 것(최초 1회)
  useEffect(() => {
    // userSeq 가져오는 함수
    getUserSeq()
  }, [])

  // pageNumber에 변화 있으면 실행
  useEffect(() => {
    console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      fetchPlantList();
    }
  }, [fetchPlantList, hasNextPage, inView]);

  return (
    <div style={{
      width: 360,
      height: 800
    }}>
      <br/>
      <div style={{ position: 'relative' }}>
        {plantList?.map((plant: any) => (
          <div
            key={plant.plantId}
            style={{
              marginBottom: '1rem',
              border: '1px solid #000',
              padding: '8px',
              background: plant.id % 10 === 0 ? 'skyblue' : '',
            }}
          >
            <div>plantId: {plant.plantId}</div>
            <div>이름: {plant.korNameSn}</div>
            <img src={ plant.imgUrl } alt="" />
          </div>
        ))};
      </div>
      <div ref={ref} style={{ position: 'absolute', bottom: '100px' }} />
    </div>
  )
}
      
export default PlantList;