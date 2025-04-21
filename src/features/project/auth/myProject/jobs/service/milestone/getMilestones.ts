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
  const {
    data: { data: milestoneList },
  } = useSuspenseQuery({
    queryKey: [...getMilestonesQueryKey, projectId],
    queryFn: () => getMilestones(projectId),
    staleTime: 0,
  });

  const activeMilestone = milestoneList[0];
  const activeMilestoneId = activeMilestone.milestoneId;
  const activeMilestoneIndex = activeMilestone.index;

  return {
    milestoneList,
    activeMilestone,
    activeMilestoneId,
    activeMilestoneIndex,
  };
};
