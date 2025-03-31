'use client';
import React, { Fragment } from 'react';
import { IoEllipsisVertical } from '@react-icons/all-files/io5/IoEllipsisVertical';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { classNames } from '@/utils/common';

interface MilestoneCardMenuProps {
  milestoneId: bigint;
  onEditClickHandler: () => void;
  onDeleteClickHandler: () => void;
}

function MilestoneCardMenu({
  milestoneId,
  onEditClickHandler,
  onDeleteClickHandler,
}: MilestoneCardMenuProps) {
  const milestoneMenus = [
    {
      name: '수정',
      value: milestoneId,
      onClickHandler: onEditClickHandler,
    },
    {
      name: '삭제',
      value: milestoneId,
      onClickHandler: onDeleteClickHandler,
    },
  ];

  return (
    <Menu as='div' className='self-start flex-shrink-0 pr-2 text-center'>
      <div>
        <MenuButton
          className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none '
          data-role='milestone-menu'
        >
          <span className='sr-only'>마일스톤 메뉴</span>
          <IoEllipsisVertical
            className='h-5 w-5'
            aria-hidden='true'
            data-role='milestone-menu'
          />
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
        <MenuItems className='absolute right-2 z-10 mt-1 tablet:min-w-[60px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1 '>
            {milestoneMenus.map((v) => (
              <MenuItem key={v.name}>
                {({ focus }) => (
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      v.onClickHandler();
                    }}
                    className={classNames(
                      focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 tablet:text-[16px] mobile:text-sm',
                    )}
                  >
                    {v.name}
                  </a>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default MilestoneCardMenu;
