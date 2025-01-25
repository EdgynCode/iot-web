import axiosInstance from "./axiosInstance";

const createSemester = async (tenHocKy, namHoc, notes) => {
  try {
    const response = await axiosInstance.post(`Semester/CreateSemester`, {
      tenHocKy,
      namHoc,
      notes,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding new semester:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllSemesters = async () => {
  try {
    const response = await axiosInstance.get(`Semester/GetAllSemesters`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching semester data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateSemester = async (id, tenHocKy, namHoc, notes) => {
  try {
    const response = await axiosInstance.patch(`Semester/UpdateSemester`, {
      id,
      tenHocKy,
      namHoc,
      notes,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating semester:",
      error.response?.data || error.message
    );
  }
};

const removeSemester = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `Semester/RemoveSemester?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error removing semester:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const SemesterService = {
  createSemester,
  getAllSemesters,
  updateSemester,
  removeSemester,
};

export default SemesterService;
