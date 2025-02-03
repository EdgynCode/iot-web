import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/user.service.js";
import { setMessage } from "../slices/message.js";

export const listAllUsersByType = createAsyncThunk(
  "User/ListAllUsers",
  async (userType, thunkAPI) => {
    try {
      const users = await UserService.listAllUsersByType(userType);
      return users;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user data";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "User/DeleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await UserService.deleteUser(id);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete user";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
