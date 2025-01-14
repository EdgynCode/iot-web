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

export const addNewDevice = createAsyncThunk(
  "Device/AddNewDevice",
  async (
    {
      tenThietBi,
      donViId,
      serialNumber,
      maQR,
      moTa,
      ghiChu,
      isTrangThai,
      loaiThietBiID,
      thoiGianBaoHanh,
    },
    thunkAPI
  ) => {
    try {
      const device = await DeviceService.addNewDevice(
        tenThietBi,
        donViId,
        serialNumber,
        maQR,
        moTa,
        ghiChu,
        isTrangThai,
        loaiThietBiID,
        thoiGianBaoHanh
      );
      thunkAPI.dispatch(setMessage("New device added successfully!"));
      return device;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add new device";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeDevice = createAsyncThunk(
  "Device/RemoveDevice",
  async (deviceId, thunkAPI) => {
    try {
      const device = await DeviceService.removeDevice(deviceId);
      return device;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete device";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDevice = createAsyncThunk(
  "Device/UpdateDevice",
  async ({ id, tenThietBi, moTa, ghiChu }, thunkAPI) => {
    try {
      const device = await DeviceService.updateDevice(
        id,
        tenThietBi,
        moTa,
        ghiChu
      );
      return device;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update device";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllDevices = createAsyncThunk(
  "Device/GetAllDevices",
  async (_, thunkAPI) => {
    try {
      const devices = await DeviceService.getAllDevices();
      return devices;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch device data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDevicesByTypeId = createAsyncThunk(
  "Device/GetDevicesByTypeId",
  async (deviceTypeId, thunkAPI) => {
    try {
      const devices = await DeviceService.getDevicesByTypeId(deviceTypeId);
      return devices;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch device data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
