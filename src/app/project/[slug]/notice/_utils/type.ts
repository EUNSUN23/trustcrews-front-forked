import { DataId, Position } from '@/utils/type';
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
