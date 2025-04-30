import { request } from '@/lib/clientApi/request';
import { ApiResult, ResponseBody } from '@/utils/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskListQueryKey } from '@/features/project/auth/jobs/service/task/getTaskList';
import { ProjectAuthCode } from '@/features/project/auth/projectManageAuth/types/projectAuth';

export type TaskDeleteReqData = {
  workId: bigint;
  auth: ProjectAuthCode;
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
