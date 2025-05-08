import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';
import { ProjectInfoSummary } from '@/features/project/public/service/getProjectPublicInfo';
import { PageResponseBody } from '@/types/responseBody';
import sortByStartDate from '@/utils/sortByStartDate';

/**
 * 참여 프로젝트 목록 조회
 */
export const getMyProjects = async (
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<ProjectInfoSummary[]>> => {
  const resBody = await request(
    'GET',
    `/api/project/list?pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );

  return {
    ...resBody,
    data: resBody.data
      ? {
          totalPages: resBody.data.totalPages,
          content: resBody.data.content
            ? sortByStartDate(resBody.data.content, 'desc')
            : [],
        }
      : null,
  };
};

export const MY_PROJECTS_QUERY_KEY = ['myProjects'];

export const useMyProjects = (pageNumber: number) => {
  return useSuspenseQuery({
    queryKey: [...MY_PROJECTS_QUERY_KEY, pageNumber],
    queryFn: () => getMyProjects(pageNumber, ITEM_COUNT_PER_PAGE.CARDS),
  });
};
