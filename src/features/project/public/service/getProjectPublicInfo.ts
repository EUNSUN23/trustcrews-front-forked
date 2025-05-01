import { request } from '@/lib/clientApi/request';
import { ProjectPublicInfoData, ResponseBody } from '@/utils/type';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/utils/common';

export const getProjectPublicInfo = async (
  projectId: bigint,
): Promise<ResponseBody<ProjectPublicInfoData>> => {
  return await request('GET', `/api/project/public?projectId=${projectId}`);
};

export const PROJECT_PUBLIC_INFO_QUERY_KEY = 'projectPublicInfo';

export const getProjectPublicInfoQueryOptions = (projectId: bigint) => {
  return queryOptions({
    queryKey: [PROJECT_PUBLIC_INFO_QUERY_KEY, bigIntToString(projectId)],
    queryFn: () => getProjectPublicInfo(projectId),
  });
};

export const useProjectPublicInfo = (projectId: bigint) => {
  return useSuspenseQuery(getProjectPublicInfoQueryOptions(projectId));
};
