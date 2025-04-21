import { TASK_STATUS } from '@/app/project/@task/_utils/constant';

export type TaskStatusKey = keyof typeof TASK_STATUS;
export type TaskStatusType = (typeof TASK_STATUS)[TaskStatusKey];
export type TaskStatusNameType = (typeof TASK_STATUS)[TaskStatusKey]['name'];

export type TaskStatusValueType = (typeof TASK_STATUS)[TaskStatusKey]['code'];

export interface TaskItem {
  workId: bigint;
  projectId: bigint;
  milestoneId: bigint;
  assignedUser: AssignedUser | null;
  lastModifiedMemberNickname: string;
  content: string;
  startDate: string;
  endDate: string;
  progressStatus: TaskStatusType;
  contentDetail: string | '';
}

export interface TaskAddForm extends TaskItem {
  title: '업무 추가';
  type: 'add';
}

export interface TaskModifyForm extends TaskItem {
  title: string;
  type: 'modify';
  progressStatusCode: TaskStatusValueType;
}

export type TaskForm = TaskAddForm | TaskModifyForm;

export type TaskContentDetails = Map<string, string>;

export type AssignedUser = {
  projectMemberId: bigint;
  nickname: string;
};
