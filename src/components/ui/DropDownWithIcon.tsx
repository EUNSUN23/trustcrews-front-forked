'use client';

import { Fragment, ReactElement } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import Link from 'next/link';
import { DropDownProps } from '@/utils/type';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface DropDownWithIconProps extends DropDownProps {
  icon: ReactElement;
  srOnlyButtonName: string;
}

export default function DropDownWithIcon({
  items,
  icon,
  srOnlyButtonName,
}: DropDownWithIconProps) {
  return (
    <Menu as='div' className='relative inline-block text-center'>
      <div>
        <MenuButton className='flex items-center text-gray-400 hover:text-gray-600'>
          <span className='sr-only'>{srOnlyButtonName}</span>
          {icon}
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
        <MenuItems className='absolute right-0 z-10 mt-2 tablet:min-w-[120px] mobile:min-w-[90px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1 '>
            {items.map((v) => (
              <MenuItem key={v.value}>
                {({ focus }) =>
                  v.onClickHandler ? (
                    <span
                      onClick={() => v.onClickHandler!(v.value)}
                      className={classNames(
                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                      )}
                    >
                      {v.name}
                    </span>
                  ) : (
                    <Link
                      href={v.value}
                      className={classNames(
                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                      )}
                    >
                      {v.name}
                    </Link>
                  )
                }
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
