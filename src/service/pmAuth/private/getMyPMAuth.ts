import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectAuthMap } from '@/types/data/projectAuth';
import { ResponseBody } from '@/types/responseBody';

export const getMyPMAuth = async (
  projectId: string | bigint,
): Promise<ResponseBody<ProjectAuthMap>> => {
  const _projectId =
    typeof projectId === 'string' ? BigInt(projectId) : projectId;

  return await request(
    'GET',
    `/api/project/currentUserAuth?projectId=${_projectId}`,
  );
};

export const getProjectManageAuthQueryKey = (
  projectId: string | bigint | null,
) => {
  return ['currentUserProjectAuth', projectId];
};

export const useMyPMAuth = (projectId: string | bigint | null) => {
  return useSuspenseQuery({
    queryKey: getProjectManageAuthQueryKey(projectId),
    queryFn: () => getMyPMAuth(projectId!),
  });
};
