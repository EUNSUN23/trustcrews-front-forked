import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';

import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import { TaskPointType } from '@/features/project/auth/global/types/TaskPointType';
import { CrewStatusKey } from '@/features/project/auth/projectCrews/types';

import { PageResponseBody } from '@/types/responseBody';

export interface CrewTaskHistory {
  workId: bigint;
  trustScoreHistoryId: bigint;
  workContent: string;
  createDate: string;
  progressStatus: CrewStatusKey;
  point: number;
  point_type: TaskPointType;
}

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
      ITEM_COUNT_PER_PAGE.LIST_SM,
    ],
    queryFn: () =>
      getCrewTaskHistory(projectMemberId, pageIndex, PAGE_RANGE.DEFAULT),
  });
};
