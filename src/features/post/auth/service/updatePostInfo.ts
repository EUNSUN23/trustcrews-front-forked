import { ProjectAuthCode } from '@/features/project/auth/projectManageAuth/types/projectAuth';
import { request } from '@/lib/clientApi/request';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST_PUBLIC_INFO_QUERY_KEY } from '@/features/post/public/service/getPostPublicInfo';

import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export type ProjectSettingBoardUpdReqData = {
  projectId: bigint;
  boardId: bigint;
  authMap: ProjectAuthCode;
  title: string;
  content: string;
  recruitmentStatus: boolean | null;
  contact: string;
  positionIds: bigint[];
};

export const updatePostInfoInputSchema = z.object({
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

export type UpdatePostInfoInput = z.infer<typeof updatePostInfoInputSchema>;

export const updatePostInfo = async (
  projectId: bigint,
  boardId: bigint,
  userAuth: string,
  data: UpdatePostInfoInput,
): Promise<ResponseBody<null>> => {
  return await request('PUT', '/api/project/setting/board', {
    ...data,
    projectId,
    boardId,
    authMap: userAuth,
  });
};

type UpdatePostInfoRes = ApiResult<typeof updatePostInfo>;

// todo - 백엔드 성공 메세지
export const useUpdatePostInfo = (
  projectId: bigint,
  boardId: bigint,
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
    mutationFn: (data: UpdatePostInfoInput) =>
      updatePostInfo(projectId, boardId, userAuth, data),
    onSuccess: async (res) => {
      const { result } = res;
      if (result === 'success') {
        await queryClient.invalidateQueries({
          queryKey: [POST_PUBLIC_INFO_QUERY_KEY],
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
