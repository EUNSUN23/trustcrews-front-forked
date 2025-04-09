import { request } from '@/lib/clientApi/request';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/utils/type';

const passwordRegex: RegExp =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,12}$/;

export const loginInputSchema = z.object({
  email: z.string({ required_error: '이메일을 입력해주세요.' }),
  password: z.string({ required_error: '비밀번호를 입력해주세요.' }),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const login = async (param: LoginInput): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/user/login', param);
};

export const useLogin = ({
  onSuccess,
}: {
  onSuccess?: (res: ResponseBody<null>) => void;
}) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      onSuccess?.(res);
    },
  });
};
