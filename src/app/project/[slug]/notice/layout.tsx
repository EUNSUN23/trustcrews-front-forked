import { ReactNode } from 'react';
import AlertNavTab from '@/features/project/auth/myProject/notice/components/NoticeNavTab';

function NoticeLayout({ children }: { children: ReactNode }) {
  return (
    <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
      <AlertNavTab />
      {children}
    </section>
  );
}

export default NoticeLayout;
