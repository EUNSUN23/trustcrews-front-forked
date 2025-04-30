import { atom } from 'recoil';
import { NoticeTab } from '@/features/project/auth/myProject/notice/types';
import { NOTICE_TABS } from '@/features/project/auth/myProject/notice/constants/noticeTabs';

const { NTAB001: RCVOTE_NOTICE_TAB } = NOTICE_TABS;

export const activeNoticeTabStateStore = atom<NoticeTab>({
  key: 'activeNoticeTabStateStore',
  default: RCVOTE_NOTICE_TAB,
});
