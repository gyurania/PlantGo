import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 액시오스

function Test1() {
    const [id, setId] = useState(0);
   
    function stateTest() {
        setId(id+1)
    }
     useEffect(
       () => {
          alert("ok")
       
       }, []
       );


    function testAxios(){
        axios(
            {
              url: '/user/checkEmail.do',
              method: 'post',
              data: {
                email:'test@naver.com',aaa:'aaa222'
              } , 
             
              baseURL: 'http://localhost:8080',
              //withCredentials: true,
            }
          ).then(function (response) {
            console.log(response.data)
            console.log(response.data.JavaData[0].NICKNAME)
          });


    }    

    return (
        <div>
        test{id}
        <button  onClick={()=> stateTest()}>test</button>
        <button  onClick={()=> testAxios()}>axiosTest</button>
        </div>
    );
  }


  export default Test1;  