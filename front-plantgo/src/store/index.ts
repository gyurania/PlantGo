import { configureStore, combineReducers } from "@reduxjs/toolkit";

// State

const store = configureStore(storage)

const initialState = {
  plantsmarks : {},
  user : {},
}

// Actions
const GET_USER_INFO = 'GET_USER_INFO';
export const getuesrinfo = (text:string) => {
  return {
    type: GET_USER_INFO,
    text
  }
}

// Reducer

// 리듀서 = (상태, 액션) {
  // 액션 타입 분석
  // 이전 상태 → 다음 상태로 교체
  // 다음 상태 반환
