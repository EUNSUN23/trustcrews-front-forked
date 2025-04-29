import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';
import { VoteOptionCode } from '@/features/project/auth/myProject/vote/types';
import { z } from 'zod';
import { ApiResult } from '@/utils/type';
import { RECRUIT_NOTICE_QUERY_KEY } from '@/features/project/auth/myProject/notice/service/getRCVoteNotice';

export type VoteRecruitReqData = {
  voteId: bigint;
  applyId: bigint;
  authMap: ProjectAuthCode;
  answer: VoteOptionCode;
};

export type RecruitVoteBaseParams = {
  voteId: bigint;
  applyId: bigint;
  authMap: ProjectAuthCode;
};

const recruitVoteAnswerInputSchema = z.object({
  answer: z.string().nonempty({ message: '찬성 혹은 반대를 선택해주세요.' }),
});

type RecruitVoteAnswerInput = z.infer<typeof recruitVoteAnswerInputSchema>;

type VoteRecruitReqParams = RecruitVoteBaseParams & RecruitVoteAnswerInput;

export const recruitVote = async (reqData: VoteRecruitReqParams) => {
  return await request('POST', '/api/project/vote/recruit', reqData);
};

type VoteRecruitRes = ApiResult<typeof recruitVote>;

export const useRecruitVote = (
  baseParams: RecruitVoteBaseParams,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: VoteRecruitRes) => void;
    onError?: (res: VoteRecruitRes) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RecruitVoteAnswerInput) =>
      recruitVote({ ...baseParams, ...data }),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: [RECRUIT_NOTICE_QUERY_KEY],
        });
        onSuccess?.(res);
      } else {
        onError?.(res);
      }
    },
    onError: (err: unknown) => {
      if (err instanceof Error) console.error(err.cause);
      onError?.({
        result: 'fail',
        data: null,
        message: '투표 중 오류가 발생했습니다.',
      });
    },
  });
};
