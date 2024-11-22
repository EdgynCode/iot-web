import axios from "axios";

const API_URL = "http://localhost:5064/api/";

const register = async (
  id,
  firstName,
  lastName,
  gender,
  doB,
  userName,
  email,
  password,
  phoneNumber
) => {
  try {
    const response = await axios.post(API_URL + "Account/Register", {
      id,
      firstName,
      lastName,
      gender,
      doB,
      userName,
      email,
      password,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const login = async (userName, password) => {
  const response = await axios.post(API_URL + "Account/Login", {
    userName,
    password,
  });
  if (response.data) {
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
    return response.data;
  }
  return null;
};

const updateUserInfo = async (userData) => {
  const response = await axios.put(API_URL + "User/UpdateUserInfo", userData);
  return response.data;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserInfo,
};

export default AuthService;
