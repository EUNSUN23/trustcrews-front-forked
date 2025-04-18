import { ApiResult, ProjectAuthMapCode, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type WorkCompleteRequestDto = {
  workId: bigint;
  authMap: ProjectAuthMapCode;
};

export const workComplete = async (
  reqData: WorkCompleteRequestDto,
): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/project/work/complete', reqData);
};

type CompleteTaskRes = ApiResult<typeof workComplete>;

export const useCompleteTask = (
  workId: bigint,
  authMap: ProjectAuthMapCode,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (res: CompleteTaskRes) => void;
    onError: (res: CompleteTaskRes) => void;
  },
) => {
  // const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  // const resetModModalState = useResetRecoilState(taskModModalStateStore);
  // const resetModModalData = useResetRecoilState(taskModModalDataStateStore);
  const queryClient = useQueryClient();

  const { mutate: completeTask, isPending: isUpdating } = useMutation({
    mutationFn: (reqData: WorkCompleteRequestDto) => workComplete(reqData),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({ queryKey: ['taskList'] });
        onSuccess?.(res);
        // resetModModalState();
        // resetModModalData();
        // setSuccessSnackbar('업무를 완료했습니다.');
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
        message: '프로세스 수행중 오류가 발생했습니다.',
      });
      // setErrorSnackbar(error.message);
    },
  });

  return { completeTask, isUpdating };
};
