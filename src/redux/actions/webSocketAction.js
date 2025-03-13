import { createAction } from "@reduxjs/toolkit";

export const webSocketConnect = createAction("webSocket/connect");
export const webSocketDisconnect = createAction("webSocket/disconnect");
export const webSocketMessageReceived = createAction(
  "webSocket/messageReceived"
);
