// redux-saga 를 통해 더 쉽게 api를 요청할 수 있도록 하는 redux loading 모듈 

import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
 요청을 위한 액션 타입을 payload로 설정합니다 (예: "sample/GET_POST")
*/

export const startLoading = createAction(
  START_LOADING,
  requestType => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  requestType => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false
    })
  },
  initialState
);

export default loading;
