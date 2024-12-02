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

const LabService = {
  createLab,
  getAllLabs,
};

export default LabService;
