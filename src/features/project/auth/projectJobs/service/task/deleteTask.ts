import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskListQueryKey } from '@/features/project/auth/projectJobs/service/task/getTaskList';

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
  onError?: (res: DeleteTaskRes) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqData: TaskDeleteReqData) => deleteTask(reqData),
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
        message: '업무삭제 중 오류가 발생했습니다.',
      });
    },
  });
};
