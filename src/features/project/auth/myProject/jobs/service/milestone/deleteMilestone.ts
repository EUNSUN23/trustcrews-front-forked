import { ApiResult, ProjectAuthMapCode, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMilestonesQueryKey } from '@/features/project/auth/myProject/jobs/service/milestone/getMilestones';

export type DeleteMilestoneReqData = {
  milestoneId: bigint;
  projectId: bigint;
  authMap: ProjectAuthMapCode;
};

export const deleteMilestone = async (
  reqData: DeleteMilestoneReqData,
): Promise<ResponseBody<null>> => {
  return await request('DELETE', `/api/project/milestone`, reqData);
};

type DeleteMilestoneRes = ApiResult<typeof deleteMilestone>;

export const useDeleteMilestone = (
  projectId: bigint,
  authMap: ProjectAuthMapCode,
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
        // resetActiveMilestone();
        // setSnackBar({
        //   show: true,
        //   content: '마일스톤을 삭제했습니다.',
        //   type: 'INFO',
        // });
        onSuccess?.(res);
      } else {
        onError?.(res);
        // setSnackBar({
        //   show: true,
        //   content: '프로세스 수행중 에러가 발생했습니다.',
        //   type: 'ERROR',
        // });
      }
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.({
        result: 'fail',
        data: null,
        message: '마일스톤 삭제중 오류가 발생했습니다.',
      });
      // setSnackBar({
      //   show: true,
      //   content: '프로세스 수행중 에러가 발생했습니다.',
      //   type: 'ERROR',
      // });
    },
  });
};
