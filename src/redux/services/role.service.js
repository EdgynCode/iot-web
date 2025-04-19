import axiosInstance from "./axiosInstance";

const addRole = async (id, name) => {
  try {
    const response = await axiosInstance.post(`Role/AddRole`, {
      id,
      name,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating role:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateRole = async (id, name) => {
  try {
    const response = await axiosInstance.patch(`Role/UpdateRole`, {
      id,
      name,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating role:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllRoles = async () => {
  try {
    const response = await axiosInstance.get(`Role/GetAllRoles`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching role data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const deleteRole = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `Role/DeleteRole?roleIdOrName=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting role:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getRolesByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `Role/GetRolesByUserId?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching account role:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const RoleService = {
  addRole,
  updateRole,
  getAllRoles,
  deleteRole,
  getRolesByUserId,
};

export default RoleService;
