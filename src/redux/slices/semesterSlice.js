import { createSlice } from "@reduxjs/toolkit";
import {
  createSemester,
  getAllSemesters,
  updateSemester,
  removeSemester,
} from "../actions/semesterAction";

const initialState = {
  data: [],
  years: [],
  semesters: [],
  loading: false,
  error: null,
};

const semesterReducer = createSlice({
  name: "semesters",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllSemesters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSemesters.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.data = action.payload;

          // Extract unique academic years
          const years = [...new Set(action.payload.map((s) => s.nameHoc))].map(
            (year) => ({
              key: year.toString(),
              label: year.toString(),
            })
          );

          // Format semester dropdown options
          const semesters = action.payload.map((s) => ({
            key: s.id.toString(),
            label: s.tenHocKy,
          }));

          state.years = years;
          state.semesters = semesters;
        } else {
          state.data = [];
          state.years = [];
          state.semesters = [];
        }
        state.loading = false;
      })
      .addCase(getAllSemesters.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSemester.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(createSemester.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSemester.fulfilled, (state, action) => {
        state.data = state.data.map((semester) =>
          semester.id === action.payload.id ? action.payload : semester
        );
        state.loading = false;
      })
      .addCase(updateSemester.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSemester.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (semester) => semester.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(removeSemester.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const { reducer } = semesterReducer;
export default reducer;
