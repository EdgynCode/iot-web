import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import userReducer from "./slices/userSlice";
import studentReducer from "./slices/studentSlice";
import experimentReducer from "./slices/experimentSlice";
import labReducer from "./slices/labSlice";
import deviceTypeReducer from "./slices/deviceTypeSlice";
import deviceReducer from "./slices/deviceSlice";
import classroomReducer from "./slices/classroomSlice";
import semesterReducer from "./slices/semesterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    students: studentReducer,
    experiments: experimentReducer,
    labs: labReducer,
    devicetypes: deviceTypeReducer,
    devices: deviceReducer,
    classrooms: classroomReducer,
    semesters: semesterReducer,
  },
  devTools: true,
});
