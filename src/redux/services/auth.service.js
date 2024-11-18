import axios from "axios";

const API_URL = "http://localhost:5064/api/";

const login = async (userName, password) => {
  const response = await axios.post(API_URL + "Account/Login", {
    userName,
    password,
  });
  if (response.data.userName) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "Account/Logout");
  return response.data;
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
