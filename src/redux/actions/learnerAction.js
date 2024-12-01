import { createAsyncThunk } from "@reduxjs/toolkit";
import LearnerService from "../services/learner.service.js";
import { setMessage } from "../slices/message.js";

export const createMultipleLearner = createAsyncThunk(
  "Leaner/CreateLeaner",
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
