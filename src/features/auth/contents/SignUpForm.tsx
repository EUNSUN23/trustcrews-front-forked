'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/shared/ui/Input';
import TextArea from '@/shared/ui/TextArea';
import FormButton from '@/features/project/auth/shared/ui/form/FormButton';
import NicknameField from '@/components/ui/form/NickNameField';
import TechStackSelect from '@/components/selector/TechStackSelect';
import PositionSelect from '@/components/selector/PositionSelect';
import { ZodError } from 'zod';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { signUpInputScheme, useSignUp } from '@/lib/auth/signUp';
import SelectSkeleton from '@/components/skeleton/SelectSkeleton';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

// todo - NicknameField 제거
const SignUpForm = () => {
  const router = useRouter();
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [positionId, setPositionId] = useState<string>('');
  const [techStackIds, setTechStackIds] = useState<string[]>([]);
  const [intro, setIntro] = useState('');
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  const { mutate: signup } = useSignUp({
    onSuccess: (res) => {
      if (res.result === 'success') {
        setSuccessSnackbar(res.message);
        router.push('/');
      } else {
        setErrorSnackbar(res.message);
      }
    },
  });

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsCheckedNickname(false);
  };

  const signUpWithValidation = () => {
    const formData = {
      email,
      nickname,
      password: {
        init: password,
        confirm: passwordConfirmation,
      },
      positionId: numStrToBigInt(positionId),
      techStackIds: techStackIds.map((item) => numStrToBigInt(item)),
      intro,
      isCheckedNickname,
    };

    try {
      signUpInputScheme.parse(formData);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }

    signup(formData);
  };

  return (
    <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
      <Input
        id='email'
        label='이메일'
        placeholder='example@trustcrews.com'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type='password'
        id='password'
        label='비밀번호'
        title='영문, 특수문자 포함 6~12자'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type='password'
        id='passwordConfirmation'
        label='비밀번호 확인'
        title='영문, 특수문자 포함 6~12자'
        required
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <NicknameField
        placeholder='영문, 숫자 포함 6~10자'
        setCheck={setIsCheckedNickname}
        required
        value={nickname}
        onChange={onChangeNickname}
      />
      <Suspense
        fallback={
          <SelectSkeleton label='직무' placeholder='직무를 선택해주세요' />
        }
      >
        <PositionSelect
          positionId={positionId}
          onChange={(item) => setPositionId(item)}
          required
        />
      </Suspense>
      <Suspense
        fallback={
          <SelectSkeleton
            label='사용 스택'
            placeholder='사용 스택을 선택해주세요.'
          />
        }
      >
        <TechStackSelect
          selectedTechStackIds={techStackIds}
          onChange={(item) => setTechStackIds([...item])}
          label='관심 스택'
          placeholder='관심 스택을 선택해주세요.'
          required
        />
      </Suspense>
      <TextArea
        id='information'
        label='자기소개'
        placeholder='텍스트를 입력해주세요.'
        rows={3}
        cols={25}
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />
      <FormButton onClick={signUpWithValidation}>가입</FormButton>
    </div>
  );
};

export default SignUpForm;
