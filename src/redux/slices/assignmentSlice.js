import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAssignments,
  getAssignmentsByClassId,
} from "../actions/assignmentAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const assignmentReducer = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAssignmentsByClassId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssignmentsByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAssignmentsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = assignmentReducer;
export default reducer;
