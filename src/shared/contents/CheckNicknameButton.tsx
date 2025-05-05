import Button from '@/components/ui/button';
import {
  checkNicknameInputSchema,
  useCheckNickname,
} from '@/shared/service/checkNickName';
import useSnackbar from '@/hooks/common/useSnackbar';
import { ZodError } from 'zod';

type CheckNicknameButtonProps = {
  nickname: string;
  onSuccess: (nickname: string) => void;
  onError: () => void;
};

const CheckNicknameButton = ({
  nickname,
  onSuccess,
  onError,
}: CheckNicknameButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const { mutate: checkNickName } = useCheckNickname({
    onSuccess: (res) => {
      setSuccessSnackbar(res.message);
      onSuccess(nickname);
    },
    onError: (res) => {
      setErrorSnackbar(res.message);
      onError();
    },
  });

  const handleClickButton = () => {
    try {
      checkNicknameInputSchema.parse(nickname);
    } catch (e: unknown) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }
    checkNickName(nickname);
  };

  return (
    <Button className='ml-2 h-fit font-normal' onClick={handleClickButton}>
      중복확인
    </Button>
  );
};

export default CheckNicknameButton;
