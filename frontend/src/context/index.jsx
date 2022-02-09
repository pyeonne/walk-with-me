import { createContext, useReducer } from 'react';
import { ADD_POSTS, CHANGE_USER_INFO } from './actionTypes';

const initialState = {
  user: null,
  posts: [],
};

const Context = createContext({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = [state, dispatch];
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
