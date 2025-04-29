import { request } from '@/lib/clientApi/request';
import { PageResponseBody } from '@/utils/type';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectHistoryData } from '@/lib/projectHistory/types';

export const getMyProjectHistory = async (
  pageNumber: number,
): Promise<PageResponseBody<ProjectHistoryData[]>> => {
  return await request('GET', `/api/user/history-me?pageNumber=${pageNumber}`);
};

export const useMyProjectHistory = (pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: ['myProjectHistory', pageIndex],
    queryFn: () => getMyProjectHistory(pageIndex),
  });
};
