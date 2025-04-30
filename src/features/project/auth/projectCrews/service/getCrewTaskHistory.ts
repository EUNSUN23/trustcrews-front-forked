import { request } from '@/lib/clientApi/request';
import { PageResponseBody } from '@/utils/type';
import { CrewTaskHistory } from '@/features/project/auth/projectCrews/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ITEM_COUNT, PAGE_RANGE } from '@/utils/constant';

export const getCrewTaskHistory = async (
  projectMemberId: string | bigint,
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<CrewTaskHistory[]>> => {
  return await request(
    'GET',
    `/api/project/crewTaskHistory?projectMemberId=${projectMemberId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const CREW_TASK_HISTORY_KEY = 'crewTaskHistory';

export const useCrewTaskHistory = (
  projectMemberId: string | bigint,
  pageIndex: number,
) => {
  return useSuspenseQuery({
    queryKey: [
      CREW_TASK_HISTORY_KEY,
      projectMemberId,
      pageIndex,
      ITEM_COUNT.LIST_SM,
    ],
    queryFn: () =>
      getCrewTaskHistory(projectMemberId, pageIndex, PAGE_RANGE.DEFAULT),
  });
};
