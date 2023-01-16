/**
 * 일감 타입 - 사이트지원 | 결함
 */
export enum JOB_TYPE {
  SITE = 'SITE',
  FLAW = 'FLAW',
}

/**
 * 현황 타입 - 진행 | 반려
 */
export enum STATUS_TYPE {
  ING = 'ING',
  REFER = 'REFER',
}

export const PROGRESS = Array.from({ length: 10 }, (_, i) =>
  i === 9 ? '완료' : `${(i + 1) * 10}%`,
);

export interface IJob {
  key: number;
  text: string;
  jobType: JOB_TYPE;
  statusType: STATUS_TYPE;
  progress?: typeof PROGRESS[number];
}
