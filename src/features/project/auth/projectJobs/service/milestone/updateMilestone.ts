import { z } from 'zod';
import { ApiResult, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMilestonesQueryKey } from '@/features/project/auth/projectJobs/service/milestone/getMilestones';

export const updateMilestoneSchema = z.object({
  content: z.string().nonempty('마일스톤 내용을 입력해 주세요'),
  startDate: z.string().nonempty('시작날짜를 선택해 주세요'),
  endDate: z.string().nonempty('종료날짜를 선택해 주세요'),
});

export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;

export const updateMilestone = async (
  milestoneId: bigint,
  authMap: string,
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
  authMap: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateMilestoneRes) => void;
    onError?: (res: UpdateMilestoneRes) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMilestoneInput) =>
      updateMilestone(milestoneId, authMap, data),
    onSuccess: async (res) => {
      if (res.message === 'success') {
        await queryClient.invalidateQueries({
          queryKey: getMilestonesQueryKey,
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
        message: '마일스톤 수정 중 오류가 발생했습니다.',
      });
    },
  });
};
