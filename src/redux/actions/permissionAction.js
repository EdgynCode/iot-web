import PermissionService from "../services/permission.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const addPermission = createAsyncThunk(
  "Role/AddPermission",
  async ({ name, value, description }, thunkAPI) => {
    try {
      const data = await PermissionService.addPermission(
        name,
        value,
        description
      );
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

export const getAllPermissions = createAsyncThunk(
  "Role/GetAllPermissions",
  async (_, thunkAPI) => {
    try {
      const data = await PermissionService.getAllPermissions();
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

export const updatePermission = createAsyncThunk(
  "Role/UpdatePermission",
  async ({ id, name, value }, thunkAPI) => {
    try {
      const data = await PermissionService.updatePermission(id, name, value);
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

export const deletePermission = createAsyncThunk(
  "Role/DeletePermission",
  async (id, thunkAPI) => {
    try {
      const data = await PermissionService.deletePermission(id);
      thunkAPI.dispatch(setMessage("Permission deleted successfully!"));
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
