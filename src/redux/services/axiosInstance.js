import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_API_URL || "http://localhost:8080/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy user từ Redux store
    if (storedUser?.jwtAccessToken) {
      config.headers["Authorization"] = `Bearer ${storedUser.jwtAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Xử lý lỗi 401 Unauthorized (token hết hạn)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.jwtRefreshToken) {
        try {
          // Refresh token
          const refreshResponse = await axios.post(
            "http://localhost:5064/api/Account/RefreshToken",
            { refreshToken: storedUser.jwtRefreshToken }
          );

          // Lưu lại token mới
          const newUser = refreshResponse.data;
          localStorage.setItem("user", JSON.stringify(newUser));

          // Gắn token mới vào request
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newUser.jwtAccessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${newUser.jwtAccessToken}`;

          // Thực hiện lại request ban đầu
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          localStorage.removeItem("user");
          window.location.href = "/login"; // Chuyển hướng về trang login nếu cần
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export const handleError = (error) => {
  if (error.response) {
    // Server trả về response với status code khác 2xx
    console.error("Response error:", error.response.data);
    throw error.response.data || error.response.statusText;
  } else if (error.request) {
    // Không nhận được response từ server
    console.error("No response received:", error.request);
    throw "Không kết nối được tới server. Vui lòng thử lại.";
  } else {
    // Lỗi khác
    console.error("Error:", error.message);
    throw error.message;
  }
};
