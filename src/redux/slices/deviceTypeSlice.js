import { createSlice } from "@reduxjs/toolkit";
import { getAllDeviceTypes } from "../actions/deviceAction";

const deviceTypeReducer = createSlice({
  name: "devicetypes",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeviceTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDeviceTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllDeviceTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = deviceTypeReducer;
export default reducer;
