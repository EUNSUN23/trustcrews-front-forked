import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { NOTICE_TYPES } from '@/features/project/auth/projectNotice/constants/noticeTypes';
import { VoteStatusType } from '@/features/project/auth/projectVote/types';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';

import { PageResponseBody } from '@/types/responseBody';

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
      getRCVoteNoticeList(projectId, pageIndex, ITEM_COUNT_PER_PAGE.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
