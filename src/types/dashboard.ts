export interface DashboardDto {
  latestOralCheckId: number | null;
  oralCheckTimeInterval: number | null;

  oralCheckTotalCount: number;
  oralCheckHealthyCount: number;
  oralCheckGoodCount: number;
  oralCheckAttentionCount: number;
  oralCheckDangerCount: number;

  toothBrushingTotalCount: number;
  toothBrushingAverage: number;

  oralStatus: OralStatusTypeDto | null;
  questionnaireCreated: string | null;

  oralCheckResultTotalType: string;
  oralCheckUpRightScoreType: string;
  oralCheckUpLeftScoreType: string;
  oralCheckDownLeftScoreType: string;
  oralCheckDownRightScoreType: string;

  oralCheckDailyList: OralCheckDailyChangeDto[];
}

export interface OralStatusTypeDto {
  plaque: number;
  status: string;
}

export interface OralCheckDailyChangeDto {
  date: string;
  healthyCount: number;
  goodCount: number;
  attentionCount: number;
  dangerCount: number;
}
