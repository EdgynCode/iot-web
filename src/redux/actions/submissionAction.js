import SubmissionService from "../services/submission.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const getStudentSubmissions = createAsyncThunk(
  "Submission/GetSubmissionsByStudent",
  async (_, thunkAPI) => {
    try {
      const data = await SubmissionService.getStudentSubmissions();
      thunkAPI.dispatch(setMessage("Submission data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubmissionsByAssignment = createAsyncThunk(
  "Submission/GetSubmissionsByAssignmentId",
  async (_, thunkAPI) => {
    try {
      const data = await SubmissionService.getStudentSubmissions();
      thunkAPI.dispatch(setMessage("Submission data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
