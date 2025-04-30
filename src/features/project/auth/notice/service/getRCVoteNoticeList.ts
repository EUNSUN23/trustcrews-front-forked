import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PageResponseBody } from '@/utils/type';
import { ITEM_COUNT } from '@/utils/constant';
import { bigIntToString } from '@/utils/common';
import { NOTICE_TYPES } from '@/features/project/auth/notice/constants/noticeTypes';
import { VoteStatusType } from '@/features/project/auth/vote/types';

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

export const RC_VOTE_NOTICE_LIST_QUERY_KEY = 'rcVoteNoticeList';

export const useRCVoteNoticeList = (projectId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: [
      RC_VOTE_NOTICE_LIST_QUERY_KEY,
      bigIntToString(projectId),
      pageIndex,
    ],
    queryFn: () =>
      getRCVoteNoticeList(projectId, pageIndex, ITEM_COUNT.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
