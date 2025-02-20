import axiosInstance from "./axiosInstance";

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
      "Error creating new lesson:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllClassSessions = async () => {
  try {
    const response = await axiosInstance.get(
      `ClassSession/GetAllClassSessions`
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

const getClassSessionDetails = async (sessionID) => {
  try {
    const response = await axiosInstance.get(
      `ClassSession/GetClassSessionDetails?id${sessionID}`
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

const deleteClassSession = async (sessionID) => {
  try {
    const response = await axiosInstance.delete(
      `ClassSession/DeleteClassSession?id=${sessionID}`
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

const updateClassSession = async (
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
    const response = await axiosInstance.patch(
      `ClassSession/UpdateClassSession?id=${id}`,
      {
        id,
        lopHocId,
        nguoiDayId,
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
      "Error updating new lesson:",
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
  updateClassSession,
};

export default LessonService;
