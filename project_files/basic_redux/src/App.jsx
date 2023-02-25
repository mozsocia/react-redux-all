import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {

  return (
    <div className="App">
  
      <h1>React Redux Todo App</h1>
      <TodoForm />
      <TodoList />
     
    </div>
  )
}

export default App
