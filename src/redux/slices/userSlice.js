import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../actions/userAction";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  data: [],
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
