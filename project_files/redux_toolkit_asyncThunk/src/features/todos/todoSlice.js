// src/reducers/todos.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data.slice(0, 10);
});

let nextTodoId = 10093;

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    status: null,
    error : null,
    data:[]
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.data.push(action.payload);
      },
      prepare: text => ({
        payload: {
          id: nextTodoId++,
          title:text ,
          completed: false,
        },
      }),
    },
    toggleTodo: (state, action) => {
      const todo = state.data.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const index = state.data.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        // Set the loading state while fetching todos
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        // Replace the existing todos in the state with the fetched ones
        state.status = 'succeeded';
        state.data.splice(0, state.length, ...action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        // Set the error state if the fetch failed
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
