import { request } from '@/utils/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MILESTONES_QUERY_KEY } from '@/features/projectJobs/private/service/milestone/getMilestones';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type DeleteMilestoneReqData = {
  milestoneId: bigint;
  projectId: bigint;
  authMap: string;
};

export const deleteMilestone = async (
  reqData: DeleteMilestoneReqData,
): Promise<ResponseBody<null>> => {
  return await request('DELETE', `/api/project/milestone`, reqData);
};

type DeleteMilestoneRes = ApiResult<typeof deleteMilestone>;

export const useDeleteMilestone = (
  projectId: bigint,
  authMap: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: DeleteMilestoneRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mileStoneId: bigint) =>
      deleteMilestone({
        projectId: projectId,
        milestoneId: mileStoneId,
        authMap: authMap,
      }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [MILESTONES_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
