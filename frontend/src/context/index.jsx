import { createContext, useReducer } from 'react';
import {
  ADD_POSTS,
  CHANGE_USER_INFO,
  NOW_POST,
  GET_DARK_MODE,
} from './actionTypes';

const initialState = {
  user: null,
  posts: [],
  post: null,
  darkMode: window.localStorage.getItem('bgMode') === 'dark' ? true : false,
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
    case NOW_POST:
      return {
        ...state,
        post: action.payload,
      };
    case GET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
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
