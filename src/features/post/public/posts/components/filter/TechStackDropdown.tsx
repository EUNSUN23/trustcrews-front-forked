'use client';

import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import TechStackDropdownList from './TechStackDropdownList';
import { useQuery } from '@tanstack/react-query';
import { TechStackWithCategory } from '@/utils/type';
import {
  techCategoryQueryOptions,
  techMapQueryOptions,
} from '@/utils/tanstackQueryOptions/settingsQuery';
import { selectedTechStackState } from '@/features/post/public/posts/store/PostSearchStateStore';

const getSelectedTechStackText = (
  selectedTechStacks: TechStackWithCategory[],
) => {
  if (selectedTechStacks.length > 0) {
    return selectedTechStacks.map((stack) => stack.techStackName).join(', ');
  }
  return '기술스택';
};

const TechStackDropdown = () => {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenDropdown(!openDropdown);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const { data: categoryResponse, isFetching: isFetchingCategory } = useQuery(
    techCategoryQueryOptions(),
  );

  const { data: techStackResponse, isFetching: isFetchingTechStack } = useQuery(
    techMapQueryOptions(),
  );

  if (isFetchingTechStack || isFetchingCategory)
    return (
      <div className='relative z-10'>
        <div className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer bg-gray-300 animate-pulse'>
          <div className='text-base text-grey800 mobile:text-sm block truncate'>
            {'기술스택'}
          </div>
          <BsChevronDown className='w-4 h-4 text-grey800' />
        </div>
      </div>
    );

  return (
    <button
      aria-label='기술스택 선택'
      aria-expanded={openDropdown}
      aria-owns='tech-stack-dropdown'
      ref={dropdownRef}
      className='relative z-10'
      onClick={handleClick}
    >
      <div
        aria-hidden={true}
        className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer'
      >
        <div className='text-base text-grey800 mobile:text-sm block truncate'>
          {getSelectedTechStackText(selectedTechStacks)}
        </div>
        <BsChevronDown className='w-4 h-4 text-grey800' />
      </div>
      {openDropdown && (
        <TechStackDropdownList
          categories={categoryResponse!.data!}
          items={techStackResponse!.data!}
        />
      )}
    </button>
  );
};

export default TechStackDropdown;
