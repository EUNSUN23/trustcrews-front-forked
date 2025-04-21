import { ProjectAuthMap, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';

export const getProjectManageAuth = async (
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
export const useProjectManageAuth = (projectId: string | bigint | null) => {
  return useSuspenseQuery({
    queryKey: getProjectManageAuthQueryKey(projectId),
    queryFn: () => getProjectManageAuth(projectId!),
  });
};
