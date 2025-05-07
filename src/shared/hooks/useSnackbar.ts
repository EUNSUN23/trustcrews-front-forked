import { useSetRecoilState } from 'recoil';
import { snackbarState } from '@/shared/store/SnackbarStateStore';

const useSnackbar = () => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const setSuccessSnackbar = (content: string) => {
    setSnackbar({ show: true, type: 'SUCCESS', content });
  };

  const setErrorSnackbar = (content: string) => {
    setSnackbar({ show: true, type: 'ERROR', content });
  };

  const setInfoSnackbar = (content: string) => {
    setSnackbar({ show: true, type: 'INFO', content });
  };

  return { setSuccessSnackbar, setErrorSnackbar, setInfoSnackbar };
};

export default useSnackbar;
