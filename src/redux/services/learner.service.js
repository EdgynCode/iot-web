import axiosInstance from "./axiosInstance";

const createMultipleLearner = async (learners) => {
  try {
    const response = await axiosInstance.post("Leaner/CreateLeaner", learners);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating multiple learners:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const LearnerService = {
  createMultipleLearner,
};

export default LearnerService;
