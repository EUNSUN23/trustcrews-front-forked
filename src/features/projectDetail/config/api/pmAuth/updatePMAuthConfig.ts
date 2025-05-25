import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ResponseBody } from '@/shared/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const updatePMAuthConfigInputSchema = z.object({
  crewPMAuth: z
    .string()
    .nonempty({ message: '프로젝트 권한을 선택해 주세요.' }),
});

export type UpdatePMAuthConfigInput = z.infer<
  typeof updatePMAuthConfigInputSchema
>;

export const updatePMAuthConfig = async (
  projectId: bigint,
  crewId: bigint,
  userPMAuth: string,
  data: UpdatePMAuthConfigInput,
): Promise<ResponseBody<null>> => {
  return request('PUT', '/api/projectConfig/auth/pmAuth', {
    ...data,
    projectId,
    crewId,
    userPMAuth,
  });
};

type UpdatePMAuthConfigRes = ApiResult<typeof updatePMAuthConfig>;

export const useUpdatePMAuthConfig = (
  projectId: bigint,
  crewId: bigint,
  userPMAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdatePMAuthConfigRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useMutation({
    mutationFn: (data: UpdatePMAuthConfigInput) =>
      updatePMAuthConfig(projectId, crewId, userPMAuth, data),
    onSuccess: (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
