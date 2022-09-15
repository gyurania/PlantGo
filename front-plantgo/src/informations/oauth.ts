import { RESTAPI_CODE } from "./code";

// const BACK_URI = "http://localhost:8080/oauth2/authorization";
const REDIRECT_URI = "http://localhost:3000/oauth/redirect";


// export const KAKAO_AUTH_URL = `${BACK_URI}/kakao?redirect_uri=${REDIRECT_URI}`;
// export const NAVER_AUTH_URL = `${BACK_URI}/naver?redirect_uri=${REDIRECT_URI}`;
// export const GOOGLE_AUTH_URL = `${BACK_URI}/google?redirect_uri=${REDIRECT_URI}`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${RESTAPI_CODE}&redirect_uri=${REDIRECT_URI}&response_type=code`