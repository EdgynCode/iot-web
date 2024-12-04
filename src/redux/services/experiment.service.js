import axiosInstance from "./axiosInstance";

const createExperiment = async (
  tenThiNghiem,
  moTaThiNghiem,
  pathImage,
  ghiChu,
  labId
) => {
  try {
    const response = await axiosInstance.post("Experiment/CreateExperiment", {
      tenThiNghiem,
      moTaThiNghiem,
      pathImage,
      ghiChu,
      labId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating experiment:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllExperiment = async () => {
  try {
    const response = await axiosInstance.get("Experiment/GetAllExperiments");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching experiment:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const deleteExperiments = async (experimentIds) => {
  try {
    const response = await axiosInstance.delete(
      "Experiment/DeleteExperiments",
      experimentIds
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting experiments:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateExperiment = async (experimentData) => {
  try {
    const response = await axiosInstance.put(
      "Experiment/UpdateExperiment",
      experimentData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating experiments:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const ExperimentService = {
  createExperiment,
  getAllExperiment,
  deleteExperiments,
  updateExperiment,
};

export default ExperimentService;
