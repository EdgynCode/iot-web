import { createAsyncThunk } from "@reduxjs/toolkit";
import DeviceService from "../services/device.service.js";
import { setMessage } from "../slices/message.js";

export const addNewDeviceType = createAsyncThunk(
  "DeviceType/AddNewDeviceType",
  async ({ tenLoaiThietBi, serialNumber, maQR, moTa, ghiChu }, thunkAPI) => {
    try {
      const deviceType = await DeviceService.addNewDeviceType(
        tenLoaiThietBi,
        serialNumber,
        maQR,
        moTa,
        ghiChu
      );
      thunkAPI.dispatch(setMessage("New device type added successfully!"));
      return deviceType;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create lab";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllDeviceTypes = createAsyncThunk(
  "DeviceType/GetAllDeviceTypes",
  async (_, thunkAPI) => {
    try {
      const deviceTypes = await DeviceService.getAllDeviceTypes();
      return deviceTypes;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch device type data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeDeviceType = createAsyncThunk(
  "DeviceType/RemoveDeviceType",
  async (deviceTypeId, thunkAPI) => {
    try {
      const deviceType = await DeviceService.removeDeviceType(deviceTypeId);
      return deviceType;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete device type";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
