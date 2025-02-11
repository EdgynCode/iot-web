import axiosInstance from "./axiosInstance";

const assignTeachersToClass = async (teachers, classId) => {
  try {
    const response = await axiosInstance.post(
      `Teacher/AssignTeachersToClass?classId=${classId}`,
      teachers
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error assigning teachers to class:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const TeacherService = {
  assignTeachersToClass,
};

export default TeacherService;
