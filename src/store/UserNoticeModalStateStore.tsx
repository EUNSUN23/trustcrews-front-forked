import { atom } from 'recoil';
import { UserProjectNotice } from '@/utils/type';

interface UserNoticeModalState {
  isOpen: boolean;
}

export const userNoticeModalStateStore = atom<UserNoticeModalState>({
  key: 'userNoticeModalState',
  default: {
    isOpen: false,
  },
});

export function formatProjectNoticeList(noticeList: UserProjectNotice[]) {
  return noticeList.map((v) => {
    return {
      projectId: v.project.projectId,
      projectName: v.project.projectName,
      positionId: v.position.positionId,
      positionName: v.position.positionName,
      supportResult: v.supportResult,
    };
  });
}

export interface FormattedUserProjectNotice {
  alertId: string | bigint;
  projectId: string | bigint;
  projectName: string;
  positionId: string | bigint;
  positionName: string;
  supportResult: boolean | null;
}

interface FormattedUserNoticeListState {
  noticeList: FormattedUserProjectNotice[] | null;
}

export const userNoticeListStateStore = atom<FormattedUserNoticeListState>({
  key: 'userNoticeListState',
  default: {
    noticeList: null,
  },
});
