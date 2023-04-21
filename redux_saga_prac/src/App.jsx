import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './store';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.title}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App
