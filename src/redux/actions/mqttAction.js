import MQTTService from "../services/mqtt.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const connectToBroker = createAsyncThunk(
  "ConfigBroker/Connect",
  async ({ brokerIp, port, username, password }, thunkAPI) => {
    try {
      const data = await MQTTService.connectToBroker(
        brokerIp,
        port,
        username,
        password
      );
      thunkAPI.dispatch(setMessage("Connected to broker successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to connect to broker";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
