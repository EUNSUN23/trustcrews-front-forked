import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { request } from '@/utils/clientApi/request';
import { PROJECT_INFO_SUMMARY_QUERY_KEY } from '@/service/project/public/getProjectInfoSummary';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';
import { PROJECT_CONFIG_QUERY_KEY } from '@/features/projectConfig/private/service/project/getProjectConfig';

export const updateProjectConfigInputSchema = z.object({
  projectName: z
    .string()
    .nonempty({ message: '프로젝트 이름을 입력해주세요.' }),
  projectSubject: z
    .string()
    .nonempty({ message: '프로젝트 주제를 입력해주세요' }),
  startDate: z
    .string()
    .nonempty({ message: '프로젝트 시작 날짜를 입력해주세요' }),
  endDate: z
    .string()
    .nonempty({ message: '프로젝트 종료 날짜를 입력해주세요' }),
  technologyIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '프로젝트 기술 스택을 선택해주세요.' })
    .readonly(),
});

export type UpdateProjectConfigInput = z.infer<
  typeof updateProjectConfigInputSchema
>;

export const updateProjectConfig = async (
  projectId: bigint,
  userAuth: string,
  data: UpdateProjectConfigInput,
): Promise<ResponseBody<null>> => {
  return await request('PUT', '/api/projectConfig/auth/project', {
    ...data,
    projectId,
    userAuth,
  });
};

type UpdateProjectConfigRes = ApiResult<typeof updateProjectConfig>;

// todo - 백엔드 성공 메세지
export const useUpdateProjectConfig = (
  projectId: bigint,
  userAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateProjectConfigRes) => void;
    onError?: (error: Error) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectConfigInput) =>
      updateProjectConfig(projectId, userAuth, data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [PROJECT_INFO_SUMMARY_QUERY_KEY, PROJECT_CONFIG_QUERY_KEY],
      });
      onSuccess?.(res);
    },
    onError: (error) => {
      console.error(error.cause);
      onError?.(error);
    },
  });
};
