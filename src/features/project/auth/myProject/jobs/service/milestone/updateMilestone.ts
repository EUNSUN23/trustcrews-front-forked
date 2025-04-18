import { z } from 'zod';
import { ApiResult, ProjectAuthMapCode, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMilestonesQueryKey } from '@/features/project/auth/myProject/jobs/service/milestone/getMilestones';

export const updateMilestoneSchema = z.object({
  content: z.string().nonempty('마일스톤 내용을 입력해 주세요'),
  startDate: z.string().nonempty('시작날짜를 선택해 주세요'),
  endDate: z.string().nonempty('종료날짜를 선택해 주세요'),
});

export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;

export const updateMilestone = async (
  milestoneId: bigint,
  authMap: ProjectAuthMapCode,
  data: UpdateMilestoneInput,
): Promise<ResponseBody<null>> => {
  return await request('PATCH', `/api/project/milestone`, {
    ...data,
    milestoneId,
    authMap,
  });
};

type UpdateMilestoneRes = ApiResult<typeof updateMilestone>;

export const useUpdateMilestone = (
  milestoneId: bigint,
  authMap: ProjectAuthMapCode,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateMilestoneRes) => void;
    onError?: (res: UpdateMilestoneRes) => void;
  },
) => {
  const queryClient = useQueryClient();

  // 스낵바 상태 및 Recoil 상태 설정 로직 주석 처리
  // const setSnackBar = useSetRecoilState(snackbarState);
  // const resetMilestoneModDataState = useResetRecoilState(
  //   milestoneModDataStateStore,
  // );
  // const resetMilestoneModalState = useResetRecoilState(
  //   milestoneModModalStateStore,
  // );
  // const resetActiveMilestone = useResetRecoilState(
  //   milestoneActiveStateStore,
  // );

  return useMutation({
    mutationFn: (data: UpdateMilestoneInput) =>
      updateMilestone(milestoneId, authMap, data),
    onSuccess: async (res) => {
      if (res.message === 'success') {
        await queryClient.invalidateQueries({
          queryKey: getMilestonesQueryKey,
        });

        // Recoil 상태 초기화
        // resetMilestoneModDataState();
        // resetMilestoneModalState();
        // resetActiveMilestone();

        // 스낵바 설정
        // setSnackBar({
        //   show: true,
        //   content: '마일스톤을 수정했습니다.',
        //   type: 'SUCCESS',
        // });

        onSuccess?.(res);
      } else {
        // 스낵바 설정
        // setSnackBar({ show: true, content: res.message, type: 'ERROR' });

        onError?.(res);
      }
    },
    onError: (error) => {
      console.error(error.cause);

      // 스낵바 설정
      // setSnackBar({
      //   show: true,
      //   content: '마일스톤 수정 중 오류가 발생했습니다.',
      //   type: 'ERROR',
      // });

      onError?.({
        result: 'fail',
        data: null,
        message: '마일스톤 수정 중 오류가 발생했습니다.',
      });
    },
  });
};
