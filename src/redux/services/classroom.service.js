import axiosInstance from "./axiosInstance";

const addNewClassroom = async (tenLop) => {
  try {
    const response = await axiosInstance.post(`Classroom/AddNewClassRoom`, {
      tenLop,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding new classroom:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllClassrooms = async () => {
  try {
    const response = await axiosInstance.get(`Classroom/GetAllClassRooms`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching classroom data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getClassesByTeacherId = async (teacherId) => {
  try {
    const response = await axiosInstance.get(
      `Classroom/GetClassroomsByTeacherId?id=${teacherId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching classroom data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const removeClassroom = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `Classroom/RemoveClassRoom?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error removing classroom:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateClassroom = async (id, hocKyID, tenLop) => {
  try {
    const response = await axiosInstance.patch(`Classroom/UpdateClassRoom`, {
      id,
      hocKyID,
      tenLop,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating classroom:",
      error.response?.data || error.message
    );
  }
};

const ClassroomService = {
  addNewClassroom,
  getAllClassrooms,
  getClassesByTeacherId,
  removeClassroom,
  updateClassroom,
};

export default ClassroomService;
