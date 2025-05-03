import axiosInstance from "./axiosInstance";

const getStudentSubmissions = async (studentId, assignmentId) => {
  try {
    const response = await axiosInstance.get(
      `Submission/GetSubmissionsByStudent?studentId=${studentId}&assignmentId=${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching submission data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getSubmissionsByAssignment = async (assignmentId) => {
  try {
    const response = await axiosInstance.get(
      `Submission/GetSubmissionsByAssignmentId?assignmentId=${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching submission data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const SubmissionService = {
  getStudentSubmissions,
  getSubmissionsByAssignment,
};

export default SubmissionService;
