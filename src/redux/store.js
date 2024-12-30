import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import userReducer from "./slices/userSlice";
import studentReducer from "./slices/studentSlice";
import experimentSlice from "./slices/experimentSlice";
import labSlice from "./slices/labSlice";
import deviceTypeSlice from "./slices/deviceTypeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    students: studentReducer,
    experiments: experimentSlice,
    labs: labSlice,
    devicetypes: deviceTypeSlice,
  },
  devTools: true,
});
