import { createSlice } from "@reduxjs/toolkit";
import { getLearnersByClassId } from "../actions/learnerAction";

const learnerReducer = createSlice({
  name: "learners",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLearnersByClassId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLearnersByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLearnersByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = learnerReducer;
export default reducer;
