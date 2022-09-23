const BACK_URI = "http://j7a703.p.ssafy.io:8080/oauth2/authorization";
const REDIRECT_URI = "http://j7a703.p.ssafy.io:3000/oauth/redirect";

export const KAKAO_AUTH_URL = `${BACK_URI}/kakao?redirect_uri=${REDIRECT_URI}`;
export const NAVER_AUTH_URL = `${BACK_URI}/naver?redirect_uri=${REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = `${BACK_URI}/google?redirect_uri=${REDIRECT_URI}`;