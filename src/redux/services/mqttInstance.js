import axios from "axios";

const mqttInstance = axios.create({
  baseURL: "http://192.168.0.30:5000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default mqttInstance;
