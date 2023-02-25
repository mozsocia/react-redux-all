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
