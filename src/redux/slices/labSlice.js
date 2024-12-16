import { createSlice } from "@reduxjs/toolkit";
import { getAllLabs } from "../actions/labAction";

const labSlice = createSlice({
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
      });
  },
});

const { reducer } = labSlice;
export default reducer;
