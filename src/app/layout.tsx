import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/app/Providers';
import Snackbar from '@/components/ui/Snackbar';
import StaticDataProvider from '@/app/StaticDataProvider';
import Header from '@/components/header/Header';
import { ReactNode } from 'react';
import getIsAuthorized from '@/utils/getIsAuthorized';
import {
  COOKIE,
  getCookieValue,
} from '@/app/api/_interceptor/utils/cookieUtils';

export const metadata: Metadata = {
  title: 'TRUSTCREWS | 책임감 있는 사이드 프로젝트 팀, 팀원을 구하는 방법',
  description:
    '무책임한 팀원들로 흐지부지 되는 사이드 프로젝트는 이제 그만! TRUSTCREWS 에서 책임감 있는 사이드 프로젝트 팀원을 모집하고 TO-DO를 관리해보세요.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const authState = {
    isAuthorized: getIsAuthorized(),
    userId: getCookieValue(COOKIE.USER_ID),
  };

  return (
    <html lang='en'>
      <body className='w-full'>
        <Providers authState={authState}>
          <div className='responsiveContainer'>
            <StaticDataProvider>
              <Header />
              {children}
            </StaticDataProvider>
          </div>
          <div id='modal' className='absolute top-0 w-full'></div>
          <Snackbar />
        </Providers>
      </body>
    </html>
  );
}
