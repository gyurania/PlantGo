import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spring from "../api/spring";
import { useNavigate } from "react-router-dom";


function PlantList() {

  const navigate = useNavigate();

  const TOTAL_PAGES = 419;

  // useState, useRef, useInview
  const [plantList, setPlantList] = useState<any>([]);
  const [endPage, setEndPage] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true)
  const [lastElement, setLastElement] = useState<any>(null);
  const [collectedPlantList, setCollectedPlantList] = useState([]);
  const [nonCollectedPlantList, setNonCollectedPlantList] = useState([]);

  // loginToken, userSeq

  let loginToken = sessionStorage.getItem('loginToken')
  let userSeq = sessionStorage.getItem("userSeq")

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
  // const getUserSeq = () => {
  //   axios({
  //     method: 'get',
  //     url: spring.user.getUser(),
  //     headers: {
  //       'Authorization': `Bearer ${loginToken}`
  //     }
  //   })
  //     .then(function (res) {
  //       console.log(res.data.body.user.userSeq);
  //       setUserSeq(res.data.body.user.userSeq);
  //     })
  //     .catch(function (err) {
  //       console.error(err)
  //     })
  // }
  
  // plantlist
  const fetchPlantList = async () => {
    
    setLoading(true)
    axios({
      method: 'post',
      url: "/api/plants",
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
      setPlantList([...all]);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err)
    })
  };

  // 모은 식물
  const fetchCollected = () => {
    axios({
      method: 'post',
      url: spring.plants.collected(),
      headers: {
        'Authorization': `Bearer ${loginToken}`
      },
      data: {
        'page': page,
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
  
  // 아직 안 모은 식물
  const fetchNotCollected = () => {
    axios({
      method: 'post',
      url: spring.plants.noncollected(),
      headers: {
        'Authorization': `Bearer ${loginToken}`
      },
      data: {
        'page': page,
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

  // 체크 후 실행
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

  let UserCard = (plant:any) => {
    return (
        <div className='p-4 border border-gray-500 rounded bg-white flex items-center'>
            <div>
                <img
                    src={plant.data.imgUrl}
                    className='w-16 h-16 rounded-full border-2 border-green-600'
                    alt='user'
                />
            </div>
            <div className='ml-3'>
                <p className='text-base font-bold'>{plant.data.korName}</p>
            </div>
        </div>
      );
  };
  
    return (
      <div className='mx-44 bg-gray-100 p-6'>
          <h1 className='text-3xl text-center mt-4 mb-10'>All Plants</h1>
          <div className='grid grid-cols-3 gap-4'>
              {plantList.length > 0 ? (
                  plantList.map((plant:any, i:number) => {
                    if(i === plantList.length - 1 &&
                      !loading &&
                      page <= TOTAL_PAGES)
                      return (
                          <div
                              key={`${plant.korName}-${i}`}
                              ref={setLastElement}
                          >
                              <UserCard data={plant} />
                          </div>
                      ) 
                    else 
                      return (
                          <UserCard
                            data={plant}
                            key={`${plant.korName}-${i}`}
                            onClick = {() => {navigate("/photocards", { state: { plantInfo: plant } });}}
                          />
                      )
            })) :<div>test</div>}
          </div>
          {loading && <p className='text-center'>loading...</p>}

          {page - 1 === TOTAL_PAGES && (
              <p className='text-center my-10'>♥</p>
          )}
      </div>
  );
}
      
export default PlantList;
