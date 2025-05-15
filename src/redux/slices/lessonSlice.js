import { createSlice } from "@reduxjs/toolkit";
import {
  createClassSession,
  getAllClassSessions,
  getClassSessionDetails,
  deleteClassSession,
  updateClassSession, // Import action updateClassSession
} from "../actions/lessonAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const lessonReducer = createSlice({
  name: "lessons",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllClassSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClassSessions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAllClassSessions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getClassSessionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassSessionDetails.fulfilled, (state, action) => {
        // Cập nhật một buổi học cụ thể hoặc thêm vào nếu chưa có (tùy logic)
        // Ví dụ: Nếu bạn muốn state.data chỉ chứa chi tiết của 1 session khi gọi action này:
        // state.data = [action.payload];
        // Hoặc cập nhật session đó trong mảng data nếu đã tồn tại:
        const index = state.data.findIndex(
          (session) => session.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          // Nếu không tìm thấy, có thể thêm vào hoặc bỏ qua tùy theo logic mong muốn
          state.data.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(getClassSessionDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createClassSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClassSession.fulfilled, (state, action) => {
        // Thêm buổi học mới vào state.data
        // Backend thường trả về đối tượng session vừa tạo trong action.payload
        if (action.payload) {
          state.data.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(createClassSession.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteClassSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClassSession.fulfilled, (state, action) => {
        // action.payload có thể là ID của session đã xóa hoặc một thông báo/object thành công.
        // Nếu backend trả về ID của session đã xóa (ví dụ: action.meta.arg là ID):
        // state.data = state.data.filter(
        //   (session) => session.id !== action.meta.arg
        // );
        // Tuy nhiên, nếu action thunk `deleteClassSession` gọi `getAllClassSessions` sau khi xóa,
        // thì không cần cập nhật thủ công ở đây.
        state.loading = false;
      })
      .addCase(deleteClassSession.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Xử lý cho updateClassSession (THÊM MỚI)
      .addCase(updateClassSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClassSession.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật buổi học đã được sửa trong mảng state.data.
        // action.payload nên là đối tượng buổi học đã được cập nhật từ server.
        // const updatedSession = action.payload;
        // if (updatedSession && updatedSession.id) {
        //   const index = state.data.findIndex(session => session.id === updatedSession.id);
        //   if (index !== -1) {
        //     state.data[index] = { ...state.data[index], ...updatedSession };
        //   }
        // }
        // Quan trọng: Vì action thunk `updateClassSession` đã dispatch `getAllClassSessions`
        // sau khi cập nhật thành công, nên `state.data` sẽ được làm mới hoàn toàn từ server.
        // Do đó, việc cập nhật thủ công ở đây có thể không cần thiết hoặc có thể gây ra render kép.
        // Nếu bạn muốn UI cập nhật ngay lập tức với dữ liệu trả về từ API update trước khi fetch lại,
        // bạn có thể thực hiện cập nhật như trên.
      })
      .addCase(updateClassSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu thông tin lỗi
      });
  },
});

const { reducer } = lessonReducer;
export default reducer;
