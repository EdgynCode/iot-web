import { createSlice } from "@reduxjs/toolkit";
import {
  getExperimentsByName,
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
