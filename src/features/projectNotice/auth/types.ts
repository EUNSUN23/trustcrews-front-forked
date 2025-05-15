import { NOTICE_TYPES } from '@/features/projectNotice/auth/constants/noticeTypes';
import { NOTICE_TABS } from '@/features/projectNotice/auth/constants/noticeTabs';

export type NoticeTypeCode = Exclude<
  keyof typeof NOTICE_TYPES,
  'PRA1001' | 'PRA3001'
>;

export type NoticeType = (typeof NOTICE_TYPES)[NoticeTypeCode];

export type NoticeTab = (typeof NOTICE_TABS)[keyof typeof NOTICE_TABS];
