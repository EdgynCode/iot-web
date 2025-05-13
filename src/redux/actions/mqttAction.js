import MQTTService from "../services/mqtt.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const connectToBroker = createAsyncThunk(
  "ConfigBroker/Connect",
  async ({ brokerIp, port, username, password }, thunkAPI) => {
    try {
      const request = await MQTTService.connectToBroker(
        brokerIp,
        port,
        username,
        password
      );
      thunkAPI.dispatch(setMessage("Connected to broker successfully!"));
      return request;
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

export const brokerConfig = createAsyncThunk(
  "ConfigBroker/SetConfig",
  async ({ deviceNumber, name, packetNumber, data }, thunkAPI) => {
    try {
      const request = await MQTTService.brokerConfig(
        deviceNumber,
        name,
        packetNumber,
        data
      );
      thunkAPI.dispatch(setMessage("Broker configured successfully!"));
      return request;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to modify broker config";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
