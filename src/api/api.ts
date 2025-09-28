// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

// ✅ 요청 인터셉터 - 매 요청마다 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  console.log("📌 요청 헤더 토큰:", token); // 확인용
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// ✅ 응답 인터셉터 - 토큰 만료 시 로그인 페이지로 이동
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ 세션 만료 → 로그인 페이지로 이동");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
