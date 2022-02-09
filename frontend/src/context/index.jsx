import { createContext, useReducer } from 'react';
import { CHANGE_USER_INFO } from './actionTypes';

const initialState = {
  auth: {
    userInfo: null,
  },
};

const Context = createContext({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_INFO:
      return {
        ...state,
        auth: {
          ...state.auth,
          userInfo: action.payload,
        },
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
