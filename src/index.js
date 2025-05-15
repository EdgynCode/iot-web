import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider, App as AntApp } from "antd"; // Import AntApp từ antd
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(18, 72, 116)",
          },
        }}
      >
        {/* AntApp được sử dụng để bọc component App chính của bạn. 
            Nó cung cấp context cần thiết cho các phương thức static của Ant Design
            như message, notification, Modal.
        */}
        <AntApp>
          <App />
        </AntApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
