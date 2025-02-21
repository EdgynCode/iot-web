import ClassroomService from "../services/classroom.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const addNewClassroom = createAsyncThunk(
  "Classroom/AddNewClassRoom",
  async (tenLop, thunkAPI) => {
    try {
      const data = await ClassroomService.addNewClassroom(tenLop);
      thunkAPI.dispatch(setMessage("New classroom added successfully!"));
      return data;
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

export const getAllClassrooms = createAsyncThunk(
  "Classroom/GetAllClassRooms",
  async (_, thunkAPI) => {
    try {
      const data = await ClassroomService.getAllClassrooms();
      thunkAPI.dispatch(setMessage("Classroom data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClassesByTeacherId = createAsyncThunk(
  "Classroom/GetClassroomsByTeacherId",
  async (teacherId, thunkAPI) => {
    try {
      const data = await ClassroomService.getClassesByTeacherId(teacherId);
      thunkAPI.dispatch(setMessage("Classroom data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeClassroom = createAsyncThunk(
  "Classroom/RemoveClassRoom",
  async (id, thunkAPI) => {
    try {
      const data = await ClassroomService.removeClassroom(id);
      thunkAPI.dispatch(setMessage("Classroom removed successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateClassroom = createAsyncThunk(
  "Classroom/UpdateClassRoom",
  async ({ id, hocKyID, tenLop }, thunkAPI) => {
    try {
      const data = await ClassroomService.updateClassroom(id, hocKyID, tenLop);
      thunkAPI.dispatch(setMessage("Classroom updated successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
