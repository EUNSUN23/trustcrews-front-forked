import { ProjectAuthCode } from '@/features/project/auth/projectManageAuth/types/projectAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { request } from '@/utils/clientApi/request';
import { PROJECT_PUBLIC_INFO_QUERY_KEY } from '@/features/project/public/service/getProjectPublicInfo';

import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type ProjectSettingInfoUpdReqData = {
  projectId: bigint;
  authMap: ProjectAuthCode;
  projectName: string;
  projectSubject: string;
  startDate: string;
  endDate: string;
  technologyIds: bigint[];
};

const updateProjectInfoInputSchema = z.object({
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

export type UpdateProjectInfoInput = z.infer<
  typeof updateProjectInfoInputSchema
>;

export const updateProjectInfo = async (
  projectId: bigint,
  userAuth: string,
  data: UpdateProjectInfoInput,
): Promise<ResponseBody<null>> => {
  return await request('PUT', '/api/project/setting/info', {
    ...data,
    projectId,
    authMap: userAuth,
  });
};

type UpdateProjectInfoRes = ApiResult<typeof updateProjectInfo>;

// todo - 백엔드 성공 메세지
export const useUpdateProjectInfo = (
  projectId: bigint,
  userAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdateProjectInfoRes) => void;
    onError?: (res: UpdateProjectInfoRes) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectInfoInput) =>
      updateProjectInfo(projectId, userAuth, data),
    onSuccess: async (res) => {
      if (res.result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: [PROJECT_PUBLIC_INFO_QUERY_KEY],
        });
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
        message: '게시글 업데이트 중 오류가 발생했습니다.',
      });
    },
  });
};
