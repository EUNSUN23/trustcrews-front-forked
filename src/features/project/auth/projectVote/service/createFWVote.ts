import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const createCrewFWVoteInputSchema = z.object({
  reason: z.string().nonempty({ message: '강제탈퇴 사유를 선택해주세요.' }),
});

export type CreateCrewFWVoteReason = z.infer<
  typeof createCrewFWVoteInputSchema
>;

type CreateCrewFWVoteBaseParam = {
  projectId: bigint;
  crewId: bigint;
  crewPMAuth: string;
  userPMAuth: string;
};

export const createFWVote = async (
  baseParam: CreateCrewFWVoteBaseParam,
  reason: CreateCrewFWVoteReason,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/project/alert/vote/fwithdraw`, {
    ...baseParam,
    ...reason,
  });
};

type CreateCrewFWVoteRes = ApiResult<typeof createFWVote>;

export const useCreateFWVote = (
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
      createFWVote(baseParam, reason),
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
