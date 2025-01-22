import { createAsyncThunk } from "@reduxjs/toolkit";
import ExperimentService from "../services/experiment.service.js";
import { setMessage } from "../slices/message.js";

export const createExperiment = createAsyncThunk(
  "Experiment/CreateExperiment",
  async (
    { tenThiNghiem, moTaThiNghiem, pathImage, ghiChu, labId },
    thunkAPI
  ) => {
    try {
      const learner = await ExperimentService.createExperiment(
        tenThiNghiem,
        moTaThiNghiem,
        pathImage,
        ghiChu,
        labId
      );
      thunkAPI.dispatch(setMessage("Experiment created successfully!"));
      return learner;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create experiment";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllExperiments = createAsyncThunk(
  "Experiment/GetAllExperiments",
  async (_, thunkAPI) => {
    try {
      const experiments = await ExperimentService.getAllExperiments();
      return experiments;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch experiment data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getExperimentsByName = createAsyncThunk(
  "Experiment/GetExperimentsByName",
  async (experimentName, thunkAPI) => {
    try {
      const experiments = await ExperimentService.getExperimentsByName(
        experimentName
      );
      return experiments;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch experiment data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getExperimentsByLabId = createAsyncThunk(
  "Experiment/GetExperimentsByLabId",
  async (labId, thunkAPI) => {
    try {
      const experiments = await ExperimentService.getExperimentsByLabId(labId);
      return experiments;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch experiment data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteExperiments = createAsyncThunk(
  "Experiment/DeleteExperiments",
  async (experimentIds, thunkAPI) => {
    try {
      const experiments = await ExperimentService.deleteExperiments(
        experimentIds
      );
      return experiments;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete experiments";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateExperiment = createAsyncThunk(
  "Experiment/UpdateExperiment",
  async (experimentData, thunkAPI) => {
    try {
      const experiments = await ExperimentService.updateExperiment(
        experimentData
      );
      return experiments;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update experiment";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
