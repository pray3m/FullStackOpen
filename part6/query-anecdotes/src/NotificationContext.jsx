import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const showNotification = (content, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: content,
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, timeout);
  };
};

export default NotificationContext;
