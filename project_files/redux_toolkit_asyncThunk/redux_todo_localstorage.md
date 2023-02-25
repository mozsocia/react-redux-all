Sure, here's a sample React Redux Todo app with file and folder structure. This app allows users to create and manage a list of todos.

### Folder Structure

```
/src
  /actions
    index.js
  /components
    TodoList.js
    TodoForm.js
    Todo.js
  /reducers
    index.js
    todos.js
  /store
    index.js
  App.js
  index.js

```

### App.js

```js
import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div className="App">
      <h1>React Redux Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;

```

### TodoList.js

```js
import React from 'react';
import { useSelector } from 'react-redux';
import Todo from './Todo';

function TodoList() {
  const todos = useSelector(state => state.todos);

  return (
    <div>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;

```

### TodoForm.js

```js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions';

function TodoForm() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Todo"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;

```

### Todo.js

```js
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo } from '../actions';

function Todo({ todo }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </div>
  );
}

export default Todo;

```

### actions/index.js

```js
export const addTodo = text => ({
  type: 'ADD_TODO',
  payload: {
    id: Math.random(),
    text,
    completed: false
  }
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  payload: {
    id
  }
});

```

### reducers/index.js

```js
import { combineReducers } from 'redux';
import todos from './todos';

export default combineReducers({
  todos
});

```

### reducers/todos.js

```js
const initialState = [];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todos;

```

### store/index.js

```js
import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

export default store;

```


This creates a Redux store with `rootReducer` as the root reducer. You can then use this store in your `index.js` file to provide it to the rest of your app:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

This code uses the `Provider` component from `react-redux` to provide the Redux store to the rest of the app, and then renders the `App` component.