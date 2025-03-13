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
import lessonReducer from "./slices/lessonSlice";
import learnerReducer from "./slices/learnerSlice";
import teacherReducer from "./slices/teacherSlice";
import groupReducer from "./slices/groupSlice";
import webSocketReducer from "./slices/webSocketSlice";
import webSocketMiddleware from "./middleware/webSocketMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    students: studentReducer,
    experiments: experimentReducer,
    labs: labReducer,
    learners: learnerReducer,
    lessons: lessonReducer,
    devicetypes: deviceTypeReducer,
    devices: deviceReducer,
    classrooms: classroomReducer,
    semesters: semesterReducer,
    teachers: teacherReducer,
    groups: groupReducer,
    webSocket: webSocketReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(webSocketMiddleware),
  },
  devTools: true,
});
