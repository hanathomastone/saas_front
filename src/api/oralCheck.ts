import api from "./api";

export interface OralCheckDashboardResponse {
  oralCheckTotalCount: number;
  oralCheckHealthyCount: number;
  oralCheckGoodCount: number;
  oralCheckAttentionCount: number;
  oralCheckDangerCount: number;
  oralCheckResultTotalType: string;
  latestOralCheckId: number;
  oralCheckTimeInterval: number;
  toothBrushingTotalCount: number;
  toothBrushingAverage: number;
  questionnaireCreated: string;
  oralCheckDailyList: {
    oralCheckNumber: number;
    oralCheckResultTotalType: string;
  }[];
}

// ✅ 구강검진 대시보드 데이터 가져오기
export async function getOralCheckDashboard(): Promise<OralCheckDashboardResponse> {
  const { data } = await api.get("/oralCheck/dashboard");
  return data.response;
}
