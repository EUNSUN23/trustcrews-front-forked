import { request } from '@/utils/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const endProject = async (
  projectId: bigint,
): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/project/end', { projectId });
};

type EndProjectRes = ApiResult<typeof endProject>;

// todo - 백엔드 성공 메세지
export const useEndProject = (
  projectId: bigint,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: EndProjectRes) => void;
    onError?: (res: EndProjectRes) => void;
  },
) => {
  return useMutation({
    mutationFn: () => endProject(projectId),
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
        message: '프로젝트 종료 중 오류가 발생했습니다.',
      });
    },
  });
};
