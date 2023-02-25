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


