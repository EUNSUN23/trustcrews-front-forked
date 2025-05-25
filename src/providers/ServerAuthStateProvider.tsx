import { ReactNode } from 'react';
import { AuthState } from '@/store/AuthStateStore';
import { isAuthorized } from '@/lib/auth/isAuthorized';
import { getCookieValue } from '@/lib/auth/cookieUtils';
import { COOKIE } from '@/constants/cookie';

type ServerAuthStateProviderProps = {
  children: (authState: AuthState) => ReactNode;
};

const ServerAuthStateProvider = ({
  children,
}: ServerAuthStateProviderProps) => {
  const serverAuthState: AuthState = {
    isAuthorized: isAuthorized(),
    userId: getCookieValue(COOKIE.USER_ID),
  };

  return <>{children(serverAuthState)}</>;
};

export default ServerAuthStateProvider;
