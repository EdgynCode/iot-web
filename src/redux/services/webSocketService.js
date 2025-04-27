class WebSocketService {
  constructor() {
    this.socket = null;
    this.url = null;
    this.messageHandler = null;
  }

  connect(url) {
    this.url = url;
    this.socket = new WebSocket(process.env.REACT_SOCKET_URL + url);

    this.socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    this.socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      if (this.messageHandler) {
        this.messageHandler(event.data);
      }
    };

    this.socket.onclose = (event) => {
      console.log("WebSocket connection closed", event);
      if (event.code !== 1000) {
        // Reconnect if not closed normally
        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  setMessageHandler(handler) {
    this.messageHandler = handler;
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error(
        "WebSocket is not open. Ready state:",
        this.socket.readyState
      );
    }
  }

  close() {
    if (this.socket) {
      this.socket.close(1000, "Normal Closure");
    }
  }

  reconnect() {
    console.log("Reconnecting WebSocket...");
    setTimeout(() => {
      this.connect(this.url);
    }, 5000); // Reconnect after 5 seconds
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;

export const handleWebSocketError = (error) => {
  console.error("WebSocket error:", error);
  throw error;
};
