// src/store/reducers/todos.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      // return state.filter(todo => todo.id !== action.payload);
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    setTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setTodos } = todosSlice.actions;

export default todosSlice.reducer;

