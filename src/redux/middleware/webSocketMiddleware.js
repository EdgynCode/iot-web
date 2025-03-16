import webSocketService, {
  handleWebSocketError,
} from "../services/webSocketService";
import {
  webSocketConnect,
  webSocketDisconnect,
  webSocketMessageReceived,
} from "../actions/webSocketAction";

const webSocketMiddleware = (store) => (next) => (action) => {
  if (webSocketConnect.match(action)) {
    webSocketService.connect(action.payload);
    webSocketService.socket.onmessage = (event) => {
      store.dispatch(webSocketMessageReceived(event.data));
    };
    webSocketService.socket.onerror = (error) => {
      handleWebSocketError(error);
    };
  }

  if (webSocketDisconnect.match(action)) {
    webSocketService.close();
  }

  return next(action);
};

export default webSocketMiddleware;
