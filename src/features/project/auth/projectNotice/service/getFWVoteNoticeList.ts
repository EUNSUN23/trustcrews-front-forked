import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { NOTICE_TYPES } from '@/features/project/auth/projectNotice/constants/noticeTypes';
import { VoteStatusType } from '@/features/project/auth/projectVote/types';
import { ProjectAuthMap } from '@/features/project/auth/projectManageAuth/types/projectAuth';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';

import { PageResponseBody } from '@/types/responseBody';

export type FWVoteNoticeData = {
  alertId: bigint;
  voteId: bigint;
  crewId: bigint;
  crewAuth: ProjectAuthMap;
  alertType: typeof NOTICE_TYPES.PRA1003;
  contents: string;
  voteStatus: VoteStatusType;
  createDate: string;
};

export const getFWVoteNoticeList = async (
  projectId: bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<FWVoteNoticeData[]>> => {
  return request(
    'GET',
    `/api/project/alert/vote/fwithdraw?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const FWVOTE_NOTICE_LIST_QUERY_KEY = 'fwVoteNoticeList';

export const useFWVoteNoticeList = (projectId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: [
      FWVOTE_NOTICE_LIST_QUERY_KEY,
      bigIntToString(projectId),
      pageIndex,
    ],
    queryFn: () =>
      getFWVoteNoticeList(projectId, pageIndex, ITEM_COUNT_PER_PAGE.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
