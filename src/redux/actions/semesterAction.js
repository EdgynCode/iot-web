import SemesterService from "../services/semester.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const createSemester = createAsyncThunk(
  "Semester/CreateSemester",
  async ({ tenHocKy, nameHoc, notes }, thunkAPI) => {
    try {
      const semester = await SemesterService.createSemester(
        tenHocKy,
        nameHoc,
        notes
      );
      thunkAPI.dispatch(setMessage("New semester created successfully!"));
      return semester;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create semester";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllSemesters = createAsyncThunk(
  "Semester/GetAllSemesters",
  async (_, thunkAPI) => {
    try {
      const semesters = await SemesterService.getAllSemesters();
      return semesters;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch semester data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSemester = createAsyncThunk(
  "Semester/UpdateSemester",
  async ({ id, tenHocKy, namHoc, notes }, thunkAPI) => {
    try {
      const semester = await SemesterService.updateSemester(
        id,
        tenHocKy,
        namHoc,
        notes
      );
      return semester;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update semester";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeSemester = createAsyncThunk(
  "Semester/RemoveSemester",
  async (id, thunkAPI) => {
    try {
      const semester = await SemesterService.removeSemester(id);
      return semester;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to remove semester";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
