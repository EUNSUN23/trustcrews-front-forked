import { request } from '@/lib/clientApi/request';
import { ProjectAuthCode } from '@/features/project/auth/myProject/global/types/projectAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResult, ResponseBody } from '@/utils/type';

export type LeaveProjectInput = {
  projectId: bigint;
  wMemberId: bigint;
  wMemberAuth: ProjectAuthCode;
};

export const leaveProject = async (
  reqData: LeaveProjectInput,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/project/crews/withdraw`, reqData);
};

type LeaveProjectRes = ApiResult<typeof leaveProject>;

export const useLeaveProject = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: LeaveProjectRes) => void;
  onError?: (res: LeaveProjectRes) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveProjectInput) => leaveProject(data),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({ queryKey: ['noticeList'] });
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
        message: '프로젝트 탈퇴중 오류가 발생했습니다.',
      });
    },
  });
};
