import GroupService from "../services/group.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

// Tạo nhóm
export const createGroup = createAsyncThunk(
  "Group/CreateGroup",
  async ({ tenNhom, sessionId }, thunkAPI) => {
    try {
      const data = await GroupService.createGroup(tenNhom, sessionId);
      thunkAPI.dispatch(setMessage("Group created successfully!"));
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

// Lấy danh sách nhóm theo buổi học
export const getGroupsByClassSession = createAsyncThunk(
  "Group/GetGroupsByClassSession",
  async (sessionId, thunkAPI) => {
    try {
      const data = await GroupService.getGroupsByClassSession(sessionId);
      thunkAPI.dispatch(setMessage("Group data fetched successfully!"));
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

// Xóa nhóm
export const removeGroup = createAsyncThunk(
  "Group/RemoveGroup",
  async (groupId, thunkAPI) => {
    try {
      const data = await GroupService.removeGroup(groupId);
      thunkAPI.dispatch(setMessage("Group removed successfully!"));
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

// Thêm người học vào nhóm
export const addLearnersToGroup = createAsyncThunk(
  "Group/AddLearnersToGroup",
  async ({ groupId, members }, thunkAPI) => {
    try {
      const data = await GroupService.addLearnersToGroup(groupId, members);
      thunkAPI.dispatch(setMessage("Learners added to group successfully!"));
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
