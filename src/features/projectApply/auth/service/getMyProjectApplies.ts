import { request } from '@/lib/clientApi/request';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';

import { PageResponseBody } from '@/types/responseBody';

type ProjectApplyStatusCode = 'PAS1001' | 'PAS1002' | 'PAS1003';

export type ProjectApplyStatusData = {
  project_apply_id: bigint;
  project_id: bigint;
  project_name: string;
  position_name: string;
  status: {
    code: ProjectApplyStatusCode;
    name: string;
  };
  apply_message: string;
  createDate: string;
};

export const getMyProjectApplies = async (
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<ProjectApplyStatusData[]>> => {
  return await request(
    'GET',
    `/api/project/apply?pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
};

export const getMyProjectAppliesQueryKey = ['myProjectApplies'];

export const useMyProjectApplies = () => {
  return useSuspenseInfiniteQuery({
    queryKey: getMyProjectAppliesQueryKey,
    queryFn: ({ pageParam }) =>
      getMyProjectApplies(pageParam, ITEM_COUNT_PER_PAGE.LIST_SM),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      if (
        !lastPage.data ||
        nextPage * ITEM_COUNT_PER_PAGE.LIST_SM > lastPage.data.totalPages
      ) {
        return null;
      }

      return nextPage;
    },
  });
};
