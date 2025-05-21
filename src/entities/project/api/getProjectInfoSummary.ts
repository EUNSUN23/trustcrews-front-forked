import { useSuspenseQuery } from '@tanstack/react-query';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { ResponseBody } from '@/types/responseBody';
import { TechStack } from '@/types/data/techStack';
import { request } from '@/utils/clientApi/request';

export type ProjectInfoSummary = {
  projectId: bigint;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyStacks: TechStack[];
};

export const getProjectInfoSummary = async (
  projectId: bigint,
): Promise<ResponseBody<ProjectInfoSummary>> => {
  return await request('GET', `/api/project/public?projectId=${projectId}`);
};

export const PROJECT_INFO_SUMMARY_QUERY_KEY = 'projectInfoSummary';

export const useProjectSummaryInfo = (projectId: bigint) => {
  return useSuspenseQuery({
    queryKey: [PROJECT_INFO_SUMMARY_QUERY_KEY, bigIntToString(projectId)],
    queryFn: () => getProjectInfoSummary(projectId),
  });
};
