'use client';

import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';
import TanStackQueryClientProvider from '@/providers/TanstackQueryClientProvider';

type RootProviderProps = {
  children: ReactNode;
};

const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <RecoilRoot>
      <TanStackQueryClientProvider>{children}</TanStackQueryClientProvider>
    </RecoilRoot>
  );
};

export default RootProvider;
