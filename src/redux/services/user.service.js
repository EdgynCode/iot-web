import axiosInstance from "./axiosInstance";

const listAllUsersByType = async (usertype) => {
  try {
    const response = await axiosInstance.get(
      `User/ListAllUsers?usertype=${usertype}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error listing all users:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`User/DeleteUser?userid=${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(
      `User/GetUserDetails?userid=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user detail:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const UserService = {
  listAllUsersByType,
  deleteUser,
  getUserDetails,
};

export default UserService;
