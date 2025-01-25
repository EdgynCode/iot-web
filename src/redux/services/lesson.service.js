import axiosInstance from "./axiosInstance";

const createLesson = async (
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
    const response = await axiosInstance.post(`Lesson/CreateLesson`, {
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
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating new lesson:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllLessons = async () => {
  try {
    const response = await axiosInstance.get(`Lesson/GetAllLessons`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching lesson data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getLessonDetails = async (lessonID) => {
  try {
    const response = await axiosInstance.get(
      `Lesson/GetLessonDetails?id${lessonID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching lesson data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const deleteLesson = async (lessonID) => {
  try {
    const response = await axiosInstance.delete(
      `Lesson/DeleteLesson?id${lessonID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting lesson data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateLesson = async (
  id,
  lopHocId,
  nguoiDayId,
  wifiHotspot,
  brokerAddress,
  port,
  clientId,
  labIds
) => {
  try {
    const response = await axiosInstance.patch(`Lesson/UpdateLesson`, {
      id,
      lopHocId,
      nguoiDayId,
      wifiHotspot,
      brokerAddress,
      port,
      clientId,
      labIds,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating new lesson:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const LessonService = {
  createLesson,
  getAllLessons,
  getLessonDetails,
  updateLesson,
  deleteLesson,
};

export default LessonService;
