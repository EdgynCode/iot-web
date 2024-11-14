import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
export const store = configureStore({
  reducer: {
    auth: authService,
  },
});
