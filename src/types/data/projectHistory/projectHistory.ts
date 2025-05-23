import { ProjectHistoryStatus } from '@/types/data/projectHistory/projectHistoryStatus';

export type ProjectHistoryData = {
  userProjectHistoryId: bigint;
  projectId: bigint;
  status: ProjectHistoryStatus;
  projectName: string;
  updateDate: string;
};
