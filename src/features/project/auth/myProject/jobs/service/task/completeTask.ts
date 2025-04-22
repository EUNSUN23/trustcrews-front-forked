import { ApiResult, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskListQueryKey } from '@/features/project/auth/myProject/jobs/service/task/getTaskList';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';

export type WorkCompleteRequestDto = {
  workId: bigint;
  auth: ProjectAuthCode;
};

export const workComplete = async (
  reqData: WorkCompleteRequestDto,
): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/project/work/complete', {
    ...reqData,
    authMap: reqData.auth,
  });
};

type CompleteTaskRes = ApiResult<typeof workComplete>;

export const useCompleteTask = (
  workId: bigint,
  auth: ProjectAuthCode,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (res: CompleteTaskRes) => void;
    onError: (res: CompleteTaskRes) => void;
  },
) => {
  const queryClient = useQueryClient();

  const { mutate: completeTask, isPending: isUpdating } = useMutation({
    mutationFn: () => workComplete({ workId, auth }),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: [getTaskListQueryKey],
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
        message: '프로세스 수행중 오류가 발생했습니다.',
      });
    },
  });

  return { completeTask, isUpdating };
};
