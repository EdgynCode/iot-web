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

export const addPermission = createAsyncThunk(
  "Role/AddRole",
  async ({ name, value, description }, thunkAPI) => {
    try {
      const data = await RoleService.addPermission(name, value, description);
      thunkAPI.dispatch(setMessage("New permission added successfully!"));
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

export const getAllPermissions = createAsyncThunk(
  "Role/GetAllPermissions",
  async (_, thunkAPI) => {
    try {
      const data = await RoleService.getAllPermissions();
      thunkAPI.dispatch(setMessage("Permission data fetched successfully!"));
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

export const updatePermission = createAsyncThunk(
  "Role/UpdateRole",
  async ({ id, name, value }, thunkAPI) => {
    try {
      const data = await RoleService.updatePermission(id, name, value);
      thunkAPI.dispatch(setMessage("Permission updated successfully!"));
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
