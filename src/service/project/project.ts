import { request } from '@/lib/clientApi/request';

/**
 * 프로젝트 종료
 * @param projectId
 */
export async function endProject(projectId: string | bigint) {
  return await request('POST', '/api/project', { projectId });
}
