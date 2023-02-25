export const fetchTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data.slice(0, 10).map((todo) => ({
    id: todo.id,
    text: todo.title,
    completed: todo.completed,
  }));
};
