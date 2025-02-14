import { createAsyncThunk } from "@reduxjs/toolkit";
import LearnerService from "../services/learner.service.js";
import { setMessage } from "../slices/message.js";

export const createMultipleLearner = createAsyncThunk(
  "Leaner/CreateLearners",
  async (learners, thunkAPI) => {
    try {
      const learner = await LearnerService.createMultipleLearner(learners);
      thunkAPI.dispatch(setMessage("User updated successfully!"));
      return learner;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update user information";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const assignLearnerToClass = createAsyncThunk(
  "Learner/AssignLearnersToClass",
  async ({ learners, classId }, thunkAPI) => {
    try {
      const learner = await LearnerService.assignLearnerToClass(
        learners,
        classId
      );
      thunkAPI.dispatch(setMessage("Learners assigned successfully!"));
      return learner;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign learners to class";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLearnersByClassId = createAsyncThunk(
  "Learner/GetLearnersByClassId",
  async (classId, thunkAPI) => {
    try {
      const learners = await LearnerService.getLearnersByClassId(classId);
      return learners;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch learners";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
