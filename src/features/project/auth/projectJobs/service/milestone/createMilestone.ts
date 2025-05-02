import { ApiResult, ResponseBody } from '@/utils/type';
import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getMilestonesQueryKey } from '@/features/project/auth/projectJobs/service/milestone/getMilestones';

export const createMilestoneInputSchema = z.object({
  startDate: z.string().min(1, { message: '마일스톤 내용을 입력해 주세요' }),
  endDate: z.string().min(1, { message: '시작날짜를 선택해 주세요' }),
  content: z.string().min(1, { message: '종료날짜를 선택해 주세요' }),
});

export type CreateMilestoneInput = z.infer<typeof createMilestoneInputSchema>;

export const createMilestone = async (
  projectId: bigint,
  authMap: string,
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
  authMap: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: CreateMilestoneRes) => void;
    onError?: (res: CreateMilestoneRes) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqData: CreateMilestoneInput) =>
      createMilestone(projectId, authMap, reqData),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: getMilestonesQueryKey,
        });
        onSuccess?.(res);
      } else {
        onError?.(res);
      }
    },
    onError: (err) => {
      console.error(err.cause);
      onError?.({
        result: 'fail',
        data: null,
        message: '마일스톤 삭제 중 오류가 발생했습니다.',
      });
    },
  });
};
