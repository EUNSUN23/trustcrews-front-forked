import { atom } from 'recoil';
import { NoticeType } from '@/features/project/auth/myProject/notice/types';
import { NOTICE_TYPES } from '@/features/project/auth/myProject/notice/constants/noticeTypes';

const { PRA2001: CREW_NOTICE } = NOTICE_TYPES;

export const activeNoticeTabStateStore = atom<NoticeType>({
  key: 'activeNoticeTabStateStore',
  default: CREW_NOTICE,
});
