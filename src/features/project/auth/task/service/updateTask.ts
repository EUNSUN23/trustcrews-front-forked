import { request } from '@/lib/clientApi/request';
import { CreateTaskInput } from '@/features/project/auth/task/service/createTask';
import { TaskStatusValueType } from '@/app/project/@task/_utils/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { ApiResult, ResponseBody } from '@/utils/type';

export type TaskModifyReqData = CreateTaskInput & {
  // workId: bigint;
  progressStatus: TaskStatusValueType;
  // authMap: ProjectAuthMapCode;
};

export const updateTaskInputSchema = z.object({
  content: z.string().min(1, { message: '업무 제목을 입력해주세요' }),
  startDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  endDate: z.string().min(1, { message: '시작 날짜를 입력해주세요' }),
  contentDetail: z.string().min(1, { message: '할 일을 입력해주세요.' }),
  assignedUserId: z
    .bigint()
    .or(z.number())
    .nullable()
    .refine((val) => val, { message: '업무 담당자를 선택해 주세요' }),
  progressStatus: z.string().min(1, { message: '진행 상황을 입력해주세요.' }),
});

export const updateTask = async (
  data: TaskModifyReqData,
  workId: bigint,
): Promise<ResponseBody<null>> => {
  return await request('PATCH', '/api/project/work', { ...data, workId });
};

type UpdateTaskRes = ApiResult<typeof updateTask>;

export const useUpdateTask = (
  workId: bigint,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateTaskRes) => void;
    onError?: (res: UpdateTaskRes) => void;
  },
) => {
  // const setSnackbar = useSetRecoilState(snackbarState);
  // const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  // const resetTaskModModalState = useResetRecoilState(taskModModalStateStore);
  // const resetTaskModModalData = useResetRecoilState(taskModModalDataStateStore);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskModifyReqData) => updateTask(data, workId),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({ queryKey: ['taskList'] });
        onSuccess?.(res);
        // resetTaskModModalState();
        // resetTaskModModalData();
        // setSuccessSnackbar('업무를 수정했습니다.');
      } else {
        onError?.(res);
        // setErrorSnackbar(res.message);
      }
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.({
        result: 'fail',
        data: null,
        message: '업무삭제 중 오류가 발생했습니다.',
      });
      // setSnackbar({ show: true, type: 'ERROR', content: error.message });
    },
  });
};

export default useUpdateTask;
