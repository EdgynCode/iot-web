import { createSlice } from "@reduxjs/toolkit";
import { getGroupsByClassSession,addLearnersToGroup,  } from "../actions/groupAction";

const groupReducer = createSlice({
  name: "groups",
  initialState: {
    data: [], // Danh sách nhóm
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý getGroupsByClassSession
      .addCase(getGroupsByClassSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupsByClassSession.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getGroupsByClassSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý addLearnersToGroup
      .addCase(addLearnersToGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLearnersToGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật state.data khi thêm người học vào nhóm thành công
        const updatedGroup = action.payload;
        const groupIndex = state.data.findIndex(
          (group) => group.id === updatedGroup.id || 
                    (group.nhomId && group.nhomId === updatedGroup.id)
        );
        
        if (groupIndex !== -1) {
          state.data[groupIndex] = updatedGroup;
        } else {
          state.data.push(updatedGroup);
        }
      })
      .addCase(addLearnersToGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra khi thêm người học vào nhóm";
      });
  },
});

const { reducer } = groupReducer;
export default reducer;