import LessonService from "../services/lesson.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";
// Để tránh lỗi circular dependency, chúng ta sẽ dispatch action getAllClassSessions
// bằng cách gọi trực tiếp thunkAPI.dispatch(getAllClassSessions()) bên trong các thunk khác khi cần.

export const createClassSession = createAsyncThunk(
  "Classroom/CreateClassSession",
  async (
    {
      id,
      lopHocId,
      nguoiDayId,
      startTime,
      endTime,
      wifiHotspot,
      brokerAddress,
      port,
      clientId,
      labIds,
    },
    thunkAPI
  ) => {
    try {
      const data = await LessonService.createClassSession(
        id,
        lopHocId,
        nguoiDayId,
        startTime,
        endTime,
        wifiHotspot,
        brokerAddress,
        port,
        clientId,
        labIds
      );
      thunkAPI.dispatch(setMessage("Tạo buổi học thành công!"));
      // Tự động làm mới danh sách buổi học sau khi tạo thành công
      thunkAPI.dispatch(getAllClassSessions());
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllClassSessions = createAsyncThunk(
  "Classroom/GetAllClassSessions",
  async (_, thunkAPI) => {
    try {
      const data = await LessonService.getAllClassSessions();
      // Không nhất thiết phải dispatch setMessage ở đây trừ khi có thông báo cụ thể cho người dùng
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Cân nhắc việc dispatch setMessage nếu muốn thông báo lỗi chung
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClassSessionDetails = createAsyncThunk(
  "Classroom/GetClassSessionDetails",
  async (sessionID, thunkAPI) => {
    try {
      const data = await LessonService.getClassSessionDetails(sessionID);
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

export const deleteClassSession = createAsyncThunk(
  "Classroom/DeleteClassSession",
  async (sessionID, thunkAPI) => {
    try {
      const data = await LessonService.deleteClassSession(sessionID);
      thunkAPI.dispatch(setMessage("Xóa buổi học thành công!"));
      // Tự động làm mới danh sách buổi học sau khi xóa thành công
      thunkAPI.dispatch(getAllClassSessions());
      return data; // Hoặc sessionID nếu API trả về ID đã xóa
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ========= PHẦN ĐÃ SỬA ĐỔI CHO VIỆC CẬP NHẬT BUỔI HỌC =========
export const updateClassSession = createAsyncThunk(
  "Classroom/UpdateClassSession",
  async ({ sessionId, sessionData }, thunkAPI) => {
    // 1. Sửa cách nhận payload
    try {
      // 2. Destructure các trường cần thiết từ sessionData
      const {
        lopHocId,
        nguoiDayId,
        startTime, // Đảm bảo startTime có trong sessionData và đã được định dạng đúng
        endTime, // Đảm bảo endTime có trong sessionData và đã được định dạng đúng
        wifiHotspot,
        brokerAddress,
        port,
        clientId,
        labIds,
      } = sessionData;

      // 3. Truyền các tham số đã destructure vào service
      //    Lưu ý: Service của bạn nhận `id` (là sessionId) làm tham số đầu tiên,
      //    sau đó là các trường khác.
      const data = await LessonService.updateClassSession(
        sessionId, // ID của buổi học
        lopHocId,
        nguoiDayId,
        startTime, // Truyền startTime
        endTime, // Truyền endTime
        wifiHotspot,
        brokerAddress,
        port,
        clientId,
        labIds
      );
      thunkAPI.dispatch(setMessage("Cập nhật buổi học thành công!"));
      // 4. Sau khi cập nhật thành công, gọi lại getAllClassSessions để làm mới danh sách
      thunkAPI.dispatch(getAllClassSessions());
      return data;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(errorMessage)); // Gửi thông báo lỗi qua slice message
      return thunkAPI.rejectWithValue(errorMessage); // Truyền lỗi về để component có thể xử lý
    }
  }
);
