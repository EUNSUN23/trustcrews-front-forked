import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { logout as logoutAPI } from '@/service/user/logout';
import { isEqual } from 'lodash';
import useSnackbar from '@/hooks/common/useSnackbar';
import { activeBoardTabStore } from '@/features/board/store/BoardActiveStateStore';

export default function useLogout() {
  const router = useRouter();
  const resetActiveBoardTab = useResetRecoilState(activeBoardTabStore);
  const { setInfoSnackbar, setErrorSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (res) => {
      const { message, result } = res;
      if (isEqual(result, 'success')) {
        resetActiveBoardTab();

        router.push('/');
        router.refresh();

        setInfoSnackbar(message);
      }

      if (isEqual(result, 'error')) {
        setErrorSnackbar(message);
      }
    },
    onError: (err) => {
      console.log('err', err);
    },
  });

  return { logout: mutate };
}
