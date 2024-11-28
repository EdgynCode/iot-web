import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  login,
  logout,
  updateUserInfo,
} from "../actions/authAction";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoggedIn: user ? true : false,
  user: user || null,
  roles: null,
};

const authSlice = createSlice({
  name: "Account",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.roles = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.roles = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.user = null;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
