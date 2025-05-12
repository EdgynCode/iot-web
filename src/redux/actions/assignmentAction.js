import AssignmentService from "../services/assignment.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const createAssignment = createAsyncThunk(
  "Assignment/CreateAssignment",
  async (formData, thunkAPI) => {
    try {
      const response = await AssignmentService.createAssignment(formData);
      thunkAPI.dispatch(setMessage("New assignment created successfully!"));
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllAssignments = createAsyncThunk(
  "Assignment/GetAllAssignments",
  async (_, thunkAPI) => {
    try {
      const data = await AssignmentService.getAllAssignments();
      thunkAPI.dispatch(setMessage("Assignment data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAssignmentsByClassId = createAsyncThunk(
  "Assignment/GetAssignmentsByClassId",
  async (classId, thunkAPI) => {
    try {
      const data = await AssignmentService.getAssignmentsByClassId(classId);
      thunkAPI.dispatch(setMessage("Assignment data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAssignment = createAsyncThunk(
  "Assignment/UpdateAssignment",
  async ({ id, title, description, dueDate, formFile }, thunkAPI) => {
    try {
      const data = await AssignmentService.updateAssignment(
        id,
        title,
        description,
        dueDate,
        formFile
      );
      thunkAPI.dispatch(setMessage("Assignment updated successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeAssignment = createAsyncThunk(
  "Assignment/RemoveAssignment",
  async (assigmentId, thunkAPI) => {
    try {
      const data = await AssignmentService.removeAssignment(assigmentId);
      thunkAPI.dispatch(setMessage("Assignment removed successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
