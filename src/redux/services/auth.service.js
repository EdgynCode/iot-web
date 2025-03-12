import axiosInstance from "./axiosInstance";

const register = async (
  id,
  firstName,
  lastName,
  gender,
  doB,
  userName,
  email,
  password,
  phoneNumber,
  discriminator
) => {
  try {
    const response = await axiosInstance.post(
      `Account/register?usertype=${discriminator}`,
      {
        id,
        firstName,
        lastName,
        gender,
        doB,
        userName,
        email,
        password,
        phoneNumber,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const login = async (userName, password) => {
  const response = await axiosInstance.post("Account/Login", {
    userName,
    password,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy token từ localStorage
    if (!storedUser?.jwtAccessToken) {
      throw new Error("No access token found for logout.");
    }

    // Gửi request logout với token
    const response = await axiosInstance.delete("Account/Logout", {
      headers: {
        Authorization: `Bearer ${storedUser.jwtAccessToken}`, // Gắn token vào header
      },
    });

    localStorage.removeItem("user"); // Xóa thông tin user
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.userId) {
    const response = await axiosInstance.get(
      `User/GetUserDetails?userid=${user.userId}`
    );
    return response.data;
  }
  return null;
};

const updateUserInfo = async (userData) => {
  const response = await axiosInstance.patch("User/UpdateUserInfo", userData);
  return response.data;
};

const sendLinkResetPassword = async (email, clientUri) => {
  try {
    const response = await axiosInstance.post(
      "Account/SendEmailResetPassword",
      {
        email,
        clientUri,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error sending reset password email:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const resetPassword = async (password, confirmPassword, token, email) => {
  try {
    const response = await axiosInstance.post("Account/ResetPassword", {
      password,
      confirmPassword,
      token,
      email,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateRole = async (username, role) => {
  try {
    const response = await axiosInstance.put(
      `Account/EditRoles?username=${username}`,
      { role }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating role:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserInfo,
  sendLinkResetPassword,
  resetPassword,
  updateRole,
};

export default AuthService;
