import { ApiResult, ResponseBody } from '@/utils/type';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { request } from '@/lib/clientApi/request';

export const loginInputSchema = z.object({
  email: z.string().min(1, { message: '이메일을 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const login = async (param: LoginInput): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/user/login', param);
};

type LoginRes = ApiResult<typeof login>;

export const useLogin = ({
  onSuccess,
}: {
  onSuccess?: (res: LoginRes) => void;
}) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      onSuccess?.(res);
    },
  });
};
