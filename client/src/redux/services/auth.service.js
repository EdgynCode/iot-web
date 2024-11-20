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
  register,
  login,
  logout,
};

export default AuthService;
