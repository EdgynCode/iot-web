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

const UserService = {
  listAllUsersByType,
};

export default UserService;
