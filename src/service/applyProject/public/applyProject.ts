import { request } from '@/utils/clientApi/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';
import { MY_PROJECT_APPLIES_QUERY_KEY } from '@/features/myProjectApplies/private/service/getMyProjectApplies';

export const applyProject = async (
  projectId: bigint | number,
  positionId: bigint | number,
): Promise<ResponseBody<null>> => {
  return await request(
    'POST',
    `/api/projectApply/auth?projectId=${projectId}`,
    {
      positionId,
      projectId,
      apply_message: '기본 메세지',
    },
  );
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
      projectId: bigint | number;
      positionId: bigint | number;
    }) => applyProject(projectId, positionId),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: [MY_PROJECT_APPLIES_QUERY_KEY],
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
