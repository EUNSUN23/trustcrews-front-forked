import { request } from '@/lib/clientApi/request';

/**
 * 프로젝트 종료
 * @param projectId
 */
export async function endProject(projectId: string | bigint) {
  return await request('POST', '/api/project', { projectId });
}

/**
 * 현재 사용자의 프로젝트 멤버 권한 조회
 * @param projectId
 */
export async function getCurrentUserProjectMemberAuth(
  projectId: string | bigint,
) {
  const _projectId =
    typeof projectId === 'string' ? BigInt(projectId) : projectId;

  return await request(
    'GET',
    `/api/project/currentUserAuth?projectId=${_projectId}`,
  );
}
