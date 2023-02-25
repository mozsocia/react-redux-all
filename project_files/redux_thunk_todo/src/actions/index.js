import ActionTypes from '../constants/ActionTypes';
import * as api from '../services/api';

export const addTodo = (text) => ({
  type: ActionTypes.ADD_TODO,
  payload: {
    text,
  },
});

export const toggleTodo = (id) => ({
  type: ActionTypes.TOGGLE_TODO,
  payload: {
    id,
  },
});

export const deleteTodo = (id) => ({
  type: ActionTypes.DELETE_TODO,
  payload: {
    id,
  },
});

export const setTodos = (todos) => ({
  type: ActionTypes.SET_TODOS,
  payload: {
    todos,
  },
});

export const fetchTodos = () => async (dispatch) => {
  try {
    const todos = await api.fetchTodos();
    dispatch(setTodos(todos));
  } catch (error) {
    console.error(error);
  }
};
