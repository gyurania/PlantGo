![Untitled](readmeimg/plantgo1.png)

<br>

# 🌿 Plant Go! 🌿

- 나만의 식물도감 및 수집 서비스
- 삼성청년SW아카데미 7기 서울 특화 7반 A703 특화 프로젝트(빅데이터 분산)

<br>

# 🗓 프로젝트 기간

- 2022년 8월 22일 ~ 2022년 10월 07일

<br>

# 🛠 프로젝트 팀원

- #### **류인영** (팀장/데이터 분산)
- #### **김규란** (팀원/CI&CD, 데이터 분산)
- #### **배현중** (팀원/백엔드)
- #### **이재익** (팀원/프론트)
- #### **최은우** (팀원/프론트)

<br>

# 💻 기술 스택

<br>
<img src ="https://img.shields.io/badge/framework-SpringBoot-green"></img>
<img src="https://img.shields.io/badge/Library-React-blue"> 
<img src ="https://img.shields.io/badge/database-MySQLDB-purple"></img>
<br>
<img src ="https://img.shields.io/badge/language-Java%2C%20JavaScript-blueviolet"></img>
<img src ="https://img.shields.io/badge/server-S3-orange"></img>
<img src ="https://img.shields.io/badge/server-Docker-blue"></img>
<img src ="https://img.shields.io/badge/server-Jenkins-red"></img>
<img src ="https://img.shields.io/badge/server-Nginx-green"></img>
<br>
<br>

<br>

# 🎮 협업툴

<br>
<img alt="Gitlab" src ="https://img.shields.io/badge/Gitlab-181717.svg?&style=for-the-badge&logo=Gitlab&logoColor=white"/>
<img alt="MatterMost" src ="https://img.shields.io/badge/MatterMost-blue.svg?&style=for-the-badge&logo=MatterMost&logoColor=white"/>
<img alt="Notion" src ="https://img.shields.io/badge/Notion-white.svg?&style=for-the-badge&logo=Notion&logoColor=black"/>
<img alt="Webex" src ="https://img.shields.io/badge/Webex-181717.svg?&style=for-the-badge&logo=Webex&logoColor=green"/>

### <a href="https://www.notion.so/PlantGo-da7d1513eb2648ebbeb1d3d08a08e572"> 🌿 Plant Go! 노션 링크 </a>

<br>

# ⚙ 시스템 아키텍처

![architecture](readmeimg/architecture.png)

<br>

# 🎞 프로젝트 설명

![Untitled](readmeimg/intro1.jpg)

![Untitled](readmeimg/intro2.jpg)

<br>

# 🎞 실행 화면

- Main page
  - 소셜 로그인 구현 (카카오톡, 구글, 네이버)

![main](readmeimg/GIF/main.png)

![login](readmeimg/GIF/login.gif)
<br>

- Map
  - 등록된 식물 마커 표시
  - 사진 조회
  - map 드래그, zoom in/out
  - 마커 클러스터링 구현

![map](readmeimg/GIF/map.gif)
<br>

- Camera & Plant Information
  - 식물 사진 촬영
  - Plant.id API를 이용한 식물 정보 제공
  - 식물 사진 등록

![camera](readmeimg/GIF/camera.gif)
<br>

- Plants Book
  - Collected/Uncollected 식물 조회
  - 무한스크롤 구현

![plantBook](readmeimg/GIF/plantBook.gif)
<br>

- Ranking
  - 클러스터 서버, Spark를 이용한 분산 처리
  - 회원별 수집한 식물 종류 갯수 카운트
  - 상위 30위 랭킹 조회
  - 3분 간격으로 랭킹 갱신

![ranking](readmeimg/GIF/ranking.gif)
<br>
