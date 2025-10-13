export interface OralCheckDaily {
  oralCheckNumber: number;
  oralCheckResultTotalType: "HEALTHY" | "GOOD" | "ATTENTION" | "DANGER";
}

export interface DashboardResponse {
  latestOralCheckId: number;
  oralCheckTimeInterval: number;
  oralCheckTotalCount: number;
  oralCheckHealthyCount: number;
  oralCheckGoodCount: number;
  oralCheckAttentionCount: number;
  oralCheckDangerCount: number;
  toothBrushingTotalCount: number;
  toothBrushingAverage: number;
  oralStatus: string | null;
  questionnaireCreated: string | null;
  oralCheckResultTotalType: string;
  oralCheckUpRightScoreType: string;
  oralCheckUpLeftScoreType: string;
  oralCheckDownLeftScoreType: string;
  oralCheckDownRightScoreType: string;
  oralCheckDailyList: OralCheckDaily[];
}

export interface DataResponse {
  rt: number;
  rtMsg: string;
  response: DashboardResponse;
}
