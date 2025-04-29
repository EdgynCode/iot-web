import axiosInstance from "./axiosInstance";

const addPermission = async (name, value, description) => {
  try {
    const response = await axiosInstance.post(`Role/AddPermission`, {
      name,
      value,
      description,
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

const addPermissionsToRole = async (permissions, roleName) => {
  try {
    const response = await axiosInstance.post(
      `Role/AddPermissionsToRole?roleIdOrName=${roleName}`,
      permissions
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding permission to role:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updatePermission = async (id, name, value) => {
  try {
    const response = await axiosInstance.patch(`Role/UpdatePermission`, {
      id,
      name,
      value,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating permission:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllPermissions = async () => {
  try {
    const response = await axiosInstance.get(`Role/GetAllPermissions`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching permission data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getPermissionsByRole = async (roleName) => {
  try {
    const response = await axiosInstance.get(
      `Role/GetPermissionsByRole?roleIdOrName=${roleName}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching permission data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const deletePermission = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `Role/DeletePermission?permissionId=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting permission:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const PermissionService = {
  addPermission,
  addPermissionsToRole,
  updatePermission,
  getAllPermissions,
  getPermissionsByRole,
  deletePermission,
};

export default PermissionService;
