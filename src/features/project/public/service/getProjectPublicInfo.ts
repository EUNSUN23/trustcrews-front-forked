import { request } from '@/lib/clientApi/request';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';

import { ResponseBody } from '@/types/responseBody';

import { TechStack } from '@/types/data/techStack';

export type ProjectInfoSummary = {
  projectId: bigint;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyStacks: TechStack[];
};
export const getProjectPublicInfo = async (
  projectId: bigint,
): Promise<ResponseBody<ProjectInfoSummary>> => {
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
