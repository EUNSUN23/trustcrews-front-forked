import { request } from '@/utils/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { TASKS_QUERY_KEY } from '@/features/projectJobs/private/service/task/getTaskList';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const updateTaskInputSchema = z.object({
  summary: z.string().min(1, { message: '업무 제목을 입력해주세요' }),
  startDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  endDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  todo: z.string().min(1, { message: '할 일을 입력해주세요.' }),
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
  auth: string,
): Promise<ResponseBody<null>> => {
  return await request('PATCH', '/api/projectJobs/auth/task', {
    ...data,
    workId,
    authMap: auth,
  });
};

type UpdateTaskRes = ApiResult<typeof updateTask>;

export const useUpdateTask = (
  workId: bigint,
  auth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateTaskRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskInput) => updateTask(data, workId, auth),
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

export default useUpdateTask;
