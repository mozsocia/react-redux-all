import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { put, takeLatest, call, all } from 'redux-saga/effects';

const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

function fetchTodos() {
  return { type: FETCH_TODOS_REQUEST };
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

function todosReducer(state = { loading: false, error: null, todos: [] }, action) {
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

function* actionWatcher() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(todosReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.title}
        </div>
      ))}
    </div>
  );
}

function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppContainer;
