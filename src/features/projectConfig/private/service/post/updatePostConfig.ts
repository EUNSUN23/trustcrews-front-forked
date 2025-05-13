import { request } from '@/utils/clientApi/request';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST_DETAIL_QUERY_KEY } from '@/service/post/public/getPostDetail';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';
import { POST_CONFIG_QUERY_KEY } from '@/features/projectConfig/private/service/post/getPostConfig';

export const updatePostConfigInputSchema = z.object({
  title: z.string().nonempty({ message: '게시글 제목을 입력해주세요.' }),
  content: z.string().nonempty({ message: '게시글 내용을 입력해주세요.' }),
  recruitmentStatus: z
    .boolean()
    .nullable()
    .refine((val) => val, { message: '모집 상태를 선택해주세요.' }),
  contact: z.string().nonempty({ message: '연락처를 입력해주세요.' }),
  positionIds: z
    .array(z.bigint().or(z.number()))
    .min(1, { message: '모집 포지션을 선택해주세요.' })
    .readonly(),
});

export type UpdatePostConfigInput = z.infer<typeof updatePostConfigInputSchema>;

export const updatePostConfig = async (
  projectId: bigint,
  postId: bigint,
  userAuth: string,
  data: UpdatePostConfigInput,
): Promise<ResponseBody<null>> => {
  return await request('PUT', '/api/projectConfig/post', {
    ...data,
    postId,
    userAuth,
    projectId,
  });
};

type UpdatePostInfoRes = ApiResult<typeof updatePostConfig>;

// todo - 백엔드 성공 메세지
export const useUpdatePostConfig = (
  projectId: bigint,
  postId: bigint,
  userAuth: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: UpdatePostInfoRes) => void;
    onError?: (res: UpdatePostInfoRes) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostConfigInput) =>
      updatePostConfig(projectId, postId, userAuth, data),
    onSuccess: async (res) => {
      const { result } = res;
      if (result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: [POST_CONFIG_QUERY_KEY, POST_DETAIL_QUERY_KEY],
        });
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
        message: '게시글 정보 업데이트 중 오류가 발생했습니다.',
      });
    },
  });
};
