import { request } from '@/lib/clientApi/request';

/**
 * 프로젝트 세팅 - 프로젝트 정보 조회
 * @param projectId
 */
export const getProjectSettingInfo = async (projectId: bigint) => {
  return await request(
    'GET',
    `/api/project/setting/info?projectId=${projectId}`,
  );
};
