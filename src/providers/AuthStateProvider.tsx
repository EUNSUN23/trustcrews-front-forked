import { ReactNode } from 'react';
import { AuthState } from '@/store/AuthStateStore';
import { isAuthorized } from '@/lib/isAuthorized';
import { getCookieValue } from '@/lib/cookieUtils';
import { COOKIE } from '@/constants/cookie';

type ServerAuthStateProviderProps = {
  children: (authState: AuthState) => ReactNode;
};

const AuthStateProvider = ({ children }: ServerAuthStateProviderProps) => {
  const serverAuthState: AuthState = {
    isAuthorized: isAuthorized(),
    userId: getCookieValue(COOKIE.USER_ID),
  };

  return <>{children(serverAuthState)}</>;
};

export default AuthStateProvider;
