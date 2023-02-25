// src/App.js
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

