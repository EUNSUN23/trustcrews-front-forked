import { requestWithAuth } from '@/service/request';

/**
 * 프로젝트 지원
 * @param projectId
 * @param positionId
 */
export async function applyProject(projectId: bigint, positionId: bigint) {
  return await requestWithAuth(
    'POST',
    `/api/project/apply?projectId=${projectId}`,
    { positionId, projectId, apply_message: '기본 메세지' },
  );
}
