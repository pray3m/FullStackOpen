/* eslint-disable indent */
import { createContext, useReducer } from "react";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, null);

  return <AuthContext.Provider value={[user, dispatch]}>{children}</AuthContext.Provider>;
};

export default AuthContext;
