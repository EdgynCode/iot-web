import axiosInstance from "./axiosInstance";

const createLab = async (name, pathImage) => {
  try {
    const response = await axiosInstance.post("Lab/CreateLab", {
      name,
      pathImage,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating lab:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const getAllLabs = async () => {
  try {
    const response = await axiosInstance.get("Lab/GetAllLabs");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching labs:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getLabsByName = async (labName) => {
  try {
    const response = await axiosInstance.get(
      `Lab/GetLabsByName?name=${labName}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching labs:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const deleteLabs = async (labIds) => {
  try {
    const response = await axiosInstance.delete("Lab/DeleteLabs", {
      data: labIds,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting labs:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const LabService = {
  createLab,
  getAllLabs,
  getLabsByName,
  deleteLabs,
};

export default LabService;
