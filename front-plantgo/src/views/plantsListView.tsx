import React, { useEffect } from "react";
import axios from "axios";
import spring from "../api/spring";
import Bearer from "../components/bearer";

function PlantList() {
  let plantList:any = ''
  let userSeq:string = ''
  useEffect(() => {
    function getUserInfo() {
      const loginToken = sessionStorage.getItem('loginToken')
      axios.get(spring.user.getUser(), Bearer.headers)
        .then(function (res) {
          userSeq = res.data.userSeq
        })
        .catch(function (err) {
          console.error(err)
        });
    }
    function getPlantList(userSeq:string) {
      axios.post(spring.plants.list(), {
        userSeq: userSeq
      })
        .then(function (res) {
          plantList = res.data
        })
        .catch(function (err) {
          console.error(err)
        })
    }
  })
  return (
    <div>{plantList}</div>
  )
};

export default PlantList;