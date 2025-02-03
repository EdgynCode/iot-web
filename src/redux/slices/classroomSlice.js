import { createSlice } from "@reduxjs/toolkit";
import {
  addNewClassroom,
  getAllClassrooms,
  updateClassroom,
  removeClassroom,
} from "../actions/classroomAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const classroomReducer = createSlice({
  name: "classrooms",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllClassrooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClassrooms.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAllClassrooms.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addNewClassroom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewClassroom.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewClassroom.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateClassroom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClassroom.fulfilled, (state, action) => {
        state.data = state.data.map((classroom) =>
          classroom.id === action.payload.id ? action.payload : classroom
        );
        state.loading = false;
      })
      .addCase(updateClassroom.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeClassroom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeClassroom.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (classroom) => classroom.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(removeClassroom.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const { reducer } = classroomReducer;
export default reducer;
