import { PROJECT_HISTORY_STATUS } from '@/lib/projectHistory/constants/projectHistoryStatus';

export type ProjectHistoryStatusCode = keyof typeof PROJECT_HISTORY_STATUS;
export type ProjectHistoryStatus =
  (typeof PROJECT_HISTORY_STATUS)[ProjectHistoryStatusCode];

export type ProjectHistoryData = {
  userProjectHistoryId: bigint;
  projectId: bigint;
  status: ProjectHistoryStatus;
  projectName: string;
  updateDate: string;
};
