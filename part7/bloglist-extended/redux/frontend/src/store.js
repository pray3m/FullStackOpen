import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: authReducer,
  },
});
