import Button from '@/components/ui/form/Button';
import {
  checkNicknameInputSchema,
  useCheckNickname,
} from '@/features/user/service/checkNickName';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { ZodError } from 'zod';

type CheckNicknameButtonProps = {
  nickname: string;
  isChecked: boolean;
  onSuccess: () => void;
  onError: () => void;
};

const CheckNicknameButton = ({
  nickname,
  isChecked,
  onSuccess,
  onError,
}: CheckNicknameButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar, setInfoSnackbar } =
    useSnackbar();

  const { mutate: checkNickName } = useCheckNickname({
    onSuccess: (res) => {
      setSuccessSnackbar(res.message);
      onSuccess();
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
    <Button
      size='md'
      className='ml-2 h-fit font-normal'
      onClick={handleClickButton}
      disabled={isChecked}
    >
      중복확인
    </Button>
  );
};

export default CheckNicknameButton;
