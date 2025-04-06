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
    
    // Thêm log để xem cấu trúc dữ liệu
    console.log("API response data structure:", response.data);
    
    // Kiểm tra và xử lý dữ liệu để đảm bảo hoTen được đặt đúng
    const processedData = Array.isArray(response.data) 
      ? response.data.map(learner => {
          // Thêm log để xem cấu trúc của mỗi học sinh
          console.log("Learner data:", learner);
          
          // Nếu không có hoTen, tìm các trường tên khác có thể có
          if (!learner.hoTen) {
            learner.hoTen = learner.name || learner.fullName || learner.tenHocSinh || `Học sinh ${learner.id}`;
          }
          return learner;
        })
      : [];
      
    return processedData;
  } catch (error) {
    console.error(
      "Error fetching learners:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Cải thiện method lấy học sinh theo sessionId
const getLearnersBySessionId = async (sessionId) => {
  try {
    // Đầu tiên lấy thông tin session để có classId
    const sessionResponse = await axiosInstance.get(
      `ClassSession/GetClassSessionById?id=${sessionId}`
    );
    
    console.log("Session data:", sessionResponse.data);
    
    // Kiểm tra xem response có chứa lopHocId không
    const classId = sessionResponse.data?.lopHocId;
    
    if (!classId) {
      console.error("No lopHocId found in session data:", sessionResponse.data);
      throw new Error("Class ID not found in session data");
    }
    
    // Sau đó lấy danh sách học sinh theo classId
    return await getLearnersByClassId(classId);
  } catch (error) {
    console.error(
      "Error fetching learners by session ID:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Thêm phương thức để lấy dữ liệu chi tiết học sinh (nếu cần)
const getDetailedLearner = async (learnerId) => {
  try {
    const response = await axiosInstance.get(`Learner/GetLearnerById?id=${learnerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching learner details:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const LearnerService = {
  createMultipleLearner,
  assignLearnerToClass,
  getLearnersByClassId,
  getLearnersBySessionId,
  getDetailedLearner
};

export default LearnerService;