import { NOTICE_TYPES } from '@/features/project/auth/myProject/notice/constants/noticeTypes';

export type NoticeTypeCode = Exclude<
  keyof typeof NOTICE_TYPES,
  'PRA1001' | 'PRA3001'
>;

export type NoticeType = (typeof NOTICE_TYPES)[NoticeTypeCode];
