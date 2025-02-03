import LessonService from "../services/lesson.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const createLesson = createAsyncThunk(
  "Lesson/CreateLesson",
  async (
    {
      id,
      lopHocId,
      nguoiDayId,
      startTime,
      endTime,
      wifiHotspot,
      brokerAddress,
      port,
      clientId,
      labIds,
    },
    thunkAPI
  ) => {
    try {
      const data = await LessonService.createLesson(
        id,
        lopHocId,
        nguoiDayId,
        startTime,
        endTime,
        wifiHotspot,
        brokerAddress,
        port,
        clientId,
        labIds
      );
      thunkAPI.dispatch(setMessage("New lesson created successfully!"));
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

export const getAllLessons = createAsyncThunk(
  "Lesson/GetAllLessons",
  async (_, thunkAPI) => {
    try {
      const data = await LessonService.getAllLessons();
      thunkAPI.dispatch(setMessage("Lesson data fetched successfully!"));
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

export const getLessonDetails = createAsyncThunk(
  "Classroom/RemoveClassRoom",
  async (id, thunkAPI) => {
    try {
      const data = await LessonService.getLessonDetails(id);
      thunkAPI.dispatch(setMessage("Lesson data fetched successfully!"));
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

export const updateLesson = createAsyncThunk(
  "Lesson/UpdateLesson",
  async (
    {
      id,
      lopHocId,
      nguoiDayId,
      wifiHotspot,
      brokerAddress,
      port,
      clientId,
      labIds,
    },
    thunkAPI
  ) => {
    try {
      const data = await LessonService.updateLesson(
        id,
        lopHocId,
        nguoiDayId,
        wifiHotspot,
        brokerAddress,
        port,
        clientId,
        labIds
      );
      thunkAPI.dispatch(setMessage("Lesson updated successfully!"));
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

export const deleteLesson = createAsyncThunk(
  "Lesson/DeleteLesson",
  async (id, thunkAPI) => {
    try {
      const data = await LessonService.deleteLesson(id);
      thunkAPI.dispatch(setMessage("Lesson deleted successfully!"));
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
