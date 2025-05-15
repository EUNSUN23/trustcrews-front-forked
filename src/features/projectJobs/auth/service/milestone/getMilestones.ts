import { request } from '@/utils/clientApi/request';
import { useSuspenseQuery } from '@tanstack/react-query';
import { MilestoneInfo } from '@/features/projectJobs/auth/types/milestone';
import { ResponseBody } from '@/types/responseBody';
import sortByStartDate from '@/utils/sortByStartDate';

export const getMilestones = async (
  projectId: string,
): Promise<ResponseBody<MilestoneInfo[]>> => {
  const resBody = await request(
    'GET',
    `/api/projectJobs/auth/milestone?projectId=${projectId}`,
  );

  return {
    ...resBody,
    data: resBody.data
      ? sortByStartDate(resBody.data!, 'asc').map((v, index) => ({
          ...v,
          index,
        }))
      : [],
  };
};

export const MILESTONES_QUERY_KEY = 'milestoneList';

export const useMilestones = (projectId: string) => {
  return useSuspenseQuery({
    queryKey: [MILESTONES_QUERY_KEY, projectId],
    queryFn: () => getMilestones(projectId),
  });
};
