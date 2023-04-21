import React, { useEffect } from 'react';
import { put, takeLatest, call, all } from 'redux-saga/effects';

const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export function fetchTodos() {
  return { type: FETCH_TODOS_REQUEST };
}



export function todosReducer(state = { loading: false, error: null, todos: [] }, action) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload };
    case FETCH_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


function* fetchTodosSaga() {
  try {
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos');
    const data = yield response.json();
    yield put({ type: FETCH_TODOS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, payload: error.message });
  }
}

function* actionWatcher() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}





