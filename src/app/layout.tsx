import type { Metadata } from 'next';
import './globals.css';
import Snackbar from '@/shared/ui/Snackbar';
import StaticOptionDataProvider from '@/providers/data/StaticOptionDataProvider';
import Header from '@/contents/Header';
import { ReactNode } from 'react';
import RootProvider from '@/providers/RootProvider';
import ServerAuthStateProvider from '@/providers/ServerAuthStateProvider';

export const metadata: Metadata = {
  title: 'TRUSTCREWS | 책임감 있는 사이드 프로젝트 팀, 팀원을 구하는 방법',
  description:
    '무책임한 팀원들로 흐지부지 되는 사이드 프로젝트는 이제 그만! TRUSTCREWS 에서 책임감 있는 사이드 프로젝트 팀원을 모집하고 TO-DO를 관리해보세요.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body className='w-full'>
        <RootProvider>
          <div className='responsiveContainer'>
            <ServerAuthStateProvider>
              {(authState) => <Header serverAuthState={authState} />}
            </ServerAuthStateProvider>
            <StaticOptionDataProvider>{children}</StaticOptionDataProvider>
          </div>
          <div id='modal' className='absolute top-0 w-full'></div>
          <Snackbar />
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
