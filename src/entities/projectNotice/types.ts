import { NOTICE_TYPES } from '@/entities/projectNotice/constants/noticeTypes';
import { NOTICE_TABS } from '@/entities/projectNotice/constants/noticeTabs';

export type NoticeTypeCode = Exclude<
  keyof typeof NOTICE_TYPES,
  'PRA1001' | 'PRA3001'
>;

export type NoticeType = (typeof NOTICE_TYPES)[NoticeTypeCode];

export type NoticeTab = (typeof NOTICE_TABS)[keyof typeof NOTICE_TABS];
