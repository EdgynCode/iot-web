import { createSlice } from "@reduxjs/toolkit";
import {
  webSocketConnect,
  webSocketDisconnect,
  webSocketMessageReceived,
} from "../actions/webSocketAction";

const webSocketReducer = createSlice({
  name: "webSocket",
  initialState: {
    connected: false,
    messages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(webSocketConnect, (state) => {
        state.connected = true;
      })
      .addCase(webSocketDisconnect, (state) => {
        state.connected = false;
      })
      .addCase(webSocketMessageReceived, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

const { reducer } = webSocketReducer;
export default reducer;
