const BACK_URI = "http://j7a703.p.ssafy.io:8080/oauth2/authorization";
const REDIRECT_URI = "https://j7a703.p.ssafy.io/oauth/redirect";

export const KAKAO_AUTH_URL = `${BACK_URI}/kakao?redirect_uri=${REDIRECT_URI}`;
export const NAVER_AUTH_URL = `${BACK_URI}/naver?redirect_uri=${REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = `${BACK_URI}/google?redirect_uri=${REDIRECT_URI}`;

// 바뀌는거 안보이겠지?
// 캐시 삭제후 재시도
// 원래대로돌려놓기
