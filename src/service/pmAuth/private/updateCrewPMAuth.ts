import { request } from '@/utils/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const updateCrewPMAuthInputSchema = z.object({
  crewAuth: z.string().nonempty({ message: '프로젝트 권한을 선택해 주세요.' }),
});

export type UpdateCrewPMAuthInput = z.infer<typeof updateCrewPMAuthInputSchema>;

export const updateCrewPMAuth = async (
  projectId: bigint,
  crewId: bigint,
  userAuth: string,
  data: UpdateCrewPMAuthInput,
): Promise<ResponseBody<null>> => {
  return request('PUT', '/api/project/setting/crewAuth', {
    projectId,
    projectMemberId: crewId,
    authMap: userAuth,
    projectMemberAuth: data.crewAuth,
  });
};

type UpdateCrewPMAuthRes = ApiResult<typeof updateCrewPMAuth>;

export const useUpdateCrewPMAuth = (
  projectId: bigint,
  crewId: bigint,
  userAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateCrewPMAuthRes) => void;
    onError?: (res: UpdateCrewPMAuthRes) => void;
  },
) => {
  return useMutation({
    mutationFn: (data: UpdateCrewPMAuthInput) =>
      updateCrewPMAuth(projectId, crewId, userAuth, data),
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
        message: '권한 수정 중 오류가 발생했습니다.',
      });
    },
  });
};
