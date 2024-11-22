// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Lưu user vào localStorage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage khi logout
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
