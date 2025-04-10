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
      ? response.data.map((learner) => {
          // Thêm log để xem cấu trúc của mỗi học sinh
          console.log("Learner data:", learner);

          // Nếu không có hoTen, tìm các trường tên khác có thể có
          if (!learner.hoTen) {
            learner.hoTen =
              learner.name ||
              learner.fullName ||
              learner.tenHocSinh ||
              `Học sinh ${learner.id}`;
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

const LearnerService = {
  createMultipleLearner,
  assignLearnerToClass,
  getLearnersByClassId,
};

export default LearnerService;
