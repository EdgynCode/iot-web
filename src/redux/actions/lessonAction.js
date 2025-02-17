import LessonService from "../services/lesson.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const createClassSession = createAsyncThunk(
  "Classroom/CreateClassSession",
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
      const data = await LessonService.createClassSession(
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
      thunkAPI.dispatch(setMessage("Class session created successfully!"));
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

export const getAllClassSessions = createAsyncThunk(
  "Classroom/GetAllClassSessions",
  async (_, thunkAPI) => {
    try {
      const data = await LessonService.getAllClassSessions();
      thunkAPI.dispatch(setMessage("Class sessions fetched successfully!"));
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

export const getClassSessionDetails = createAsyncThunk(
  "Classroom/GetClassSessionDetails",
  async (sessionID, thunkAPI) => {
    try {
      const data = await LessonService.getClassSessionDetails(sessionID);
      thunkAPI.dispatch(
        setMessage("Class session details fetched successfully!")
      );
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

export const deleteClassSession = createAsyncThunk(
  "Classroom/DeleteClassSession",
  async (sessionID, thunkAPI) => {
    try {
      const data = await LessonService.deleteClassSession(sessionID);
      thunkAPI.dispatch(setMessage("Class session deleted successfully!"));
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

export const updateClassSession = createAsyncThunk(
  "Classroom/UpdateClassSession",
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
      const data = await LessonService.updateClassSession(
        id,
        lopHocId,
        nguoiDayId,
        wifiHotspot,
        brokerAddress,
        port,
        clientId,
        labIds
      );
      thunkAPI.dispatch(setMessage("Class session updated successfully!"));
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
