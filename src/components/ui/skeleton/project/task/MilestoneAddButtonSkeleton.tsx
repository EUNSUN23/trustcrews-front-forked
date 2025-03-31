import React from 'react';
import ButtonStyleSkeleton from '@/components/ui/skeleton/ButtonStyleSkeleton';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';

function MilestoneAddButtonSkeleton() {
  return (
    <ButtonStyleSkeleton size='md' className='mb-4'>
      <span className='flex items-center'>
        <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
        마일스톤 추가
      </span>
    </ButtonStyleSkeleton>
  );
}

export default MilestoneAddButtonSkeleton;
