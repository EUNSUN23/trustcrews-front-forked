import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { request } from '@/utils/clientApi/request';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const loginInputSchema = z.object({
  email: z.string().min(1, { message: '이메일을 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const login = async (
  param: LoginInput,
): Promise<ResponseBody<bigint | number>> => {
  return await request('POST', '/api/login', param);
};

type LoginRes = ApiResult<typeof login>;

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: LoginRes) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      onSuccess?.(res);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
