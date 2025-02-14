import axiosInstance from "./axiosInstance";

const createMultipleLearner = async (learners) => {
  try {
    const response = await axiosInstance.post(
      "Learner/CreateLearners",
      learners
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating multiple learners:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const assignLearnerToClass = async (learners, classId) => {
  try {
    const response = await axiosInstance.post(
      `Learner/AssignLearnersToClass?classId=${classId}`,
      learners
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error assigning learners to class:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getLearnersByClassId = async (classId) => {
  try {
    const response = await axiosInstance.get(
      `Learner/GetLearnersByClassId?classId=${classId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching learners:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const LearnerService = {
  createMultipleLearner,
  assignLearnerToClass,
  getLearnersByClassId,
};

export default LearnerService;
