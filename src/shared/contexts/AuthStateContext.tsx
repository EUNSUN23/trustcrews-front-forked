import { createContext, ReactNode, useContext } from 'react';

export const AuthStateContext = createContext<AuthState | null>(null);

type AuthStateProviderProps = {
  children: ReactNode;
  authState: AuthState;
};

export type AuthState = {
  isAuthorized: boolean;
  userId: string;
};

export const AuthStateProvider = ({
  children,
  authState,
}: AuthStateProviderProps) => {
  return (
    <AuthStateContext.Provider value={authState}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within a AuthStateProvider');
  }
  return context;
};
