import axiosInstance from "./axiosInstance";

const createGroup = async (tenNhom, sessionId) => {
  try {
    const response = await axiosInstance.post(
      `Group/CreateGroup?classSessionId=${sessionId}`,
      { tenNhom }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating new group:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getGroupsByClassSession = async (sessionId) => {
  try {
    const response = await axiosInstance.get(
      `Group/GetGroupsByClassSession?id=${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching group data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const removeGroup = async (groupId) => {
  try {
    const response = await axiosInstance.delete(
      `Group/RemoveGroup?id=${groupId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error removing group:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Thêm người học vào nhóm
const addLearnersToGroup = async (groupId, memberList) => {
  try {
    const response = await axiosInstance.post(
      `Group/AddLearnersToGroup?groupId=${groupId}`,
      memberList
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding students to group:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const GroupService = {
  createGroup,
  getGroupsByClassSession,
  removeGroup,
  addLearnersToGroup,
};

export default GroupService;
