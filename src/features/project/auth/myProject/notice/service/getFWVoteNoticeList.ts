import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/utils/common';
import { ITEM_COUNT } from '@/utils/constant';
import { NOTICE_TYPES } from '@/features/project/auth/myProject/notice/constants/noticeTypes';
import { VoteStatusType } from '@/features/project/auth/myProject/vote/types';
import { PageResponseBody } from '@/utils/type';
import { ProjectAuthMap } from '@/features/project/auth/myProject/global/types/projectAuth';

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

export const useFWVoteNoticeList = (projectId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: ['fwVoteNoticeList', bigIntToString(projectId), pageIndex],
    queryFn: () =>
      getFWVoteNoticeList(projectId, pageIndex, ITEM_COUNT.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
