import FormButton from '@/components/FormButton';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { signUpInputScheme, useSignUp } from '@/service/auth/signUp';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { signUpFormStateStore } from '@/features/auth/store/SignUpFormStateStore';
import { useRecoilValue } from 'recoil';

const SignUpButton = () => {
  const router = useRouter();
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const formData = useRecoilValue(signUpFormStateStore);

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

  const handleClickSignUpButton = () => {
    const data = {
      ...formData,
      positionId: numStrToBigInt(formData.positionId),
      techStackIds: formData.techStackIds.map((item) => numStrToBigInt(item)),
    };

    try {
      signUpInputScheme.parse(data);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }

    signup(data);
  };
  return <FormButton onClick={handleClickSignUpButton}>가입</FormButton>;
};

export default SignUpButton;
