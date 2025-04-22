import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { ApiResult, ResponseBody } from '@/utils/type';
import { getTaskListQueryKey } from '@/features/project/auth/myProject/jobs/service/task/getTaskList';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';

export const updateTaskInputSchema = z.object({
  content: z.string().min(1, { message: '업무 제목을 입력해주세요' }),
  startDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  endDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  contentDetail: z.string().min(1, { message: '할 일을 입력해주세요.' }),
  assignedUserId: z
    .bigint()
    .or(z.number())
    .refine((val) => val, { message: '업무 담당자를 선택해 주세요' }),
  progressStatus: z.string().min(1, { message: '진행 상황을 입력해주세요.' }),
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

export const updateTask = async (
  data: UpdateTaskInput,
  workId: bigint,
  auth: ProjectAuthCode,
): Promise<ResponseBody<null>> => {
  return await request('PATCH', '/api/project/work', {
    ...data,
    workId,
    authMap: auth,
  });
};

type UpdateTaskRes = ApiResult<typeof updateTask>;

export const useUpdateTask = (
  workId: bigint,
  auth: ProjectAuthCode,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateTaskRes) => void;
    onError?: (res: UpdateTaskRes) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskInput) => updateTask(data, workId, auth),
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

export default useUpdateTask;
