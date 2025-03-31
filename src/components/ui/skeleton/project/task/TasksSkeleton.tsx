import React from 'react';
import Skeleton from '@/components/ui/skeleton/Skeleton';

function TasksSkeleton({ itemCount }: { itemCount: number }) {
  const items = new Array(itemCount).fill(null);
  return (
    <div className='grid justify-items-center mt-4 mobile:mt-2 pc:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-10 mobile:gap-0'>
      {items.length > 0 &&
        items.map((_, idx) => (
          <Skeleton
            key={idx}
            className='flex-col w-[330px] h-[275px] rounded-xl mobile:w-full mobile:rounded-none mobile:mt-2'
          />
        ))}
    </div>
  );
}

export default TasksSkeleton;
