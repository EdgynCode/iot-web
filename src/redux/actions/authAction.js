import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service.js";
import { setMessage } from "../slices/message.js";

export const register = createAsyncThunk(
  "Account/Register",
  async (
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
      userType,
    },
    thunkAPI
  ) => {
    try {
      const data = await AuthService.register(
        id,
        firstName,
        lastName,
        gender,
        doB,
        userName,
        email,
        password,
        phoneNumber,
        userType
      );
      return { user: data };
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

export const login = createAsyncThunk(
  "Account/Login",
  async ({ userName, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(userName, password);
      return { user: data };
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

export const logout = createAsyncThunk("Account/Logout", async () => {
  await AuthService.logout();
});

export const getCurrentUser = createAsyncThunk(
  "User/GetUserDetails",
  async (_, thunkAPI) => {
    try {
      const user = await AuthService.getCurrentUser();
      return user; // Pass the user data to the fulfilled case
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "User/UpdateUserInfo",
  async (userData, thunkAPI) => {
    try {
      const updatedUser = await AuthService.updateUserInfo(userData);
      thunkAPI.dispatch(setMessage("User updated successfully!"));
      return updatedUser;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update user information";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
