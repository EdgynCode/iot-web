import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPermissions,
  getPermissionsByRole,
} from "../actions/permissionAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const permissionReducer = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPermissionsByRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPermissionsByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPermissionsByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = permissionReducer;
export default reducer;
