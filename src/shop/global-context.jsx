import React, { useReducer } from "react";

export const GlobalContext = React.createContext();

const INITIAL_STATE = {
  user: null,
  isLoggedIn: false
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    case "UPDATE_USER":
      return { ...state, user: action.payload };
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const login = payload =>
    dispatch({
      type: "LOGIN",
      payload
    });

  const logout = () =>
    dispatch({
      type: "LOGOUT"
    });

  const updateUser = payload => dispatch({ type: "UPDATE_USER", payload });

  return <GlobalContext.Provider value={{ data: state, login, logout, updateUser }}>{children}</GlobalContext.Provider>;
};
