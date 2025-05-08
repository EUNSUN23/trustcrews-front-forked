import { request } from '@/utils/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMilestonesQueryKey } from '@/features/project/auth/projectJobs/service/milestone/getMilestones';

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
    onError?: (res: DeleteMilestoneRes) => void;
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
      if (res.message === 'success') {
        await queryClient.invalidateQueries({
          queryKey: getMilestonesQueryKey,
        });
        onSuccess?.(res);
      } else {
        onError?.(res);
      }
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.({
        result: 'fail',
        data: null,
        message: '마일스톤 삭제중 오류가 발생했습니다.',
      });
    },
  });
};
