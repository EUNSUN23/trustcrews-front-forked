import { useRecoilState } from 'recoil';
import { AuthState, authStateStore } from '@/store/AuthStateStore';
import { useEffect } from 'react';

const useSyncAuthState = (serverAuthState: AuthState) => {
  const { isAuthorized: serverIsAuthorized, userId: serverUserId } =
    serverAuthState;
  const [{ isAuthorized, userId }, setAuthState] =
    useRecoilState(authStateStore);

  const isAuthSync =
    isAuthorized === serverIsAuthorized && userId === serverUserId;

  useEffect(() => {
    if (!isAuthSync) {
      setAuthState({
        isAuthorized: serverIsAuthorized,
        userId: serverUserId,
      });
    }
  }, [isAuthSync, serverIsAuthorized, serverUserId, setAuthState]);

  return {
    isAuthSync,
  };
};

export default useSyncAuthState;
