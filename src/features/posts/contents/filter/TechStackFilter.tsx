'use client';

import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import TechStackDropdownList from '@/features/posts/components/filter/TechStackDropdownList';
import { selectedTechStackState } from '@/features/posts/store/filter/PostSearchStateStore';
import { useTechCategories } from '@/entities/techStack/api/getTechStackCategories';
import {
  TechStackMapping,
  useTechStackMappings,
} from '@/entities/techStack/api/getTechStackMappings';

const getSelectedTechStackText = (selectedTechStacks: TechStackMapping[]) => {
  if (selectedTechStacks.length > 0) {
    return selectedTechStacks.map((stack) => stack.techStackName).join(', ');
  }
  return '기술스택';
};

const TechStackFilter = () => {
  const [_, startTransition] = useTransition();
  const resetSelectedTechStacks = useResetRecoilState(selectedTechStackState);
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    resetSelectedTechStacks();
  }, [resetSelectedTechStacks]);

  const handleClickTechStackButton = (e: ReactMouseEvent<HTMLElement>) => {
    e.preventDefault();
    startTransition(() => setOpenDropdown((prev) => !prev));
  };

  const { data: categoryResponse } = useTechCategories();
  const { data: techStackResponse } = useTechStackMappings();

  return (
    <button
      aria-label='기술스택 선택'
      aria-expanded={openDropdown}
      aria-owns='tech-stack-dropdown'
      ref={dropdownRef}
      className='relative z-10'
      onClick={handleClickTechStackButton}
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
          categories={categoryResponse.data}
          items={techStackResponse.data}
        />
      )}
    </button>
  );
};

export default TechStackFilter;
