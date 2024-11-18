import axios from "axios";

const API_URL = "http://localhost:5064/api/";

const login = async (userName, password) => {
  const response = await axios.post(API_URL + "Account/Login", {
    userName,
    password,
  });
  if (response.data && response.data.userId) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "Account/Logout");
  return response.data;
};

const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.userId) {
    const response = await axios.get(
      API_URL + `User/GetUserDetails?userid=${user.userId}`
    );
    console.log(response.data);
    return response.data;
  }
  return null;
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
