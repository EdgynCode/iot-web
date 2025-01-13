import { createSlice } from "@reduxjs/toolkit";
import {
  addNewDevice,
  getAllDevices,
  removeDevice,
} from "../actions/deviceAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const deviceReducer = createSlice({
  name: "devices",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDevices.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAllDevices.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addNewDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewDevice.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewDevice.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDevice.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (device) => device.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(removeDevice.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const { reducer } = deviceReducer;
export default reducer;
