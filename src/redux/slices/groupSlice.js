import { createSlice } from "@reduxjs/toolkit";
import { getGroupsByClassSession } from "../actions/groupAction";

const groupReducer = createSlice({
  name: "groups",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupsByClassSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroupsByClassSession.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getGroupsByClassSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = groupReducer;
export default reducer;
