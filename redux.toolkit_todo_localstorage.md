Sure, here's a sample React Redux Todo app with file and folder structure. This app allows users to create and manage a list of todos.

### Folder Structure

```
/src
  /components
    TodoList.js
    TodoForm.js
    Todo.js
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
import React from 'react';
import Todo from './components/Todo';
import './App.css'
function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;


```

### components/TodoList.js

```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../features/todos/todoSlice';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;


```

### components/TodoForm.js

```js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    if (todoText.trim() === '') return;
    dispatch(addTodo(todoText))
    setTodoText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={todoText} onChange={e => setTodoText(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

```

### components/Todo.js

```js
import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = () => {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Todo;

```

### featues/todos/todostodoSlice.js

```js
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
  preloadedState: loadState(),
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