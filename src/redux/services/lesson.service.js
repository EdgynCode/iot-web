import axiosInstance from "./axiosInstance";

/**
 * Tạo một buổi học mới.
 * @param {string} id - ID của buổi học (UUID).
 * @param {string} lopHocId - ID của lớp học.
 * @param {string} nguoiDayId - ID của người dạy.
 * @param {string} startTime - Thời gian bắt đầu buổi học (ISO 8601 format).
 * @param {string} endTime - Thời gian kết thúc buổi học (ISO 8601 format).
 * @param {string} wifiHotspot - Tên WiFi Hotspot.
 * @param {string} brokerAddress - Địa chỉ Broker MQTT.
 * @param {number} port - Cổng của Broker MQTT.
 * @param {string} clientId - Client ID cho MQTT.
 * @param {Array<string>} labIds - Mảng các ID của bài lab.
 * @returns {Promise<object>} Dữ liệu trả về từ API.
 */
const createClassSession = async (
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
) => {
  try {
    const response = await axiosInstance.post(
      `ClassSession/CreateClassSession`,
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
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi tạo buổi học mới:", // Error creating new lesson
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

/**
 * Lấy tất cả các buổi học.
 * @returns {Promise<Array<object>>} Mảng các đối tượng buổi học.
 */
const getAllClassSessions = async () => {
  try {
    const response = await axiosInstance.get(
      `ClassSession/GetAllClassSessions`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy danh sách buổi học:", // Error fetching lesson data
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

/**
 * Lấy chi tiết một buổi học dựa trên ID.
 * @param {string} sessionID - ID của buổi học.
 * @returns {Promise<object>} Đối tượng chứa chi tiết buổi học.
 */
const getClassSessionDetails = async (sessionID) => {
  try {
    const response = await axiosInstance.get(
      `ClassSession/GetClassSessionDetails?id=${sessionID}` // Sửa lại query param
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy chi tiết buổi học:", // Error fetching lesson data
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

/**
 * Xóa một buổi học dựa trên ID.
 * @param {string} sessionID - ID của buổi học cần xóa.
 * @returns {Promise<object>} Dữ liệu trả về từ API sau khi xóa.
 */
const deleteClassSession = async (sessionID) => {
  try {
    const response = await axiosInstance.delete(
      `ClassSession/DeleteClassSession?id=${sessionID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi xóa buổi học:", // Error deleting lesson data
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

/**
 * Cập nhật thông tin một buổi học.
 * @param {string} id - ID của buổi học cần cập nhật.
 * @param {string} lopHocId - ID mới của lớp học.
 * @param {string} nguoiDayId - ID mới của người dạy.
 * @param {string} wifiHotspot - Tên WiFi Hotspot mới.
 * @param {string} brokerAddress - Địa chỉ Broker MQTT mới.
 * @param {number} port - Cổng mới của Broker MQTT.
 * @param {string} clientId - Client ID mới cho MQTT.
 * @param {Array<string>} labIds - Mảng các ID bài lab mới.
 * @returns {Promise<object>} Dữ liệu trả về từ API sau khi cập nhật.
 */
const updateClassSession = async (
  id, // ID của buổi học để xác định buổi học cần cập nhật (thường dùng trong URL hoặc payload)
  lopHocId,
  nguoiDayId,
  startTime, // Thêm startTime
  endTime, // Thêm endTime
  wifiHotspot,
  brokerAddress,
  port,
  clientId,
  labIds
) => {
  try {
    // API endpoint có thể là PATCH hoặc PUT tùy theo thiết kế backend
    // Giả sử backend chấp nhận ID trong cả query param và body
    const response = await axiosInstance.patch(
      `ClassSession/UpdateClassSession?id=${id}`, // ID trong query parameter
      {
        // Payload chứa các trường cần cập nhật
        id, // Có thể gửi ID trong body nếu backend yêu cầu
        lopHocId,
        nguoiDayId,
        startTime, // Gửi startTime đã được format đúng
        endTime, // Gửi endTime đã được format đúng
        wifiHotspot,
        brokerAddress,
        port,
        clientId,
        labIds,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi cập nhật buổi học:", // Error updating class session
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const LessonService = {
  createClassSession,
  getAllClassSessions,
  getClassSessionDetails,
  deleteClassSession,
  updateClassSession, // Đảm bảo hàm này được export
};

export default LessonService;
