import { createSlice } from "@reduxjs/toolkit";
import { getTeachersByClassId } from "../actions/teacherAction";

const teacherReducer = createSlice({
  name: "teachers",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeachersByClassId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeachersByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTeachersByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = teacherReducer;
export default reducer;
