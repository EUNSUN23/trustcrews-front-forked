import { PageResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { ProjectApplyStatusData } from '@/features/board/projectApplyStatus/type';

/**
 * 프로젝트 지원 목록 조회
 * @param pageIndex
 * @param itemCount
 */
export async function getMyProjectApplies(
  pageIndex: number,
  itemCount: number,
): Promise<PageResponseBody<ProjectApplyStatusData[]>> {
  return await request(
    'GET',
    `/api/project/apply?pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
}
