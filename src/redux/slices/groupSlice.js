import { createSlice } from "@reduxjs/toolkit";
import {
  getGroupsByClassSession,
  addLearnersToGroup,
  createGroup,
  removeGroup,
} from "../actions/groupAction";

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
        state.data = action.payload; // Cập nhật state với danh sách nhóm theo buổi học
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
        // action.payload nên là thông tin nhóm đã được cập nhật từ server
        const updatedGroup = action.payload;
        if (updatedGroup && updatedGroup.id) {
          const groupIndex = state.data.findIndex(
            (group) => group.id === updatedGroup.id
          );
          if (groupIndex !== -1) {
            state.data[groupIndex] = updatedGroup;
          } else {
            // Nếu nhóm chưa có trong state (ít xảy ra nếu đã fetch trước đó), có thể thêm mới
            state.data.push(updatedGroup);
          }
          if (updatedGroup && updatedGroup.id) {
            const groupIndex = state.data.findIndex(
              (group) => group.id === updatedGroup.id
            );
            if (groupIndex !== -1) {
              state.data[groupIndex] = updatedGroup;
            } else {
              // Nếu nhóm chưa có trong state (ít xảy ra nếu đã fetch trước đó), có thể thêm mới
              state.data.push(updatedGroup);
            }
          }
        }
        // Hoặc, nếu bạn muốn fetch lại toàn bộ danh sách nhóm sau khi thêm:
        // dispatch(getGroupsByClassSession(sessionId)); // Cần sessionId ở đây
        // dispatch(getAllGroups()); // Hoặc fetch lại tất cả các nhóm
      })
      .addCase(addLearnersToGroup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Có lỗi xảy ra khi thêm người học vào nhóm";
      })
      // Xử lý createGroup
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Thêm nhóm mới vào state.data nếu backend trả về thông tin nhóm vừa tạo
        if (action.payload && action.payload.id) {
          state.data.push(action.payload);
        }
        // Hoặc, nếu bạn muốn fetch lại toàn bộ danh sách nhóm sau khi tạo:
        // dispatch(getAllGroups());
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Xử lý removeGroup
      .addCase(removeGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Xóa nhóm khỏi state.data
        // action.meta.arg là groupId đã truyền vào khi dispatch removeGroup
        if (action.meta && action.meta.arg) {
          state.data = state.data.filter(
            (group) => group.id !== action.meta.arg
          );
        }
        // Hoặc, nếu bạn muốn fetch lại toàn bộ danh sách nhóm sau khi xóa:
        // dispatch(getAllGroups());
      })
      .addCase(removeGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = groupReducer;
export default reducer;
