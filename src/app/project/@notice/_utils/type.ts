import { DataId, Position } from '@/utils/type';
import { TaskPointOptions } from '@/app/project/@notice/_utils/constant';
import { AlertMenu } from '@/service/project/alert/type';

/**
 * 프로젝트 알림 기본데이터
 */
export type Notice = {
  type: AlertMenu;
  alertId: DataId;
  checkUserId: DataId;
  sendUserId: DataId;
  milestoneId: DataId | null;
  projectId: DataId;
  workId: DataId | null;
  createDate: string;
  updateDate: string;
  content: string;
  position: Position | null;
  checkedStatus: boolean;
};

export type PointTypeKey = keyof typeof TaskPointOptions;
export type PointTypeName = (typeof TaskPointOptions)[PointTypeKey]['name'];
export type PointTypeValue = (typeof TaskPointOptions)[PointTypeKey]['value'];

// 업무 알림 > 신뢰점수
export type TaskScore = {
  scoreTypeId: PointTypeValue;
};

// 모집 알림 > isPermit
export type RecruitPermit = {
  isPermit: boolean | null;
};
