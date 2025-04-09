import { PageResponseBody } from '@/utils/type';
import { requestWithAuth } from '@/service/request';
import { ProjectApplyStatusData } from '@/features/board/myProjects/projectApplyStatus/type';

/**
 * 프로젝트 지원 목록 조회
 * @param pageIndex
 * @param itemCount
 */
export async function getMyProjectApplies(
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<ProjectApplyStatusData[]>> {
  return await requestWithAuth(
    'GET',
    `/api/project/apply?pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
}
