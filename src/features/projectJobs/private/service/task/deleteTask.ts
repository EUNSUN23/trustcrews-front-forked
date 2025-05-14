import { request } from '@/utils/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TASKS_QUERY_KEY } from '@/features/projectJobs/private/service/task/getTaskList';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type TaskDeleteReqData = {
  workId: bigint;
  auth: string;
};

export const deleteTask = async (
  reqData: TaskDeleteReqData,
): Promise<ResponseBody<null>> => {
  return await request('DELETE', '/api/project/work', {
    ...reqData,
    authMap: reqData.auth,
  });
};

type DeleteTaskRes = ApiResult<typeof deleteTask>;

export const useDeleteTask = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: DeleteTaskRes) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqData: TaskDeleteReqData) => deleteTask(reqData),
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
};
