import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
});

// ✅ 모든 요청에 accessToken 자동 포함
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
