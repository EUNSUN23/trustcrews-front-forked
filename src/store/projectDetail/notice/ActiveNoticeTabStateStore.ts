import { atom } from 'recoil';
import { NOTICE_TABS } from '@/constants/data/projectDetail/notice/noticeTabs';
import {NoticeTab} from "@/types/data/projectDetail/notice/noticeTab";

const { NTAB001: RCVOTE_NOTICE_TAB } = NOTICE_TABS;

export const activeNoticeTabStateStore = atom<NoticeTab>({
  key: 'activeNoticeTabStateStore',
  default: RCVOTE_NOTICE_TAB,
});
