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
