Sure, here's a sample React Redux Todo app with file and folder structure. This app allows users to create and manage a list of todos.

### Folder Structure

```
/src
  /features
    /todos
      todoSlice.js
  /app
    store.js
  App.js
  index.js

```

### App.js

```js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, fetchTodos } from './features/todos/todoSlice';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleAddTodo = e => {
    e.preventDefault();
    const text = e.target.elements.title.value.trim();
    // console.log(e.target.elements.todoEmail.value)
    if (text) {
      dispatch(addTodo(text));
      e.target.elements.title.value = '';
    }
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = id => {
    console.log(id)
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h1>Todos</h1>
      { todos.status == 'failed' && <p> Failed to load data</p>  }
      { todos.status == 'loading' && <p> loading  data</p>  }

      <form onSubmit={handleAddTodo}>
        <input type="text" name="title" placeholder="Add todo..." />
        {/* <input type="email" name="todoEmail" placeholder="Add email..." /> */}

        <button>Add</button>
      </form>
      <ul>
        {todos.data.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => handleToggleTodo(todo.id)}
          >
            {todo.title}{' '}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


```



### featues/todos/todostodoSlice.js

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data.slice(0, 10);
});

let nextTodoId = 10000;

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

```


### app/store.js

```js
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


```


This creates a Redux store with `rootReducer` as the root reducer. You can then use this store in your `index.js` file to provide it to the rest of your app:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

This code uses the `Provider` component from `react-redux` to provide the Redux store to the rest of the app, and then renders the `App` component.