import { request } from '@/lib/clientApi/request';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';
import { useMutation } from '@tanstack/react-query';
import { ApiResult, ResponseBody } from '@/utils/type';
import { z } from 'zod';

export const createCrewFWVoteInputSchema = z.object({
  reason: z.string().nonempty({ message: '강제탈퇴 사유를 선택해주세요.' }),
});

export type CreateCrewFWVoteReason = z.infer<
  typeof createCrewFWVoteInputSchema
>;

type CreateCrewFWVoteBaseParam = {
  projectId: bigint;
  crewId: bigint;
  crewPMAuth: ProjectAuthCode;
  userPMAuth: ProjectAuthCode;
};

export const createCrewFWVote = async (
  baseParam: CreateCrewFWVoteBaseParam,
  reason: CreateCrewFWVoteReason,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/project/alert/vote/fwithdraw`, {
    ...baseParam,
    reason,
  });
};

type CreateCrewFWVoteRes = ApiResult<typeof createCrewFWVote>;

export const useCreateCrewFWVote = (
  baseParam: CreateCrewFWVoteBaseParam,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: CreateCrewFWVoteRes) => void;
    onError?: (res: CreateCrewFWVoteRes) => void;
  },
) => {
  return useMutation({
    mutationFn: (reason: CreateCrewFWVoteReason) =>
      createCrewFWVote(baseParam, reason),
    onSuccess: (res) => {
      if (res.result === 'success') {
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
        message: '강제투표 생성 중 오류가 발생했습니다.',
      });
    },
  });
};
