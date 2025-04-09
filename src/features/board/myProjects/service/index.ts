import { request } from '@/lib/clientApi/request';
import { sortByStartDate } from '@/utils/common';

/**
 * 참여 프로젝트 목록 조회
 */
export async function getMyProjectList(pageIndex: number, itemCount: number) {
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
}
