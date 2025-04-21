import { request } from '@/lib/clientApi/request';
import { sortByStartDate } from '@/utils/common';
import { ResponseBody } from '@/utils/type';
import { useSuspenseQuery } from '@tanstack/react-query';
import { MilestoneInfo } from '@/features/project/auth/myProject/jobs/types/milestone';

export const getMilestones = async (
  projectId: string,
): Promise<ResponseBody<MilestoneInfo[]>> => {
  const resBody = await request(
    'GET',
    `/api/project/milestone?projectId=${projectId}`,
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

export const getMilestonesQueryKey = ['milestoneList'];

export const useMilestones = (projectId: string) => {
  return useSuspenseQuery({
    queryKey: [...getMilestonesQueryKey, projectId],
    queryFn: () => getMilestones(projectId),
  });
};
