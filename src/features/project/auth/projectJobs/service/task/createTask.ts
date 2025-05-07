import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getTaskListQueryKey } from '@/features/project/auth/projectJobs/service/task/getTaskList';

import { ApiResult, ResponseBody } from '@/shared/types/api';

export const createTaskInputSchema = z.object({
  summary: z.string().min(1, { message: '업무 제목을 입력해주세요' }),
  startDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  endDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  todo: z.string().min(1, { message: '할 일을 입력해주세요.' }),
  assignedUserId: z
    .bigint()
    .or(z.number())
    .refine((val) => val, { message: '업무 담당자를 선택해 주세요' }),
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

export const createTask = async (
  projectId: bigint,
  milestoneId: bigint,
  data: CreateTaskInput,
): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/project/work', {
    ...data,
    projectId,
    milestoneId,
  });
};

type CreateTaskRes = ApiResult<typeof createTask>;

export const useCreateTask = (
  projectId: bigint,
  milestoneId: bigint,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: CreateTaskRes) => void;
    onError?: (res: CreateTaskRes) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskInput) =>
      createTask(projectId, milestoneId, data),
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
      console.error(error);
      onError?.({
        result: 'fail',
        data: null,
        message: '업무생성 중 오류가 발생했습니다.',
      });
    },
  });
};

export default useCreateTask;
