import RoleService from "../services/role.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const addRole = createAsyncThunk(
  "Role/AddRole",
  async ({ id, name }, thunkAPI) => {
    try {
      const data = await RoleService.addRole(id, name);
      thunkAPI.dispatch(setMessage("New role added successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllRoles = createAsyncThunk(
  "Role/GetAllRoles",
  async (_, thunkAPI) => {
    try {
      const data = await RoleService.getAllRoles();
      thunkAPI.dispatch(setMessage("Role data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateRole = createAsyncThunk(
  "Role/UpdateRole",
  async ({ id, name }, thunkAPI) => {
    try {
      const data = await RoleService.updateRole(id, name);
      thunkAPI.dispatch(setMessage("Role updated successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "Role/DeleteRole",
  async (id, thunkAPI) => {
    try {
      const data = await RoleService.deleteRole(id);
      thunkAPI.dispatch(setMessage("Role deleted successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRolesByUserId = createAsyncThunk(
  "Role/GetRolesByUserId",
  async (userId, thunkAPI) => {
    try {
      const data = await RoleService.getRolesByUserId(userId);
      thunkAPI.dispatch(setMessage("Roles fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
