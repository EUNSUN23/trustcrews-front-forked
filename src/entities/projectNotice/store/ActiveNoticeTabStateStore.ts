import { atom } from 'recoil';
import { NoticeTab } from '@/entities/projectNotice/types';
import { NOTICE_TABS } from '@/entities/projectNotice/constants/noticeTabs';

const { NTAB001: RCVOTE_NOTICE_TAB } = NOTICE_TABS;

export const activeNoticeTabStateStore = atom<NoticeTab>({
  key: 'activeNoticeTabStateStore',
  default: RCVOTE_NOTICE_TAB,
});
