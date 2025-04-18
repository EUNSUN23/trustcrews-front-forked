import { ApiResult, ProjectAuthMapCode, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getMilestonesQueryKey } from '@/features/project/auth/myProject/jobs/service/milestone/getMilestones';

export type MilestoneAddReqData = {
  projectId: bigint;
  startDate: string;
  endDate: string;
  content: string;
  authMap: ProjectAuthMapCode;
};

const createMilestoneInputSchema = z.object({
  startDate: z.string().min(1, { message: '마일스톤 내용을 입력해 주세요' }),
  endDate: z.string().min(1, { message: '시작날짜를 선택해 주세요' }),
  content: z.string().min(1, { message: '종료날짜를 선택해 주세요' }),
});

type CreateMilestoneInput = z.infer<typeof createMilestoneInputSchema>;

export const createMilestone = async (
  projectId: bigint,
  authMap: ProjectAuthMapCode,
  reqData: CreateMilestoneInput,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/project/milestone`, {
    ...reqData,
    projectId,
    authMap,
  });
};

type CreateMilestoneRes = ApiResult<typeof createMilestone>;

export const useCreateMilestone = (
  projectId: bigint,
  authMap: ProjectAuthMapCode,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: CreateMilestoneRes) => void;
    onError?: (res: CreateMilestoneRes) => void;
  },
) => {
  // const setSnackbar = useSetRecoilState(snackbarState);
  // const resetMilestoneAddModalState = useResetRecoilState(
  //   milestoneAddModalStateStore,
  // );
  // const resetMilestoneAddData = useResetRecoilState(milestoneAddDataStateStore);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqData: MilestoneAddReqData) =>
      createMilestone(projectId, authMap, reqData),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        // setSnackbar({
        //   show: true,
        //   content: '마일스톤을 생성했습니다.',
        //   type: 'SUCCESS',
        // });
        // resetMilestoneAddModalState();
        // resetMilestoneAddData();
        await queryClient.invalidateQueries({
          queryKey: getMilestonesQueryKey,
        });
        onSuccess?.(res);
      } else {
        onError?.(res);
        // setSnackbar({ show: true, content: data.message, type: 'ERROR' });
      }
    },
    onError: (err) => {
      console.error(err.cause);
      onError?.({
        result: 'fail',
        data: null,
        message: '마일스톤 삭제 중 오류가 발생했습니다.',
      });
      // setSnackbar({ show: true, content: err.message, type: 'ERROR' });
    },
  });
};
