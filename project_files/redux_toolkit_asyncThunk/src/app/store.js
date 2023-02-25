import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todoSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (error) {
    console.log(error);
  }
};

const store = configureStore({
  reducer: {
    todos : todosReducer
  },
  // preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
