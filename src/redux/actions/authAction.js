import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service.js";
import { setMessage } from "../slices/message.js";
import { jwtDecode } from "jwt-decode";

export const register = createAsyncThunk(
  "Account/register",
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
      discriminator,
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
        discriminator
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
      const decodedToken = jwtDecode(data.jwtAccessToken);
      const role = decodedToken.role;
      return { user: data, roles: role };
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

export const sendLinkResetPassword = createAsyncThunk(
  "Account/SendEmailResetPassword",
  async ({ email, clientUri }, thunkAPI) => {
    try {
      const request = await AuthService.sendLinkResetPassword(email, clientUri);
      thunkAPI.dispatch(setMessage("Reset password email sent successfully!"));
      return request;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send reset password email.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "Account/ResetPassword",
  async ({ password, confirmPassword, token, email }, thunkAPI) => {
    try {
      const data = await AuthService.resetPassword(
        password,
        confirmPassword,
        token,
        email
      );
      thunkAPI.dispatch(setMessage("Password reset successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateRole = createAsyncThunk(
  "Account/EditRoles",
  async ({ username, role }, thunkAPI) => {
    try {
      const data = await AuthService.updateRole(username, role);
      thunkAPI.dispatch(setMessage("Role updated successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update role.";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
