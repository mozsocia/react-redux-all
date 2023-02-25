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
