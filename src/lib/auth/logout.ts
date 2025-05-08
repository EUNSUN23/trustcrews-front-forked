import { request } from '@/lib/clientApi/request';
import { useMutation } from '@tanstack/react-query';
import { ResponseBody } from '@/types/responseBody';
import { ApiResult } from '@/shared/types/apiResult';

export const logout = async (): Promise<ResponseBody<null>> => {
  return await request('POST', '/api/user/logout');
};

type LogOutRes = ApiResult<typeof logout>;

export const useLogout = ({
  onSuccess,
}: {
  onSuccess?: (res: LogOutRes) => void;
}) => {
  // const router = useRouter();
  // const resetActiveBoardTab = useResetRecoilState(activeBoardTabStore);
  // const { setInfoSnackbar, setErrorSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      onSuccess?.(res);
      // const { message, result } = res;
      // if (isEqual(result, 'success')) {
      //   resetActiveBoardTab();
      //
      //   router.push('/');
      //   router.refresh();
      //
      //   setInfoSnackbar(message);
      // }
      //
      // if (isEqual(result, 'error')) {
      //   setErrorSnackbar(message);
      // }
    },
    // onError: (err) => {
    //   console.log('err', err);
    // },
  });
};
