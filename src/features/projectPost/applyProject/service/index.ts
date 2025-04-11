import { request } from '@/lib/clientApi/request';

/**
 * 프로젝트 지원
 * @param projectId
 * @param positionId
 */
export async function applyProject(projectId: bigint, positionId: bigint) {
  return await request('POST', `/api/project/apply?projectId=${projectId}`, {
    positionId,
    projectId,
    apply_message: '기본 메세지',
  });
}
