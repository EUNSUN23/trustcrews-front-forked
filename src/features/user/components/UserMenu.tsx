'use client';

import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import Avatar from '@/components/ui/Avatar';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import Link from 'next/link';
import { classNames } from '@/utils/common';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/lib/auth/logout';
import { useResetRecoilState } from 'recoil';
import { activeBoardTabStore } from '@/features/board/store/BoardActiveStateStore';
import useSnackbar from '@/hooks/common/useSnackbar';
import { useSimpleUserInfo } from '@/lib/user/getSimpleUserInfo';

const UserMenu = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const router = useRouter();
  const resetActiveBoardTab = useResetRecoilState(activeBoardTabStore);
  const { setInfoSnackbar, setErrorSnackbar } = useSnackbar();

  const { mutate: logout } = useLogout({
    onSuccess: ({ result, message }) => {
      if (result === 'success') {
        resetActiveBoardTab();
        router.push('/');
        router.refresh();
        setInfoSnackbar(message);
      } else {
        setErrorSnackbar(message);
      }
    },
  });

  const {
    data: {
      data: { nickname, profileImgSrc },
    },
  } = useSimpleUserInfo();

  const handleClickLogout = () => {
    logout();
  };

  return (
    <div className='flex items-center mx-2 space-x-2'>
      <div aria-hidden='true' className='flex items-stretch space-x-2'>
        <Avatar size='xxs' alt='사용자 이미지' src={profileImgSrc} />
        {isDesktop && (
          <span className='text-grey90 leading-loose'>{nickname}</span>
        )}
      </div>
      <Menu as='div' className='relative flex text-center'>
        <div>
          <MenuButton className='flex items-center text-gray-400 hover:text-gray-600'>
            <span className='sr-only'>{`${nickname}의 사용자 메뉴`}</span>
            <FaChevronDown className='h-4 w-4' aria-hidden='true' />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <MenuItems className='absolute right-0 z-10 mt-5 tablet:min-w-[120px] mobile:min-w-[90px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1 '>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href='/user'
                    className={classNames(
                      focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                    )}
                  >
                    내 프로필
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <span
                    onClick={handleClickLogout}
                    className={classNames(
                      focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                    )}
                  >
                    로그아웃
                  </span>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
