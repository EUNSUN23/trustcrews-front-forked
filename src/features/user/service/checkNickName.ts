import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { NICKNAME_REGEX } from '@/constants/validationRegex';

import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const checkNicknameInputSchema = z
  .string()
  .min(1, { message: '닉네임을 입력해주세요.' })
  .regex(NICKNAME_REGEX, {
    message: '닉네임은 6~10자로, 영문과 숫자를 포함해야합니다.',
  });

type CheckNicknameInput = z.infer<typeof checkNicknameInputSchema>;

export const checkNickname = async (
  nickname: CheckNicknameInput,
): Promise<ResponseBody<null>> => {
  return await request('GET', `/api/checkNickname?nickname=${nickname}`);
};

type CheckNicknameRes = ApiResult<typeof checkNickname>;

export const useCheckNickname = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: CheckNicknameRes) => void;
  onError?: (res: CheckNicknameRes) => void;
}) => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
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
        message: '닉네임 중복체크 중 오류가 발생했습니다.',
      });
    },
  });
};
