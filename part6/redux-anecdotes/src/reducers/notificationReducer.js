import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return initialState;
    },
  },
});

export default notificationSlice.reducer;
export const { showNotification, clearNotification } =
  notificationSlice.actions;
