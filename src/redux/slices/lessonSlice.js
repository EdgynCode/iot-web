import { createSlice } from "@reduxjs/toolkit";
import {
  createLesson,
  getAllLessons,
  getLessonDetails,
  deleteLesson,
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
      .addCase(getAllLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAllLessons.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getLessonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLessonDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getLessonDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (device) => device.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const { reducer } = lessonReducer;
export default reducer;
