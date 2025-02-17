import { createSlice } from "@reduxjs/toolkit";
import {
  createClassSession,
  getAllClassSessions,
  getClassSessionDetails,
  deleteClassSession,
} from "../actions/lessonAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const lessonReducer = createSlice({
  name: "lessons",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllClassSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClassSessions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAllClassSessions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getClassSessionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassSessionDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getClassSessionDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createClassSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClassSession.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(createClassSession.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteClassSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClassSession.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (device) => device.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteClassSession.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const { reducer } = lessonReducer;
export default reducer;
