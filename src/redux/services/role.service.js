import { asyncThunkCreator } from "@reduxjs/toolkit";
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

const RoleService = {
  addRole,
  addPermission,
  updateRole,
  updatePermission,
  getAllRoles,
  getAllPermissions,
  deleteRole,
};

export default RoleService;
