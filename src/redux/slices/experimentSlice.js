import { createSlice } from "@reduxjs/toolkit";
import {
  getExperimentsByName,
  getExperimentsByLabId,
  getAllExperiments,
} from "../actions/experimentAction.js";

const experimentSlice = createSlice({
  name: "experiments",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get by Name
      .addCase(getExperimentsByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExperimentsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getExperimentsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get by Lab Id
      .addCase(getExperimentsByLabId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExperimentsByLabId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getExperimentsByLabId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all
      .addCase(getAllExperiments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExperiments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllExperiments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = experimentSlice;
export default reducer;
