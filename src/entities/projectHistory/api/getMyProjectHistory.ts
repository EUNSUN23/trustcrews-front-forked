import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PageResponseBody } from '@/types/responseBody';
import { ProjectHistoryData } from '@/types/data/projectHistory';

export const getMyProjectHistory = async (
  pageNumber: number,
): Promise<PageResponseBody<ProjectHistoryData[]>> => {
  return await request(
    'GET',
    `/api/projectHistory/auth?pageNumber=${pageNumber}`,
  );
};

export const useMyProjectHistory = (pageIndex: number) => {
  return useSuspenseQuery({
    queryKey: ['myProjectHistory', pageIndex],
    queryFn: () => getMyProjectHistory(pageIndex),
  });
};
