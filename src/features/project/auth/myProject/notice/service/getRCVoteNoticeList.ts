import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PageResponseBody } from '@/utils/type';
import { ITEM_COUNT } from '@/utils/constant';
import { bigIntToString } from '@/utils/common';
import { NOTICE_TYPES } from '@/features/project/auth/myProject/notice/constants/noticeTypes';
import { VoteStatusType } from '@/features/project/auth/myProject/vote/types';

export type RCVoteNoticeData = {
  alertId: bigint;
  voteId: bigint;
  applyId: bigint;
  alertType: typeof NOTICE_TYPES.PRA1002;
  contents: string;
  voteStatus: VoteStatusType;
  createDate: string;
};

export const getRCVoteNoticeList = async (
  projectId: bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<RCVoteNoticeData[]>> => {
  return request(
    'GET',
    `/api/project/alert/vote/recruit?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const useRCVoteNoticeList = (projectId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: ['rcVoteNoticeList', bigIntToString(projectId), pageIndex],
    queryFn: () =>
      getRCVoteNoticeList(projectId, pageIndex, ITEM_COUNT.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
