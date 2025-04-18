import { createSlice } from "@reduxjs/toolkit";
import { getAllRoles } from "../actions/roleAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const roleReducer = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = roleReducer;
export default reducer;
