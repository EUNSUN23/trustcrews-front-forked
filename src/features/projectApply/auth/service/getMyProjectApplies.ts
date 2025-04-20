import { PageResponseBody } from '@/utils/type';
import { ProjectApplyStatusData } from '@/features/projectApply/auth/type';
import { request } from '@/lib/clientApi/request';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ITEM_COUNT } from '@/utils/constant';

/**
 * 프로젝트 지원 목록 조회
 * @param pageIndex
 * @param itemCount
 */
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
      getMyProjectApplies(pageParam, ITEM_COUNT.LIST_SM),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      if (
        !lastPage.data ||
        nextPage * ITEM_COUNT.LIST_SM > lastPage.data.totalPages
      ) {
        return null;
      }

      return nextPage;
    },
  });
};
