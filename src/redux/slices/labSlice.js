import { createSlice } from "@reduxjs/toolkit";
import { getAllLabs, createLab, deleteLabs } from "../actions/labAction";

const labReducer = createSlice({
  name: "labs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLabs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLabs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllLabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLab.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(createLab.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLabs.fulfilled, (state, action) => {
        state.data.pop();
        state.loading = false;
      });
  },
});

const { reducer } = labReducer;
export default reducer;
