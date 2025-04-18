import { request } from '@/lib/clientApi/request';
import { MilestoneInfo, ResponseBody } from '@/utils/type';
import { useSuspenseQuery } from '@tanstack/react-query';

export const getMilestone = async (
  milestoneId: string,
): Promise<ResponseBody<MilestoneInfo>> => {
  return await request('GET', `/api/project/milestone/${milestoneId}`);
};

export const useMilestoneDetail = (milestoneId: string, enabled = true) => {
  return useSuspenseQuery({
    queryKey: ['milestone', milestoneId],
    queryFn: () => getMilestone(milestoneId),
  });
};
