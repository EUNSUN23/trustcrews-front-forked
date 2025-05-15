import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { NOTICE_TYPES } from '@/features/projectNotice/private/constants/noticeTypes';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';
import { PageResponseBody } from '@/types/responseBody';

export type CrewNoticeData = {
  alertId: bigint;
  projectId: bigint;
  alertType: typeof NOTICE_TYPES.PRA2001;
  contents: string;
  createDate: string;
};

export const getCrewNoticeList = async (
  projectId: bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<CrewNoticeData[]>> => {
  return await request(
    'GET',
    `/api/projectNotice/auth/crew?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const CREW_NOTICE_LIST_QUERY_KEY = 'crewNoticeList';

export const useCrewNoticeList = (projectId: bigint, pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: [
      CREW_NOTICE_LIST_QUERY_KEY,
      bigIntToString(projectId),
      pageIndex,
    ],
    queryFn: () =>
      getCrewNoticeList(projectId, pageIndex, ITEM_COUNT_PER_PAGE.LIST_SM),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });
};
