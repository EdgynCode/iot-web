import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service.js";
import { setMessage } from "../slices/message.js";

// export const register = createAsyncThunk(
//   "Account/Register",
//   async (
//     {
//       id,
//       firstName,
//       lastName,
//       gender,
//       doB,
//       userName,
//       email,
//       password,
//       phoneNumber,
//     },
//     thunkAPI
//   ) => {
//     try {
//       const data = await AuthService.register(
//         id,
//         firstName,
//         lastName,
//         gender,
//         doB,
//         userName,
//         email,
//         password,
//         phoneNumber
//       );
//       return { user: data };
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "Account/Login",
//   async ({ userName, password }, thunkAPI) => {
//     try {
//       const data = await AuthService.login(userName, password);
//       return { user: data };
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

// export const logout = createAsyncThunk("Account/Logout", async () => {
//   await AuthService.logout();
// });
