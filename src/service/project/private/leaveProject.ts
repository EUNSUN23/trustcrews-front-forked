import { request } from '@/utils/clientApi/request';
import { ProjectAuthCode } from '@/types/data/projectAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CREW_NOTICE_LIST_QUERY_KEY } from '@/features/projectNotice/private/service/getCrewNoticeList';
import { CREW_LIST_QUERY_KEY } from '@/features/projectCrews/private/service/getProjectCrewList';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

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

// todo - 백엔드 성공 메세지
export const useLeaveProject = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: LeaveProjectRes) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveProjectInput) => leaveProject(data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [CREW_NOTICE_LIST_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [CREW_LIST_QUERY_KEY],
        refetchType: 'all',
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
