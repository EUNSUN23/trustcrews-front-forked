import { request } from '@/utils/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TASKS_QUERY_KEY } from '@/features/projectJobs/private/service/task/getTaskList';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type WorkCompleteRequestDto = {
  workId: bigint;
  auth: string;
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
  auth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (res: CompleteTaskRes) => void;
    onError: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();

  const { mutate: completeTask, isPending: isUpdating } = useMutation({
    mutationFn: () => workComplete({ workId, auth }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });

  return { completeTask, isUpdating };
};
