import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const authService = {
  login: (body) => {
    return axiosInstance.post(`api/Account/Login`, JSON.stringify(body))
                        .then((response) => {
                          if (response.data.username) {
                            localStorage.setItem("user", JSON.stringify(response.data));
    }}},
};

export default authService;
