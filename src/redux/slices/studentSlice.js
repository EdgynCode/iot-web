import { createSlice } from "@reduxjs/toolkit";
import { listAllUsersByType } from "../actions/userAction.js";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [], // This will hold your student data
    loading: false,
    error: null,
  },
  reducers: {}, // Add any synchronous reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(listAllUsersByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAllUsersByType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Replace the current data with fetched data
      })
      .addCase(listAllUsersByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const studentReducer = studentSlice.reducer;
