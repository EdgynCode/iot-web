import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  login,
  logout,
  updateUserInfo,
} from "../actions/authAction";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "Account",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
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
