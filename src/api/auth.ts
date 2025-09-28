// src/api/auth.ts
import api from "./api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const loginApi = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/login", payload);

  if (res.status !== 200 || !res.data.accessToken) {
    throw new Error("로그인 실패");
  }
  return res.data;
};
