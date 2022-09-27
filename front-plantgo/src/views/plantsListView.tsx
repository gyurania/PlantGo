import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";


function PlantList() {

  const TOTAL_PAGES = 419;

  // useState, useRef, useInview
  const [userSeq, setUserSeq] = useState(0);
  const [plantList, setPlantList] = useState<any>([]);
  const [endPage, setEndPage] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true)
  const [lastElement, setLastElement] = useState<any>(null);
  // const [collectedPlantList, setCollectedPlantList] = useState([]);
  // const [nonCollectedPlantList, setNonCollectedPlantList] = useState([]);

  // Login key

  let loginToken = sessionStorage.getItem('loginToken')

  // 로그인 안되어 있으면 로그인 화면으로 보내기

  if (!loginToken) {
    window.location.replace('/login')
  }

  // observer

  const observer = useRef(
    new IntersectionObserver(
        (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setPage((no) => no + 1);
            }
        })
  );

  // userSeq get
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
  
  // plantlist
  const fetchPlantList = () => {
    
    setLoading(true)
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
      let all:any = new Set([...plantList, ...res.data.plantDtoList]);
      console.log(res.data)
      setPlantList([...all]);
      console.log(page)
      setLoading(false);
    })
    .catch((err) => {
      console.error(err)
    })
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

  // 곧바로 실행되는 것(최초 1회)
  useEffect(() => {
    if (page <= TOTAL_PAGES) {
        fetchPlantList();
    }
  }, [page]);
  
  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
        currentObserver.observe(currentElement);
    }

    return () => {
        if (currentElement) {
            currentObserver.unobserve(currentElement);
        }
    };
  }, [lastElement]);

  const UserCard = (data:any) => {
    return (
        <div className='p-4 border border-gray-500 rounded bg-white flex items-center'>
            <div className='ml-3'>
                <p className='text-base font-bold'>
                  {data.korName}
                </p>
            </div>
        </div>
      );
  };
  
    return (
      <div className='mx-44 bg-gray-100 p-6'>
          <h1 className='text-3xl text-center mt-4 mb-10'>All Plants</h1>
          <div className='grid grid-cols-3 gap-4'>
              {plantList.length > 0 ?
                  plantList.map((plant:any, i:number) => {
                      return i === plantList.length - 1 &&
                          !loading &&
                          page <= TOTAL_PAGES ? (
                          <div
                              key={`${plant.korName}-${i}`}
                              ref={setLastElement}
                          >
                              <UserCard data={plant} />
                          </div>
                      ) : (
                          <UserCard
                              data={plant}
                              key={`${plant.korName}-${i}`}
                          />
                      );
                  }): <></>}
          </div>
          {loading && <p className='text-center'>loading...</p>}

          {page - 1 === TOTAL_PAGES && (
              <p className='text-center my-10'>♥</p>
          )}
      </div>
  );
}
      
export default PlantList;