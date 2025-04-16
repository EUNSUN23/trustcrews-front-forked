import { request } from '@/lib/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResult, ResponseBody } from '@/utils/type';

export const applyProject = async (
  projectId: bigint,
  positionId: bigint,
): Promise<ResponseBody<null>> => {
  return await request('POST', `/api/project/apply?projectId=${projectId}`, {
    positionId,
    projectId,
    apply_message: '기본 메세지',
  });
};

type ApplyProjectRes = ApiResult<typeof applyProject>;

export const useApplyProject = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: ApplyProjectRes) => void;
  onError?: (res: ApplyProjectRes) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      positionId,
    }: {
      projectId: bigint;
      positionId: bigint;
    }) => applyProject(projectId, positionId),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: ['userProjectNotice'],
        });
        onSuccess?.(res);
      } else {
        onError?.(res);
      }
    },
    onError: (error) => {
      console.error(error);
      onError?.({
        result: 'fail',
        data: null,
        message: '프로젝트 지원 중 문제가 발생했습니다.',
      });
    },
  });
};
