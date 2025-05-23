import {NOTICE_TYPES} from '@/constants/data/projectDetail/notice/noticeTypes';

export type NoticeTypeCode = Exclude<
    keyof typeof NOTICE_TYPES,
    'PRA1001' | 'PRA3001'
>;
export type NoticeType = (typeof NOTICE_TYPES)[NoticeTypeCode];