'use client';

import { useState } from 'react';
import Input from '@/components/ui/form/Input';
import FormButton from '@/features/project/auth/shared/ui/form/FormButton';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { ZodError } from 'zod';
import { loginInputSchema, useLogin } from '@/lib/auth/logIn';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { SIMPLE_USER_INFO_QUERY_KEY } from '@/lib/user/getSimpleUserInfo';
import { getMyProjectAppliesQueryKey } from '@/features/projectApply/auth/service/getMyProjectApplies';
import { MY_PROJECTS_QUERY_KEY } from '@/features/project/auth/myProjects/service/getMyProjects';

function LoginForm() {
  const router = useRouter();
  const { setErrorSnackbar, setInfoSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();
  const { mutate: login } = useLogin({
    onSuccess: async (res) => {
      const { result, message } = res;

      if (isEqual(result, 'success')) {
        const invalidateUserInfo = queryClient.invalidateQueries({
          queryKey: [SIMPLE_USER_INFO_QUERY_KEY],
        });
        const invalidateMyProjectList = queryClient.invalidateQueries({
          queryKey: MY_PROJECTS_QUERY_KEY,
        });
        const invalidateProjectNotice = queryClient.invalidateQueries({
          queryKey: getMyProjectAppliesQueryKey,
        });
        await Promise.all([
          invalidateMyProjectList,
          invalidateProjectNotice,
          invalidateUserInfo,
        ]);
        router.replace('/');
        router.refresh();

        setInfoSnackbar(message);
      } else {
        setErrorSnackbar(message);
      }
    },
  });

  const loginWithValidation = () => {
    const param = { email, password };
    try {
      loginInputSchema.parse(param);
    } catch (e) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }
    login(param);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') loginWithValidation();
  };

  return (
    <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-4'>
      <Input
        id='email'
        label='이메일'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyUp={handleKeyDown}
      />
      <Input
        type='password'
        id='password'
        label='비밀번호'
        title='영문, 숫자 포함 6자 이상 입력'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={handleKeyDown}
      />
      <br />
      <FormButton aria-label='로그인 버튼' onClick={loginWithValidation}>
        로그인
      </FormButton>
    </div>
  );
}

export default LoginForm;
