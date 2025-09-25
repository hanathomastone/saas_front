// 구강검진 관련 타입
export type OralCheckResultType = "HEALTHY" | "GOOD" | "ATTENTION" | "DANGER";

export interface OralCheck {
  oralCheckId: number;
  created: string;
  oralCheckResultTotalType: OralCheckResultType;
  oralCheckUpRightScoreType: string;
  oralCheckUpLeftScoreType: string;
  oralCheckDownLeftScoreType: string;
  oralCheckDownRightScoreType: string;
}

export interface OralCheckDailyChangeDto {
  index: number;
  resultType: OralCheckResultType;
}
