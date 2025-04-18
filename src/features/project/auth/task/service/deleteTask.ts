import { request } from '@/lib/clientApi/request';
import { ApiResult, ProjectAuthMapCode, ResponseBody } from '@/utils/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type TaskDeleteReqData = {
  workId: bigint;
  authMap: ProjectAuthMapCode;
};

/**
 * 업무 삭제
 * @param reqData
 */
export const deleteTask = async (
  reqData: TaskDeleteReqData,
): Promise<ResponseBody<null>> => {
  return await request('DELETE', '/api/project/work', reqData);
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
        await queryClient.invalidateQueries({ queryKey: ['taskList'] });
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
