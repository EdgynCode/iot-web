import { createSlice } from "@reduxjs/toolkit";
import { connectToBroker } from "../actions/mqttAction";

const initialState = {
  connected: false,
  brokerDetails: null,
  loading: false,
  error: null,
};

const mqttSlice = createSlice({
  name: "mqtt",
  initialState,
  reducers: {
    disconnect: (state) => {
      state.connected = false;
      state.brokerDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectToBroker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectToBroker.fulfilled, (state, action) => {
        state.connected = true;
        state.brokerDetails = action.payload;
        state.loading = false;
      })
      .addCase(connectToBroker.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { disconnect } = mqttSlice.actions;
export default mqttSlice.reducer;
