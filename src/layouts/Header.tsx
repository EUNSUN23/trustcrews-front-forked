'use client';

import Image from 'next/image';
import logo from '../../public/images/logo.png';
import Link from 'next/link';
import LoginNav from '@/components/LoginNav';
import UserMenuSkeleton from '@/contents/user/private/UserMenuSkeleton';
import { IoCreateOutline } from '@react-icons/all-files/io5/IoCreateOutline';
import dynamic from 'next/dynamic';
import { useAuthState } from '@/features/user/private/contexts/AuthStateContext';

const UserMenu = dynamic(() => import('@/contents/user/private/UserMenu'), {
  ssr: false,
  loading: () => <UserMenuSkeleton />,
});

const Header = () => {
  const { isAuthorized } = useAuthState();

  return (
    <header className='flex flex-col'>
      <div className='flex items-center justify-between h-[80px] mobile:h-[65px] my-1'>
        <div id='top-navigation-wrap'>
          <Link
            href='/'
            aria-label='trustcrews 홈페이지'
            className='inline-block relative pc:w-[200px] pc:h-[60px] tablet:w-[150px] tablet:h-[50px] mobile:w-[120px] mobile:h-[40px]'
          >
            <Image
              src={logo}
              alt='trustcrew 로고'
              aria-hidden='true'
              fill
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-30%)',
              }}
              quality={100}
              priority
            />
          </Link>
        </div>
        <div id='top-navigation-main' className='flex items-center'>
          <Link href='/launch'>
            <div
              aria-hidden='true'
              className='mx-4 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
            >
              <span className='mobile:hidden'>새 프로젝트</span>
              <IoCreateOutline className='pc:hidden tablet:hidden h-6 w-6' />
            </div>
          </Link>
          <div>{isAuthorized ? <UserMenu /> : <LoginNav />}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
