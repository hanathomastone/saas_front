// 대시보드 데이터 DTO
export interface DashboardDto {
  latestOralCheckId: number;
  oralCheckTimeInterval: number;
  oralCheckTotalCount: number;
  oralCheckHealthyCount: number;
  oralCheckGoodCount: number;
  oralCheckAttentionCount: number;
  oralCheckDangerCount: number;
  toothBrushingTotalCount: number;
  toothBrushingAverage: number;
  oralStatus?: {
    oralStatusType: string;
    oralStatusTitle: string;
  } | null;
  questionnaireCreated?: string | null;
  oralCheckResultTotalType: string;
  oralCheckUpRightScoreType: string;
  oralCheckUpLeftScoreType: string;
  oralCheckDownLeftScoreType: string;
  oralCheckDownRightScoreType: string;
  oralCheckDailyList: any[];
}

// API 공통 응답 타입
export interface DataResponse<T> {
  rt: number;
  rtMsg: string;
  response: T;
}
