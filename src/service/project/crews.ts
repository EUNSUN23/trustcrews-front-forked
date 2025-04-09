import { request } from '@/lib/clientApi/request';
import { ProjectAuthMapCode } from '@/utils/type';

/**
 * 프로젝트 크루 목록 조회
 * @param projectId
 */
export async function getProjectCrewList({
  projectId,
}: {
  projectId: string | bigint;
}) {
  return await request('GET', `/api/project/crews/list?projectId=${projectId}`);
}

/**
 * 프로젝트 크루 상세 조회
 * @param projectMemberId
 */
export async function getCrewDetail(projectMemberId: string | bigint) {
  return await request(
    'GET',
    `/api/project/crews/detail?projectMemberId=${projectMemberId}`,
  );
}

/**
 * 프로젝트 크루 업무이력 조회
 * @param projectMemberId
 * @param pageIndex
 * @param itemCount
 */
export async function getCrewTaskHistory(
  projectMemberId: string | bigint,
  pageIndex: number,
  itemCount: number,
) {
  return await request(
    'GET',
    `/api/project/crewTaskHistory?projectMemberId=${projectMemberId}&pageIndex=${pageIndex}&itemCount=${itemCount}`,
  );
}

export type WithdrawReqDto = {
  projectId: bigint;
  wMemberId: bigint;
  wMemberAuth: ProjectAuthMapCode;
};

/**
 * 프로젝트 탈퇴
 * @param reqData
 */
export async function withdrawProject(reqData: WithdrawReqDto) {
  return await request('POST', `/api/project/crews/withdraw`, reqData);
}
