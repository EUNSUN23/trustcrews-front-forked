import {NOTICE_TABS} from '@/constants/data/projectDetail/notice/noticeTabs';

export type NoticeTab = (typeof NOTICE_TABS)[keyof typeof NOTICE_TABS];