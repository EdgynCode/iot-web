import { createSlice } from "@reduxjs/toolkit";
import { listAllUsersByType } from "../actions/userAction.js";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAllUsersByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAllUsersByType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listAllUsersByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = studentSlice;
export default reducer;
