import api from "./api";
import type { DashboardResponse } from "../types/dashboard";

export const getDashboardData = async (): Promise<DashboardResponse> => {
  const res = await api.get<{
    rt: number;
    rtMsg: string;
    response: DashboardResponse;
  }>("/oralCheck/dashboard");
  return res.data.response;
};
