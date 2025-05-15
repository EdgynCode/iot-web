// src/redux/services/group.service.js
import axiosInstance from "./axiosInstance";

// Function to create a new group
const createGroup = async (tenNhom, sessionId) => {
  try {
    // Making a POST request to the 'Group/CreateGroup' endpoint
    // The 'sessionId' is passed as a query parameter, assuming backend expects 'classSessionId'
    // The 'tenNhom' (group name) is passed in the request body
    const response = await axiosInstance.post(
      `Group/CreateGroup?classSessionId=${sessionId}`, // Endpoint uses classSessionId
      { tenNhom } // Request body containing the group name
    );
    return response.data; // Returning the data from the response
  } catch (error) {
    // Logging and re-throwing the error if the request fails
    console.error(
      "Error creating new group:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Function to get groups by class session ID
const getGroupsByClassSession = async (sessionId) => {
  try {
    // Making a GET request to fetch groups for a specific class session
    // SỬA LỖI: Thay đổi query parameter từ 'id' thành 'classSessionId'
    const response = await axiosInstance.get(
      `Group/GetGroupsByClassSession?classSessionId=${sessionId}` // Changed 'id' to 'classSessionId'
    );
    return response.data; // Returning the list of groups
  } catch (error) {
    // Logging and re-throwing the error
    console.error(
      "Error fetching group data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Function to remove a group by its ID
const removeGroup = async (groupId) => {
  try {
    // Making a DELETE request to remove a specific group
    const response = await axiosInstance.delete(
      `Group/RemoveGroup?id=${groupId}` // Assuming 'id' is the correct parameter for removing a group by its own ID
    );
    return response.data; // Returning data from the response (e.g., a success message)
  } catch (error) {
    // Logging and re-throwing the error
    console.error(
      "Error removing group:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Function to add learners to a group
const addLearnersToGroup = async (groupId, memberList) => {
  try {
    // Making a POST request to add a list of members to a specific group
    const response = await axiosInstance.post(
      `Group/AddLearnersToGroup?groupId=${groupId}`,
      memberList // Request body containing the list of members to add
    );
    return response.data; // Returning data from the response
  } catch (error) {
    // Logging and re-throwing the error
    console.error(
      "Error adding students to group:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Exporting all service functions as part of the GroupService object
const GroupService = {
  createGroup,
  getGroupsByClassSession,
  removeGroup,
  addLearnersToGroup,
  getAllGroups,
};

export default GroupService;
