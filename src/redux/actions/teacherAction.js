import { createAsyncThunk } from "@reduxjs/toolkit";
import TeacherService from "../services/teacher.service.js";
import { setMessage } from "../slices/message.js";

export const assignTeachersToClass = createAsyncThunk(
  "Learner/AssignTeachersToClass",
  async ({ teachers, classId }, thunkAPI) => {
    try {
      const learner = await TeacherService.assignTeachersToClass(
        teachers,
        classId
      );
      thunkAPI.dispatch(setMessage("Teachers assigned successfully!"));
      return learner;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign teachers to class";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTeachersByClassId = createAsyncThunk({
  type: "Teacher/GetTeachersByClassId",
  payloadCreator: async (classId, thunkAPI) => {
    try {
      const teachers = await TeacherService.getTeachersByClassId(classId);
      return teachers;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch teacher data";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
});
