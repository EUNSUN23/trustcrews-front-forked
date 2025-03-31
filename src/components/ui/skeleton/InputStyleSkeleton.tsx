import React from 'react';
import Skeleton from '@/components/ui/skeleton/Skeleton';

function InputStyleSkeleton({ label }: { label: string }) {
  return (
    <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
      <div className='relative mobile:text-sm'>
        <span className='text-gray-700'>{label}</span>
        <Skeleton className='w-full h-[40px] py-2 px-4' />
      </div>
    </div>
  );
}

export default InputStyleSkeleton;
