import axios from "axios";

const mqttInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://10.0.0.170:8080/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default mqttInstance;
