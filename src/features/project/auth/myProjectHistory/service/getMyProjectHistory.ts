import { request } from '@/lib/clientApi/request';
import { PageResponseBody, UserProjectHistoryData } from '@/utils/type';
import { useSuspenseQuery } from '@tanstack/react-query';

export const getMyProjectHistory = async (
  pageNumber: number,
): Promise<PageResponseBody<UserProjectHistoryData[]>> => {
  return await request('GET', `/api/user/history-me?pageNumber=${pageNumber}`);
};

export const useMyProjectHistory = (pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: ['myProjectHistory', pageIndex],
    queryFn: () => getMyProjectHistory(pageIndex),
  });
};
