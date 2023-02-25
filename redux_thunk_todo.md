
Sure, here's an example of a React Redux Todo App with React Hooks and Redux Hooks, using Redux Thunk for asynchronous API calls. I've included a suggested file and folder structure as well.

```
src/
  actions/
    index.js
  components/
    TodoForm.js
    TodoList.js
    TodoListItem.js
  constants/
    ActionTypes.js
  reducers/
    index.js
    todos.js
  services/
    api.js
  store/
    configureStore.js
  utils/
    index.js
  index.js
  App.js

```


**src/App.js**

```js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { fetchTodos } from './actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App;

```

**src/components/TodoForm.js**

```js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions';

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

```

**src/components/TodoList.js**

```js
import React from 'react';
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

```

**src/components/TodoListItem.js**

```js
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';

const TodoListItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoListItem;

```

----- 
#### redux setup 

**src/constants/ActionTypes.js**

```js
const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_TODOS: 'SET_TODOS',
};

export default ActionTypes;

```

**src/services/api.js**

```js
export const fetchTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data.slice(0, 10).map((todo) => ({
    id: todo.id,
    text: todo.title,
    completed: todo.completed,
  }));
};

```


**src/actions/index.js**

```js
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

```



**src/reducers/todos.js**

```js
import ActionTypes from '../constants/ActionTypes';

const initialState = [];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
        },
      ];

    case ActionTypes.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );

    case ActionTypes.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);

    case ActionTypes.SET_TODOS:
      return action.payload.todos;

    default:
      return state;
  }
};

export default todos;

```


**src/reducers/index.js**

```js
import { combineReducers } from 'redux';
import todos from './todos';

const rootReducer = combineReducers({
  todos,
});

export default rootReducer;

```
**src/store/configureStore.js**

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default configureStore;

```

**src/utils/index.js**

```js
export const formatTitle = (text) => text.charAt(0).toUpperCase() + text.slice(1);

```

**src/index.js**

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

This is just an example implementation of a Todo App using React, Redux, and Thunk. You may have to modify the code based on your requirements.
