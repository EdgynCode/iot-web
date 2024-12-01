import { createAsyncThunk } from "@reduxjs/toolkit";
import LearnerService from "../services/learner.service.js";
import { setMessage } from "../slices/message.js";

export const createMultipleLearner = createAsyncThunk(
  "Leaner/CreateLeaner",
  async (
    {
      id,
      firstName,
      lastName,
      gender,
      doB,
      userName,
      email,
      password,
      phoneNumber,
      moTa,
      chucVu,
      ghiChu,
      donViID,
      toGiangDay,
      khoi,
    },
    thunkAPI
  ) => {}
);
