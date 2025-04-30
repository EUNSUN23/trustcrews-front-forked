import { TASK_STATUS } from '@/features/project/auth/projectJobs/constants/task/taskStatus';

export type TaskStatusKey = keyof typeof TASK_STATUS;
export type TaskStatus = (typeof TASK_STATUS)[TaskStatusKey];
export type TaskStatusName = (typeof TASK_STATUS)[TaskStatusKey]['name'];
export type TaskStatusCode = (typeof TASK_STATUS)[TaskStatusKey]['code'];

export type TaskItem = {
  workId: bigint;
  projectId: bigint;
  milestoneId: bigint;
  assignedUser: AssignedUser | null;
  lastModifiedMemberNickname: string;
  content: string;
  startDate: string;
  endDate: string;
  progressStatus: TaskStatus;
  contentDetail: string | '';
};

export type TaskContentDetails = Map<string, string>;

export type AssignedUser = {
  projectMemberId: bigint;
  nickname: string;
};
