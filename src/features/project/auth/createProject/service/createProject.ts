import { ApiResult, ResponseBody } from '@/utils/type';
import { z } from 'zod';
import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';

export const createProjectInputSchema = z.object({
  name: z.string().nonempty({ message: '프로젝트 이름을 입력해 주세요.' }),
  subject: z.string().nonempty({ message: '프로젝트 주제를 입력해 주세요.' }),
  startDate: z
    .string()
    .nonempty({ message: '프로젝트 시작 날짜를 입력해 주세요.' }),
  endDate: z
    .string()
    .nonempty({ message: '프로젝트 종료 날짜를 입력해 주세요.' }),
  technologyIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '프로젝트 기술스택을 선택해 주세요.' })
    .readonly(),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

type CreateProjectResponseData = { projectId: bigint } | null;

export const createProject = async (
  data: CreateProjectInput,
): Promise<ResponseBody<CreateProjectResponseData>> => {
  return await request('POST', 'api/project/create', data);
};

type CreateProjectRes = ApiResult<typeof createProject>;

export const useCreateProject = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: CreateProjectRes) => void;
  onError?: (res: CreateProjectRes) => void;
}) => {
  return useMutation({
    mutationFn: (data: CreateProjectInput) => createProject(data),
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
        message: '프로젝트 생성 중 오류가 발생했습니다,',
      });
    },
  });
};
