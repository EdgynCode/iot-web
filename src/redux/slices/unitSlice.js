import { createSlice } from "@reduxjs/toolkit";
import { getAllUnits,removeUnit } from "../actions/unitAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
  selectedUnitId: null,
};


const unitReducer = createSlice({
  name: "units",
  initialState,
  reducers: {
    setSelectedUnitId: (state, action) => {
      state.selectedUnitId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUnit.fulfilled, (state, action) => {
        console.log("Unit removed:", action.payload);
        state.data = state.data.filter((unit) => unit.id !== action.payload);   // action.payload là unitId
        state.selectedUnitId = null; // Reset selectedUnitId
      })
      .addCase(removeUnit.rejected, (state, action) => {
        state.error = action.payload;
        state.selectedUnitId = null; // Reset selectedUnitId nếu có lỗi
      });
  },
});

export const { setSelectedUnitId } = unitReducer.actions; // Export action
export default unitReducer.reducer;
