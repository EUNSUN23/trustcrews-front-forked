import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';
import { VoteOptionCode } from '@/features/project/auth/myProject/vote/types';
import { z } from 'zod';
import { ApiResult } from '@/utils/type';

export type VoteFWReqData = {
  projectId: bigint;
  voteId: bigint;
  fw_member_id: bigint;
  fw_member_auth: ProjectAuthCode;
  authMap: ProjectAuthCode;
  answer: VoteOptionCode;
};

export type FWVoteBaseParams = {
  projectId: bigint;
  voteId: bigint;
  fw_member_id: bigint;
  fw_member_auth: ProjectAuthCode;
  authMap: ProjectAuthCode;
};

export const fWVoteAnswerInputSchema = z.object({
  answer: z.string().nonempty({ message: '찬성 혹은 반대를 선택해주세요.' }),
});

export type FWVoteAnswerInput = z.infer<typeof fWVoteAnswerInputSchema>;

type FWVoteReqParams = FWVoteBaseParams & FWVoteAnswerInput;

export const voteForProjectFWithdraw = async (data: FWVoteReqParams) => {
  return await request('POST', '/api/project/vote/fwithdraw', data);
};

type VoteFWRes = ApiResult<typeof voteForProjectFWithdraw>;

export const useForceWithdrawVote = (
  baseParams: FWVoteBaseParams,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: VoteFWRes) => void;
    onError?: (res: VoteFWRes) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FWVoteAnswerInput) =>
      voteForProjectFWithdraw({ ...baseParams, ...data }),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: ['vAlertFWDetailData'],
        });
        onSuccess?.(res);
      } else {
        onError?.(res);
      }
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        console.error(err.cause);
        onError?.({
          result: 'fail',
          data: null,
          message: '투표 중 오류가 발생했습니다.',
        });
      }
    },
  });
};
