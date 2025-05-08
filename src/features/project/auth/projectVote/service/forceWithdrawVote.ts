import { request } from '@/utils/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { FWVOTE_NOTICE_LIST_QUERY_KEY } from '@/features/project/auth/projectNotice/service/getFWVoteNoticeList';
import { FWVOTE_NOTICE_QUERY_KEY } from '@/features/project/auth/projectNotice/service/getFWVoteNotice';

import { ApiResult } from '@/shared/types/apiResult';

export type FWVoteBaseParams = {
  projectId: bigint;
  voteId: bigint;
  crewId: bigint;
  crewAuth: string;
  userAuth: string;
};

export const fWVoteAnswerInputSchema = z.object({
  answer: z.string().nonempty({ message: '찬성 혹은 반대를 선택해주세요.' }),
});

export type FWVoteAnswerInput = z.infer<typeof fWVoteAnswerInputSchema>;

type FWVoteReqParams = FWVoteBaseParams & FWVoteAnswerInput;

export const voteForProjectFWithdraw = async (data: FWVoteReqParams) => {
  return await request('POST', '/api/project/vote/fwithdraw', {
    ...data,
    fw_member_id: data.crewId,
    fw_member_auth: data.crewAuth,
    authMap: data.userAuth,
  });
};

type VoteFWRes = ApiResult<typeof voteForProjectFWithdraw>;

// todo - message 백엔드처리
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
          queryKey: [FWVOTE_NOTICE_LIST_QUERY_KEY],
        });

        await queryClient.invalidateQueries({
          queryKey: [FWVOTE_NOTICE_QUERY_KEY],
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
