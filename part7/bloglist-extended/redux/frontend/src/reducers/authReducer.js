import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: "",
  username: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.name = "";
      state.token = "";
      state.username = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;