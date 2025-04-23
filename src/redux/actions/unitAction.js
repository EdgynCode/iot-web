import UnitService from "../services/unit.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const addNewUnit = createAsyncThunk(
  "Unit/AddNewUnit",
  async (
    {
      id,
      tenDonVi,
      moTa,
      ghiChu,
      phoneDonVi,
      emailDonVi,
      addressDonVi,
      quanHuyen,
      thanhPho,
    },
    thunkAPI
  ) => {
    try {
      const data = await UnitService.addNewUnit(
        id,
        tenDonVi,
        moTa,
        ghiChu,
        phoneDonVi,
        emailDonVi,
        addressDonVi,
        quanHuyen,
        thanhPho
      );
      thunkAPI.dispatch(setMessage("New unit added successfully!"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllUnits = createAsyncThunk(
  "Unit/GetAllUnits",
  async (_, thunkAPI) => {
    try {
      const data = await UnitService.getAllUnits();
      thunkAPI.dispatch(setMessage("Unit data fetched successfully!"));
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

export const updateUnit = createAsyncThunk(
  "Unit/UpdateUnit",
  async (
    {
      id,
      tenDonVi,
      moTa,
      ghiChu,
      phoneDonVi,
      emailDonVi,
      addressDonVi,
      quanHuyen,
      thanhPho,
    },
    thunkAPI
  ) => {
    try {
      const data = await UnitService.updateUnit(
        id,
        tenDonVi,
        moTa,
        ghiChu,
        phoneDonVi,
        emailDonVi,
        addressDonVi,
        quanHuyen,
        thanhPho
      );
      thunkAPI.dispatch(setMessage("Unit information updated successfully!"));
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
