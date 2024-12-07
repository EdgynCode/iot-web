import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import userReducer from "./slices/userSlice";
import { studentReducer } from "./slices/studentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    students: studentReducer,
  },
  devTools: true,
});
