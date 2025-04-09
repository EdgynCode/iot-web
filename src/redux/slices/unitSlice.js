import { createSlice } from "@reduxjs/toolkit";
import { getAllUnits } from "../actions/unitAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const unitReducer = createSlice({
  name: "units",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = unitReducer;
export default reducer;
